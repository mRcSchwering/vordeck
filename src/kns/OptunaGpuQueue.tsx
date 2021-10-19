import { P, H4, Link, Code, BlockCode } from "./components";

const easyOptuna = `import optuna

def objective(trial):
    # the actual model would be trained here
    best_val_loss = trainer(**trial.params)
    return best_val_loss

study = optuna.create_study()
study.optimize(objective, n_trials=100, n_jobs=8)`;

const queueOptuna = `from contextlib import contextmanager
import multiprocessing
N_GPUS = 4

class GpuQueue:

    def __init__(self):
        self.queue = multiprocessing.Manager().Queue()
        all_idxs = list(range(N_GPUS)) if N_GPUS > 0 else [None]
        for idx in all_idxs:
            self.queue.put(idx)

    @contextmanager
    def one_gpu_per_process(self):
        current_idx = self.queue.get()
        yield current_idx
        self.queue.put(current_idx)


class Objective:

    def __init__(self, gpu_queue: GpuQueue):
        self.gpu_queue = gpu_queue

    def __call__(self, trial: Trial):
        with self.gpu_queue.one_gpu_per_process() as gpu_i:
            best_val_loss = trainer(**trial.params, gpu=gpu_i)
            return best_val_loss

if __name__ == '__main__':
    study = optuna.create_study()
    study.optimize(Objective(GpuQueue()), n_trials=100, n_jobs=8)`;

export default function Page(): JSX.Element {
  return (
    <>
      <P>
        I got stuck on this for a while (and even created an{" "}
        <Link
          label="SO post"
          href="https://stackoverflow.com/questions/61763206/is-there-a-way-to-pass-arguments-to-multiple-jobs-in-optuna"
        />
        ). Say you have a machine learning model which takes 10 to 20 hours to
        train. Now you want to do hyperparameter optimization for a few days.
      </P>
      <H4>Optuna Trials</H4>
      <P>
        If you like light-weight libraries like me you might be using{" "}
        <Link
          label="optuna"
          href="https://optuna.readthedocs.io/en/stable/index.html"
        />{" "}
        for that. Optuna orchestrates the hyperparameter search. Each training
        with a particular set of hyperparameters is called a trial. If you want
        to sample for 100 trials while running 8 trials in parallel you could do
        it like this:
      </P>
      <BlockCode code={easyOptuna} lang="python" />
      <P>
        So far so good. But your model is pretty heavy and needs a GPU to train
        on. Fortunately, you have 4 GPUs for yourself. You know that a single
        trial just fits on one GPU. That means you don't need to split up a
        training onto multiple GPUs. It is much faster to train on a single GPU
        if possible. Ideally you just want to start it like{" "}
        <Code>CUDA_VISIBLE_DEVICES=0,1,2,3 python main.py</Code> and the thing
        will start up 4 trials while each trial gets one of the 4 defined GPUs.
        If one of the trials finishes it releases the GPU for another trial to
        start.
      </P>
      <H4>Multiprocessing Queue</H4>
      <P>
        After a few mental breakdowns I figured out that I can do what I want
        using a <i>multiprocessing.Queue</i>. I define a queue where each GPU is
        represented by an index. Now each trial will take one index from that
        queue. If no index is left it will wait until one becomes available in
        the queue again. If it has finished it will return its index to the
        queue.
      </P>
      <BlockCode code={queueOptuna} lang="python" />
      <P>
        In order to pass that queue into the objective function I defined it as
        a class. As lambda function or partial should also work though.
      </P>
    </>
  );
}
