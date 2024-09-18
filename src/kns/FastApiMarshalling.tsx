import { Heading } from "@chakra-ui/react";
import { P, BlockCode, Img, Code, A, Ul, Dli } from "../components";
import { Link } from "react-router-dom";

const usualCode = `from pydantic import BaseModel

class APayload(BaseModel):
    a: str
    b: str | None`;

const fullCode = `from typing import Any
from pydantic import BaseModel, Field

class ExcludeUnsetModel(BaseModel):
    def dict(self, *args, **kwargs) -> dict[str, Any]:
        return super().dict(*args, **{**kwargs, "exclude_unset": True})

class APayload(ExcludeUnsetModel):
    a: str = Field(..., description="required string")
    b: str | None = Field(..., description="required string or null")
    c: str = Field("", description="optional string")
    d: str | None = Field(None, description="optional string or null")

class AResponse(ExcludeUnsetModel):
    a: str = Field(..., description="exists as string")
    b: str | None = Field(..., description="exists as string or null")
    c: str = Field("", description="might exists as string")
    d: str | None = Field(None, description="might exist as string or null")

@router.post("/view", response_model=AResponse)
async def view(payload: APayload):
    return payload`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://pbs.twimg.com/media/DusCOfyXcAA9_F7.jpg:large"
        width="450px"
        height="150px"
      />
      <P>
        In an earlier{" "}
        <A
          href="/kn/python-update-api"
          label="knowledge nugget about update endpoints"
        />{" "}
        I was highlighting how distinguishing between <Code>null</Code> and{" "}
        <Code>undefined</Code> can make APIs more versatile. When building a
        GraphQL API with something like{" "}
        <A href="https://ariadnegraphql.org/" label="Ariadne" /> this is no
        problem. In python parameters are contained in a <Code>dict</Code>.
        Fields which were not provided by the user don't exist. Fields which
        were provided with value <Code>null</Code> exist with <Code>None</Code>.
        So, the distinction can still be made. All payload requirements are
        clearly defined in the GraphQL schema.
      </P>
      <Heading variant="h4">FastAPI and Pydantic</Heading>
      <P>
        Unfotunately, this is not the case when building a{" "}
        <A href="https://fastapi.tiangolo.com/" label="FastAPI" /> app. In
        larger FastAPI projects marshalling is usually done using{" "}
        <A href="https://docs.pydantic.dev/" label="Pydantic" />. Pydantic
        models are defined to describe payloads and responses. Together payloads
        and responses are validated at runtime (with useful user feedback) and
        documented for a{" "}
        <A
          href="https://swagger.io/specification/"
          label="OpenAPI specification"
        />
        . Unfortunately, Pydantic has no straight forward way of separating{" "}
        <Code>null</Code> and <Code>undefined</Code>. Let's say we want to
        define a payload with 2 required fields <Code>a</Code> and{" "}
        <Code>b</Code>.<Code>a</Code> should only accept string, <Code>b</Code>{" "}
        strings or <Code>null</Code>.
      </P>
      <BlockCode code={usualCode} lang="python" />
      <P>
        This model would make <Code>b</Code> optional and give it the default
        value <Code>None</Code> if the user didn't provide it. If this model
        would be used for serializing the response of an endpoint, it would also
        convert a missing <Code>b</Code> field to <Code>None</Code> instead of
        raising an exception. Furthermore, let's say there is an optional field{" "}
        <Code>c</Code>. If it is set, is has to be a string (it cannot be{" "}
        <Code>null</Code>). How would we define that?
      </P>
      <P>
        There are many Github discussions on Pydantic's and FastAPI's
        repositories about this topics. One part of the problem is marking
        fields required and optional, independent of whether they allow the{" "}
        <Code>None</Code> type. Another part is the problem of distinguishing
        between a value that was not provided and a provided{" "}
        <Code>null/None</Code> value. Finally, the schema should be properly
        displayed in the OpenAPI specification. After some hours of reading and
        trying out I found this solution to be the best. It uses the fewest
        hacks and provides the intended behaviour.
      </P>
      <BlockCode code={fullCode} lang="python" />
      <Heading variant="h6">Payload</Heading>
      <Ul>
        <Dli label="a"> Required in payload. It must be a string.</Dli>
        <Dli label="b">
          {" "}
          Required in payload. It can be a string or <Code>null</Code>.
        </Dli>
        <Dli label="c">
          {" "}
          Optional in payload. If provided it has to be a string.
        </Dli>
        <Dli label="d">
          {" "}
          Optional in payload. If provided it can be a string or{" "}
          <Code>null</Code>.
        </Dli>
      </Ul>
      <Heading variant="h6">Response</Heading>
      <Ul>
        <Dli label="a"> Will be in response. It will contain a string.</Dli>
        <Dli label="b">
          {" "}
          Will be in response. It can contain a string or <Code>null</Code>.
        </Dli>
        <Dli label="c">
          {" "}
          Might not be in response. If it is, it will be a string.
        </Dli>
        <Dli label="d">
          {" "}
          Might not be in response. If it is, it can be a string or{" "}
          <Code>null</Code>.
        </Dli>
      </Ul>
      <P>
        Here, the <Code>/view</Code> endpoint is just for trying out the payload
        and response models. Notably, ellipsis (<Code>...</Code>) must be set as
        default value to explicity set a field as required. A default value
        (other than ellipsis) must be set to explicitly set a field as optional.
        Furthermore, <Code>exclude_unset</Code> must be set <Code>True</Code>.
        There are ways of doing this with a configuration option on the Pydantic{" "}
        <Code>BaseModel</Code>. However, when the model is used in FastAPI's{" "}
        <Code>router</Code> operations it will be overridden. That's why I
        override <Code>dict</Code> to override <Code>exclude_unset</Code> again.
        Finally, the <Code>None/null</Code> option is not shown in the OpenAPI
        specification. So, a user doesn't know that <i>e.g.</i> <Code>b</Code>{" "}
        can be a string or <Code>null</Code>. Unfortunately, I found adding a
        custom description as the only reasonable solution for that.
      </P>
    </>
  );
}
