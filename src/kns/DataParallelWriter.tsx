import { Heading } from "@chakra-ui/react";
import { A, P, Img, BlockCode, Code } from "../components";

const mp = (
  <A
    href="https://docs.python.org/3/library/multiprocessing.html"
    label="multiprocessing"
  />
);
const np = <A href="https://pypi.org/project/numpy/" label="numpy" />;
const numba = <A href="https://numba.readthedocs.io/" label="numba" />;
const queue = (
  <A
    href="https://docs.python.org/3/library/queue.html#queue.Queue"
    label="Queue"
  />
);

const worker = `def worker(queue: mp.Queue):
  while True:
      data = queue.get()
      if data is None:
          read_queue.put(None)
          break
      # process data`;

const writer = `def writer(file: Path, queue: mp.Queue):
  while True:
    data = queue.get()
    if data is None:
        break
    with open(file, "a", encoding="utf-8") as fh:
        fh.writelines(data)`;

const parallel = `from typing import Callable, Iterable, TypeVar
from pathlib import Path
from functools import partial
from queue import Empty
import multiprocessing as mp

T = TypeVar("T")

def _worker(
    fun: Callable[[T], Iterable[str]],
    read_queue: mp.Queue,
    write_queue: mp.Queue,
    timeout: int,
):
    while True:
        try:
            data = read_queue.get(timeout=timeout)
        except Empty:
            read_queue.put(None)
            break
        if data is None:
            read_queue.put(None)
            break
        lines = fun(data)
        write_queue.put(lines, timeout=timeout)

def _writer(file: Path, write_queue: mp.Queue, timeout: int):
    while True:
        try:
            data = write_queue.get(timeout=timeout)
        except Empty:
            break
        if data is None:
            break
        with open(file, "a", encoding="utf-8") as fh:
            fh.writelines(data)

def data_parallel_writer(
    data: Iterable[T],
    workfun: Callable[[T], Iterable[str]],
    outfile: Path,
    nproc=4,
    timeout=10,
):
    _write = partial(_writer, file=outfile, timeout=timeout)
    _work = partial(_worker, fun=workfun, timeout=timeout)
    with mp.Manager() as mngr:
        write_queue = mngr.Queue()
        read_queue = mngr.Queue()
        for item in data:
            read_queue.put(item)
        read_queue.put(None)

        write_kwargs = {"write_queue": write_queue}
        work_kwargs = {**write_kwargs, "read_queue": read_queue}
        writer_p = mp.Process(target=_write, kwargs=write_kwargs)
        workers = [
            mp.Process(target=_work, kwargs=work_kwargs)
            for _ in range(nproc)
        ]

        writer_p.start()
        for worker_p in workers:
            worker_p.start()

        for worker_p in workers:
            worker_p.join()

        write_queue.put(None)
        writer_p.join()`;

const usage = `import time
import random
from parallel import data_parallel_writer

def myfun(i: int) -> list[str]:
    t = random.random() * i
    time.sleep(t)
    return [f"i={i},msg=slept {t:.2f}s\\n"]

data_parallel_writer(data=data, workfun=myfun, outfile=outdir / "myfile.txt")`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://i.stack.imgur.com/HH0fN.png"
        width="600px"
        height="170px"
      />
      <P>
        When optimizing performance in python, the {mp} package should not be
        the first choice. First, think about the algorithm again and find ways
        to avoid unnecessary computation and loops. Then, libraries like {np}{" "}
        are a powerful tool to parallelize filtering and mathematical
        operations. Even if some operations are not supported by numpy, they can
        sometimes be added <i>e.g.</i> using {numba}. Finally, if you still end
        up using {mp}, and operations should be parallelized across data, a
        simple <Code>with mp.Pool() as pool: pool.map(f, args)</Code> is usually
        best. There are plenty of examples for how that works. The pattern
        described here is for a very specific situation.
      </P>
      <Heading variant="h4">Variable execution time</Heading>
      <P>
        The pattern here is in general a way of distributing work across
        multiple processes according to some iterable. This alone could be
        easily achieved by something like <Code>pool.map(worker, data)</Code>.
        However, <Code>pool.map</Code> becomes inefficient if the operation that
        is performed on the data (here the <Code>worker</Code> function) always
        takes a vastly different amount of time to finish. <i>E.g.</i> it could
        happen that one of the workers gets a chunk of data where each element
        take hours to compute while the other workers get chunks that only takes
        seconds. In that case it is better to fill a {queue} with all the
        elements, then start a few workers, and let them work off the queue.
      </P>
      <BlockCode lang="python" code={worker} />
      <P>
        Here, if the data is <Code>None</Code> the worker breaks out of the loop
        and returns. Before breaking out it also puts a <Code>None</Code> into
        the queue, thereby informing the other workers to shut down as well on
        their next iteration.
      </P>
      <Heading variant="h4">Writing to a single file</Heading>
      <P>
        Another problem I faced was that all data combined was far too large for
        my memory. Thus, it is not possible to just collect the returned results
        in a long list. They need to be written. If the order of items is
        important, one can write a temporary file for each worker result, and
        then concatenate them later on. The order can then be identified by
        enumerating the iterator and using the indices as file names. If the
        order is not important, one can directly write to a single file. But to
        avoid multiple processes trying to write to the same file at the same
        time, all writing should to be channeled through a single writer
        process. This writer process can again be fed through a queue.
      </P>
      <BlockCode lang="python" code={writer} />
      <P>
        The writer gets lists of strings from a queue and appends them to a
        file. It can also be shut down by writing <Code>None</Code> into that
        queue. Now the worker processes from above can put their results into
        that queue and the writer immediately writes them into a single file.
      </P>
      <Heading variant="h4">Finished module</Heading>
      <P>
        Below is a module that combines both of these concepts. In addition,
        timeouts and exception handling was added to make it more robust.
      </P>
      <BlockCode lang="python" code={parallel} label="parallel.py" />
      <P>
        The actual worker function can be added as an argument. If the module
        was saved as <i>parallel.py</i> it would be used like shown below. Here,{" "}
        <Code>random</Code> and <Code>time</Code> is just used to simulate the
        effect of different execution times of <Code>myfun</Code>.
      </P>
      <BlockCode lang="python" code={usage} />
    </>
  );
}
