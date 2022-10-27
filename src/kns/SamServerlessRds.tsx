import { P, A, Code, BlockCode, Img } from "../components";

const yaml = `AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31

Parameters:
  DbConnectionUrl:
    Type: String
    Default: postgresql://postgres@localhost:5432/main
  LambdaSg:
    Type: AWS::EC2::SecurityGroup::Id
    Default: sg-somehash
  LambdaSubnets:
    Type: List<AWS::EC2::Subnet::Id>
    Default: subnet-hash1,subnet-hash2,subnet-hash3

Resources:
  GraphQLPostFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: graphql_post.lambda_handler
      Runtime: python3.8
      Environment:
        Variables:
          DB_CONNECTION_URL: !Ref DbConnectionUrl
      Policies:
        - VPCAccessPolicy: {}
      VpcConfig:
        SecurityGroupIds:
          - !Ref LambdaSg
        SubnetIds: !Ref LambdaSubnets
      Events:
        GraphQLPost:
          Type: Api
          Properties:
            Path: /graphql
            Method: post`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/aurora_lambda.jpg"
        width="300px"
        height="120px"
      />
      <P>
        This took me longer than I thought, so I'm writing it down. AWS offers a{" "}
        <A
          label="serverless version of Aurora"
          href="https://aws.amazon.com/rds/aurora/serverless/"
        />
        . This is pretty cool because you have less to configure and it scales
        automatically. You can even set the minimum number of workers to 0! In
        this case the database server shuts down after some time of inactivity
        (it takes about half a minute to start up again). Really good for
        development.
      </P>
      <P>
        Anyway. I am usually using{" "}
        <A
          href="https://aws.amazon.com/serverless/sam/"
          label="the SAM framework"
        />{" "}
        to set up a backend consisting of Lambda functions and an API Gateway.
        Serverless Aurora can only be accessed from within a private subnet
        group. The usual setup is having a VPC with a connected public and a
        private subnet group. For resources in the private subnet group you need
        a NAT gateway in order for them to talk to the internet. This is a
        common scenario (
        <A
          href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html"
          label="here is a description from AWS"
        />
        ). That means the Lambda function must be in the private subnet as well
        if it wants to talk to serverless Aurora. It took me a while to get
        SAM's <i>template.yaml</i> right. Here it is:
      </P>
      <BlockCode code={yaml} lang="yaml" label="template.yaml" />
      <P>
        <Code>LambdaSubnets</Code> are the private subnet ids of the subnets in
        which serverless Aurora resides. They must be comma-separated without
        spaces. <Code>LambdaSg</Code> is the security group of that private
        subnet group. <Code>DbConnectionUrl</Code> is just the database
        connection URL. The lambda function needs that to start a session with
        the database. Then under properties the lambda function is declared to
        reside in these subnets using <Code>VpcConfig</Code>. Note also the{" "}
        <Code>{"VPCAccessPolicy: {}"}</Code> (it has to be written like this).
      </P>
    </>
  );
}
