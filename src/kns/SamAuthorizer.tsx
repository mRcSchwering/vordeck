import { P, H4, Link, Code, BlockCode, Ol } from "./components";

const yaml = `AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31

Parameters:
  CognitoUserPoolArn:
    Type: String
    Default: arn:aws:cognito-idp:eu-central-1:somehash

Resources:
  ApiDeployment:
    Type: AWS::Serverless::Api
    Properties:
      StageName: main
      Auth:
        DefaultAuthorizer: MyCognitoAuthorizer
        Authorizers:
          MyCognitoAuthorizer:
            UserPoolArn: !Ref CognitoUserPoolArn

  GraphQLGetFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: graphql_get.lambda_handler
      Runtime: python3.8
      Events:
        GraphQLGet:
          Type: Api
          Properties:
            RestApiId: !Ref ApiDeployment
            Path: /graphql
            Method: get
            Auth:
              Authorizer: NONE

  GraphQLOptionsFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: graphql_options.lambda_handler
      Runtime: python3.8
      Events:
        GraphQLGet:
          Type: Api
          Properties:
            RestApiId: !Ref ApiDeployment
            Path: /graphql
            Method: options
            Auth:
              Authorizer: NONE

  GraphQLPostFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: graphql_post.lambda_handler
      Runtime: python3.8
      Events:
        GraphQLPost:
          Type: Api
          Properties:
            RestApiId: !Ref ApiDeployment
            Path: /graphql
            Method: post`;

const handler = `def lambda_handler(*_):
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,POST",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        },
    }`;

export default function Page(): JSX.Element {
  return (
    <>
      <P>
        This nugget builds up on the{" "}
        <Link
          href="https://vordeck.de/kn/lambda-graphql"
          label="Lambda-GraphQL nugget"
        />{" "}
        somewhat. You have a GraphQL API hosted by AWS Lambda & API Gateway
        deployed by the{" "}
        <Link
          href="https://aws.amazon.com/serverless/sam/"
          label="SAM framework"
        />
        . For users and login/register features you might want to use{" "}
        <Link href="https://aws.amazon.com/cognito/" label="Cognito" /> as well.
        If you want to do authentication and authorization already in the API
        Gateway layer you should use{" "}
        <Link
          label="API Gateway Lambda authorizers"
          href="https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html"
        />
        . This way you could for example deny all requests without a valid token
        so that they don't even trigger a Lambda function.
      </P>
      <P>
        With a GraphQL API there are some caveats though. A GraphQL client will
        do pre-flight requests regularly (
        <Link
          label="pre-flight requests"
          href="https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request"
        />
        ). For that it will need an <i>OPTIONS</i> endpoint. API Gateway can
        automatically provide this <i>OPTIONS</i> endpoint. Unfortunately, this
        endpoint is now secured by the authorizer as well. That means pre-flight
        requests will be denied. So, you have to define these endpoints yourself
        and explicitly disable the authorizer for them:
      </P>
      <BlockCode code={yaml} lang="yaml" label="template.yaml" />
      <P>
        <Code>Authorizer: NONE</Code> does the trick. Note that I also did this
        for the <i>GET</i> endpoint. In my case I wanted an unauthorized user to
        at least be able to see the{" "}
        <Link
          label="GraphQL Playground"
          href="https://github.com/graphql/graphql-playground"
        />{" "}
        (from the GraphQL Playground you can also provide authorization tokens).
        The <i>OPTIONS</i> endpoint should return status code 200 and whatever
        CORS headers you want to set (here is{" "}
        <Link
          label="Mozilla article on CORS"
          href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
        />
        ). Here is an example:
      </P>
      <BlockCode code={handler} lang="python" />
    </>
  );
}
