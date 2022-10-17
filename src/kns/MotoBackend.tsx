import { P, BlockCode, Img, Code, H4, Link } from "./components";

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
        When building an API around some resources, there are usually endpoints
        for querying, creating, and updating. Update endpoints are most powerful
        if they can distinguish between <i>undefined</i> and <i>null</i> in the
        payload. Keys for a resource will be updated as defined in the payload.
        If it is defined as <i>null</i> the key of that resource will be updated
        to <i>null</i>. Keys which are not defined in the payload will be left
        untouched. This setup gives the client most flexibility. It covers all
        possible update scenarios, and it doesn't force the client to know all
        keys of a resource, only to update one. Here is one way of achieving
        this in Python.
      </P>
      <H4>Null vs Undefined in Python</H4>
      <P>
        Languages like JavaScript have properties for <i>null</i> and{" "}
        <i>undefined</i>. In Python however there is just the <Code>None</Code>{" "}
        object which is supposed to represent a missing value. There is no
        build-in distinction between <i>undefined</i> and <i>null</i>. So, we
        need to define an object for that. This usually comes into play in a
        CRUD module, where we define how a database entry is updated. Here, we
        would like to make the distinction between whether a value should be
        updated with a new value, whether it should be updated with an empty
        value, or whether it should not be updated at all.
      </P>
      <BlockCode code={conftestCode} lang="python" label="conftest.py" />
      <P>
        Here we create singleton <Code>_undef</Code> that represents{" "}
        <i>undefined</i> and for convenience we create a type{" "}
        <Code>_UndefOr</Code> with a type variable. Now we can use this
        singleton and this new type to define the arguments of our CRUD
        functions. The default value of every argument is <Code>_undef</Code>{" "}
        and the type of it is wrapped in <Code>_UndefOr</Code>. <i>E.g.</i> in
        the code above if <Code>department</Code> is not supplied, it will be{" "}
        <Code>_undef</Code>. If it is supplied, it must be either a string or{" "}
        <Code>None</Code>. Thus, in this one argument we can choose to update{" "}
        <Code>department</Code> with a new value, update it but set its value to{" "}
        <Code>None</Code>, or not update it at all.
      </P>
      <P>
        Note, that this singleton is an instance of class <Code>_Undef</Code>{" "}
        which is a subclass of <Code>Enum</Code>. This is important because by
        deriving this class from <Code>Enum</Code> <i>mypy</i> knows that there
        is only one instance of this class. Thus, performing the check{" "}
        <Code>if department is not _undef</Code> is enough to make sure that{" "}
        <Code>department</Code> is defined and must now be either a string or{" "}
        <Code>None</Code>.
      </P>
      <H4>GraphQL and Ariadne</H4>
      <P>
        If you build a GraphQL API with something like{" "}
        <Link label="Ariadne" href="https://ariadnegraphql.org/" /> you can use
        this CRUD function like below. In the schema all fields except for{" "}
        <Code>id</Code> are optional. Here, all inputs are combined in one
        argument called <i>payload</i>. They can be accessed under the same name
        in python as a dictionary. This dictionary will only contain the keys
        which were defined in the actual POST payload. Calling the CRUD function
        with <Code>**payload</Code> will only unpack existing keys of{" "}
        <i>payload</i>. Thus, all other keys are <i>undefined</i>.
      </P>
      <BlockCode code={s3Code} lang="python" label="s3.py" />
      <H4>REST and Pydantic</H4>
      <P>
        If you build a REST API with something like{" "}
        <Link label="fastAPI" href="https://fastapi.tiangolo.com/" /> you will
        have some additional marshalling in the middle. This is usually done
        with{" "}
        <Link label="Pydantic" href="https://pydantic-docs.helpmanual.io/" />.
        Here, you just need to make sure that you only parse keys which were
        actually in the POST payload. So, you define you Pydantic payload with
        all optional keys. Then, when you convert the Pydantic model to a
        dictionary you need to add <Code>exclude_unset=True</Code>. With that
        all keys which were not in the POST payload will be <i>undefined</i>.
      </P>
      <BlockCode code={appCode} lang="python" label="app.py" />
    </>
  );
}
