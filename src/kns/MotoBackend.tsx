import { Heading } from "@chakra-ui/react";
import { P, BlockCode, Img, Code, A } from "../components";

const conftestCode = `import os
import pytest
from moto import mock_s3
import boto3
import src.s3 as s3
from src.config import CONTENT_BUCKET_NAME

# ensure boto3 doesnt use .aws credentials
os.environ["AWS_ACCESS_KEY_ID"] = "testing"
os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
os.environ["AWS_SECURITY_TOKEN"] = "testing"
os.environ["AWS_SESSION_TOKEN"] = "testing"
os.environ["AWS_DEFAULT_REGION"] = "eu-central-1"


def fake_s3_setup():
    assert len(s3.list_buckets()) == 0, "S3 mocking not working"
    resource = boto3.resource("s3", region_name="us-east-1")
    resource.create_bucket(Bucket=CONTENT_BUCKET_NAME)
    bucket_names = [d["Name"] for d in s3.list_buckets()]
    assert bucket_names == [CONTENT_BUCKET_NAME], "S3 mocking not working"

    # optionally add test data...


@pytest.fixture(scope="function")
def mocked_s3():
    with mock_s3():
        fake_s3_setup()
        yield`;

const s3Code = `from typing import Any
import boto3
from botocore.exceptions import ClientError
from src.config import CONTENT_BUCKET_NAME, AWS_REGION


def list_buckets() -> list[dict[str, Any]]:
    client = boto3.client("s3", region_name=AWS_REGION)
    return client.list_buckets()["Buckets"]


def get_obj(key: str) -> dict[str, Any]:
    try:
        resource = boto3.resource("s3", region_name=AWS_REGION)
        bkt_obj = resource.Bucket(CONTENT_BUCKET_NAME).Object(key).get()
    except ClientError as err:
        if err.response["Error"]["Code"] == "NoSuchKey":
            raise FileNotFoundError from err
        raise err
    return bkt_obj["Body"].read()`;

const appCode = `import os
import uvicorn
from ariadne.asgi import GraphQL
from starlette.middleware.cors import CORSMiddleware
from moto import mock_s3
from graphql_post import schema
from tests.conftest import fake_s3_setup

# ensure boto3 doesnt use .aws credentials
os.environ["AWS_ACCESS_KEY_ID"] = "testing"
os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
os.environ["AWS_SECURITY_TOKEN"] = "testing"
os.environ["AWS_SESSION_TOKEN"] = "testing"
os.environ["AWS_DEFAULT_REGION"] = "eu-central-1"

app = CORSMiddleware(
    GraphQL(schema),
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    with mock_s3():
        fake_s3_setup()
        uvicorn.run("app:app", port=8000)`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://media.defense.gov/2004/Aug/09/2000590026/2000/2000/0/040809-F-0000C-001.JPG"
        width="500px"
        height="300px"
      />
      <P>
        Nowadays, almost all of my apps use some AWS service (usually S3) via{" "}
        <A
          label="boto3"
          href="https://boto3.amazonaws.com/v1/documentation/api/latest/index.html"
        />
        . However, for local development and testing I usually do not want to
        use the real AWS service. This is a short recipe on how to mock AWS
        services with{" "}
        <A label="Moto" href="http://docs.getmoto.org/en/latest/" />. So far I
        have used Moto in projects mocking S3 and SES and it works great. There
        are just a few things to take care of to avoid accidentally using a real
        AWS service.
      </P>
      <Heading variant="h4">Test Suite</Heading>
      <P>
        One obvious place to mock AWS resources is in tests. Below is an example
        of the configuration file of a{" "}
        <A label="pytest" href="https://docs.pytest.org/" /> test suite. Moto
        has a context manager for every AWS resource to be mocked. In the
        example below I am mocking S3 with <Code>mock_s3</Code>. I place this
        context into a fixture for easy usage in tests. Additionally, a function{" "}
        <Code>fake_s3_setup</Code> is called to create the S3 bucket I am using.
        Moto doesn't know which buckets you actually have, so it thinks you have
        no resources at all. This means before accessing a bucket in your tests,
        you must first create it. This function is also a nice place for adding
        any test data.
      </P>
      <BlockCode code={conftestCode} lang="python" label="conftest.py" />
      <P>
        Note, that there are some checks to make sure that the mock is really
        working. It could be expensive to run thousands of tests, falsely
        thinking that all S3 requests are being mocked. If the mock is not
        working properly and boto3 accidentally picks up a real AWS
        configuration it will make actual requests to AWS (possibly creating and
        deleting buckets and objects). As recommended by the{" "}
        <A
          label="Moto documentation"
          href="http://docs.getmoto.org/en/latest/docs/getting_started.html#recommended-usage"
        />{" "}
        I am overriding all AWS-related environment variables with nonsense
        values. This is to ensure that first <i>.aws/credentials</i> is not read
        by boto3. And second that if mocking fails boto3 will have a nonsense
        configuration and fail. I also added 2 tests before and after the fake
        bucket creation to ensure that the mocked account is indeed empty at
        first.
      </P>
      <Heading variant="h4">Boto3</Heading>
      <P>
        The context manager <Code>mock_s3</Code> mocks all s3 resources,
        clients, and sessions from boto3. So, the actual boto3 code can stay
        largely the same. There is one important thing to note. Any
        client/resource/session must be instantiated after the mock context was
        entered, not before. In my case this is achieved by instantiating these
        objects within the calling functions. Another option would be to have a
        singleton that is initialized only after the mock context has been
        entered.
      </P>
      <BlockCode code={s3Code} lang="python" label="s3.py" />
      <Heading variant="h4">Development Environment</Heading>
      <P>
        Finally, the same mocking can be done with the development environment.
        In the example below, I am reusing the S3 mock and setup before starting
        an ASGI server. In this particular case it is running a GraphQL API with{" "}
        <A label="Ariadne" href="https://ariadnegraphql.org/" />. But this could
        also be any other app. Again, the AWS environment variables are
        overridden to make sure no real AWS config accidentally is picked up.
      </P>
      <BlockCode code={appCode} lang="python" label="app.py" />
    </>
  );
}
