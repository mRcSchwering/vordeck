import React from "react";
import { Heading, Paragraph, Anchor } from "grommet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const samLink = (
  <Anchor
    href="https://aws.amazon.com/de/serverless/sam/"
    label="SAM framework (aws.amazon.com)"
    target="_blank"
  />
);

const gqlPlaygroundLink = (
  <Anchor
    href="https://github.com/prisma/graphql-playground"
    label="graphql playground (github.com)"
    target="_blank"
  />
);
const ariadneLink = (
  <Anchor href="https://ariadnegraphql.org/" label="Ariadne" target="_blank" />
);

const ariadneIntroLink = (
  <Anchor
    href="https://ariadnegraphql.org/docs/intro"
    label="introduction"
    target="_blank"
  />
);

const uvicornLink = (
  <Anchor href="https://www.uvicorn.org/" label="Uvicorn" target="_blank" />
);
const backendLink = (
  <Anchor
    href="https://github.com/mRcSchwering/prevailing-winds/tree/main/backend"
    label="prevailing-winds backend (github.com)"
    target="_blank"
  />
);

const yamlDef = `
Resources:
  GqlPostFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: graphql_post.lambda_handler
      Runtime: python3.8
      Policies:
        - S3ReadPolicy:
            BucketName: !Ref ContentBucket
      Events:
        Gql:
          Type: Api
          Properties:
            Path: /graphql
            Method: post
            RestApiId: !Ref ApiDeployment`;

const starletteGql = `
from pathlib import Path
from ariadne import load_schema_from_path, make_executable_schema
from ariadne.asgi import GraphQL
from src.queries import queries

this_dir = Path(__file__).parent.absolute()
schema_def = load_schema_from_path(str(this_dir))
schema = make_executable_schema(schema_def, *queries)

app = GraphQL(schema)`;

const lambdaHandler = `
from ariadne import graphql_sync
from src.handler import Event, Context, form_output
from src.schema import schema

def lambda_handler(event_dict: dict, _: Context):
    event = Event(**event_dict)
    success, result = graphql_sync(
        schema=schema, data=event.body, context_value={"request": event}
    )
    return form_output(status=200 if success else 400, body=result)`;

export default function Page(): JSX.Element {
  return (
    <>
      <Paragraph>
        Creating a serverless API using AWS Lambda with API Gateway is pretty
        neat. There are tools such as the {samLink} with tutorials on how to set
        up a REST API. However, I found that setting up a GraphQL API like this
        is usually much better. Here is a little summary:
      </Paragraph>
      <Paragraph>
        <b>good</b>
        <ul>
          <li>
            GraphQL (well defined API, only one endpoint, enables client-side)
          </li>
          <li>
            serverless (little maintainance, pay-per-use, highly available,
            scalable)
          </li>
          <li>only one endpoint (Lambda function less likely to be cold)</li>
          <li>only one endpoint (no 1k lines of template.yaml)</li>
          <li>
            no changes in template.yaml (once defined, development happens
            solely in code)
          </li>
        </ul>
        <b>bad</b>
        <ul>
          <li>technical limitations of AWS API Gateway + Lambda</li>
          <li>Multipart file-upload sucks</li>
          <li>
            100-150ms overhead (10-100 times slower than a running server)
          </li>
        </ul>
      </Paragraph>
      <Heading level="3">Setup Endpoint in template.yaml</Heading>
      <Paragraph>
        You only need one endpoint to answer POST requests. So, the SAM
        `template.yaml` definition can be as little as the code below. I define
        the endpoint with lambda function that handles POSTs and I put it on{" "}
        <code> /graphql </code>
        since this where most frameworks expect this endpoint to be. In my case
        the lambda function needs read access to an S3 bucket as well, which I
        provide with a policy.
      </Paragraph>
      <SyntaxHighlighter language="yaml" style={docco}>
        {yamlDef}
      </SyntaxHighlighter>
      <Paragraph>
        What you can do on top of that is to add a GET endpoint on{" "}
        <code> / </code>
        as well. This is not strictly necessary for your API to work, but it
        makes it easier to develop. You can serve {gqlPlaygroundLink} there
        which gives you a tool play with your API and develop queries.
      </Paragraph>
      <Heading level="3">Ariadne for Python GraphQL</Heading>
      <Paragraph>
        I'm using {ariadneLink} to develop the API in python. You first define a
        schema (usually as a <code> .graphql </code>) file and then write
        resolvers for it. The resolvers are just normal python functions. The
        code below shows a simple app. Here, <code> queries </code> is a list
        that contains all the resolver functions, and <code> schema_def </code>{" "}
        is the schema definition from the <code> .graphql </code> file. Both of
        them are combined into an ASGI app which you could serve with{" "}
        {uvicornLink}. For more information on how Ariadne works see their{" "}
        {ariadneIntroLink}. This is how a simple ASGI app could look like:
      </Paragraph>
      <SyntaxHighlighter language="python" style={docco}>
        {starletteGql}
      </SyntaxHighlighter>
      <Heading level="3">Ariadne in Lambda</Heading>
      <Paragraph>
        Ariadne also has a <code> graphql_sync </code> function which lets you
        execute a single query synchronously (without the ASGI app). This is
        what I use in the lambda handler of the <code> /graphql </code> POST
        endpoint. Below is an example. Here,{" "}
        <code> Event, Context, form_output </code> are just helpers to make the
        request and response dictionaries a little easier to handle. For details
        see the backend code of one webapp {backendLink}.
      </Paragraph>
      <SyntaxHighlighter language="python" style={docco}>
        {lambdaHandler}
      </SyntaxHighlighter>
      <Paragraph>
        Now you might wonder, how inefficient is this setup? On every request,
        the schema definition and resolvers are initialized before the actual
        query is handled. In short test sessions testing _hello-world_
        endpoints, this setup turned out to be about 10x to 100x slower than
        having the Ariadne app running on a EC2 instance. Nevertheless, it is
        fast enough for most of my use cases. I found this setup to have an
        overhead of roughly 100-150ms (on top of the actual query execution) in
        a hot lambda function. A nice side-effect of this setup is, that it is
        less likely for the Lambda function to be cold, since all requests
        trigger the same lambda function. <i>I.e.</i> your whole webapp will
        probably use this endpoint. On top, you could make the frontend trigger
        a request upon initialization, activating a possibly cold Lambda
        function. This would ensure that user-triggered requests will always
        reach a hot lambda function.
      </Paragraph>
    </>
  );
}
