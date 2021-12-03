import { P, H4, Link, BlockCode, Code, Img } from "./components";

const retrySession = `from typing import List
import requests
import urllib3


def get_retry_session(
    total: int, backoff_factor: float, status_forcelist: List[int]
) -> requests.Session:
    """
    Retry sessions

    \`total\` – Total number of retries to allow.
    \`status_forcelist\` – A set of HTTP status codes that we should force a retry on. ([500, 502, 503, 504] is good)
    \`backoff_factor\` – A backoff factor to apply between attempts.

    """
    session = requests.Session()
    retries = urllib3.util.retry.Retry(
        total=total, backoff_factor=backoff_factor, status_forcelist=status_forcelist
    )
    session.mount("http://", requests.adapters.HTTPAdapter(max_retries=retries))
    return session`;

const retryTimeout = `from contextlib import contextmanager
from time import sleep
import signal
import requests


def _alarm_handler(*_):
    raise TimeoutError("timeout reached")


@contextmanager
def timeout(s=5):
    _ = signal.signal(signal.SIGALRM, _alarm_handler)
    _ = signal.alarm(s)
    try:
        yield
    finally:
        _ = signal.alarm(0)


def retry_timeout(f, max_retries=3, init_timeout=3, backoff_factor=3):
    """Wrap arbitrary function to catch and retry timeouts"""
    retry_i = 0
    current_timeout = init_timeout
    while retry_i < max_retries:
        try:
            with timeout(s=current_timeout):
                return f()
        except (
            TimeoutError,
            requests.exceptions.Timeout,
            requests.exceptions.ConnectionError,
            requests.exceptions.ChunkedEncodingError,
        ):
            retry_i += 1
            print(f"Retry number {retry_i}...")
            sleep(init_timeout + init_timeout * retry_i * backoff_factor)
    with timeout(s=current_timeout):
        return f()`;

const pytestCode = `import pytest
import time
import requests
from src.timeout import retry_timeout, get_retry_session


def test_retry_session_timeouts():
    t0 = time.time()
    sess = get_retry_session(total=2, status_forcelist=[], backoff_factor=0.5)
    with pytest.raises(requests.exceptions.ConnectionError):
        _ = sess.get("http://httpstat.us/200?sleep=2000", timeout=1)
    assert time.time() - t0 > 2


def test_retry_session_status_codes():
    t0 = time.time()
    sess = get_retry_session(
        total=3, status_forcelist=[500, 502, 503, 504], backoff_factor=1
    )
    with pytest.raises(requests.exceptions.RetryError):
        _ = sess.get("http://httpstat.us/500")
    assert time.time() - t0 > 2


def test_retry_timeout():
    def long_sleep():
        time.sleep(1000)

    t0 = time.time()
    with pytest.raises(TimeoutError):
        retry_timeout(f=long_sleep, max_retries=1, init_timeout=1, backoff_factor=1)
    assert 5 > time.time() - t0 > 2
`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img src="https://http.cat/200" width="600px" height="500px" />
      <P>
        When automating requests to some external website or API I often end up
        using some piece of code to make the process more robust. Every now and
        then a request can get stuck for whatever reason or a website that used
        to work perfectly fine suddenly returns a 500 status code. Most of the
        time this problem is immediately gone right after trying the request a
        second time. The code below is from{" "}
        <Link
          label="this SO post"
          href="https://stackoverflow.com/questions/15431044/can-i-set-max-retries-for-requests-request"
        />{" "}
        and does just that. It gives you a <Code>requests.Session</Code> that
        you can use to make a request. If the request times out or the response
        is one of the provided status codes it will wait a short time and then
        retry it again. When trying out multiple times the backoff factor makes
        the waiting time longer after each turn. A useful list of status codes
        is <Code>status_forcelist=[500, 502, 503, 504]</Code>.
      </P>
      <BlockCode code={retrySession} lang="python" />
      <P>
        These <Code>requests.Session</Code>s are great. You can configure all
        kinds of stuff on them. However, often you don't have the luxury of such
        an API. Most APIs don't really provide any means of catching problems
        and retrying. For these cases you can use the code below.
        <Code>timeout()</Code> is a context manager you can use to create an
        arbitrary timeout. Whatever your code does, it will try to kill it if it
        takes longer than <Code>s</Code> seconds.
        <Code>retry_timeout()</Code> is a convenience function that uses this
        context manager and implements a retry logic with a backoff factor.
      </P>
      <BlockCode code={retryTimeout} lang="python" />
      <P>
        Finally, I usually want to have some tests for these things. Below are
        some pytests that make actual requests to{" "}
        <Link href="http://httpstat.us/" label="httpstat.us" /> and wait for
        them to time out. If you ever need to test your code against all kinds
        of weird request responses{" "}
        <Link href="http://httpstat.us/" label="httpstat.us" /> is perfect for
        that.
      </P>
      <BlockCode code={pytestCode} lang="python" />
    </>
  );
}
