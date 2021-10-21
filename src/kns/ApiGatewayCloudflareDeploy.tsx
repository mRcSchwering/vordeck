import { P, H4, Link, Code, BlockCode, Ol, Dli } from "./components";

const templateYaml = `Resources:

  GqlPostFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: graphql_post.lambda_handler
      Runtime: python3.8
      Events:
        Gql:
          Type: Api
          Properties:
            Path: /graphql
            Method: post
            RestApiId: !Ref ApiDeployment

  ApiDeployment:
    Type: AWS::Serverless::Api
    Properties:
      StageName: main
      Domain:
        DomainName: backend.mywebsite.de
        CertificateArn: arn:aws:acm:us-east-1:somehash
        EndpointConfiguration: EDGE`;

export default function Page(): JSX.Element {
  return (
    <>
      <P>
        <Link href="https://aws.amazon.com/free/" label="AWS' free tier" /> and{" "}
        <Link
          href="https://www.cloudflare.com/de-de/plans/"
          label="Cloudflare's free tier"
        />{" "}
        make a great combination. It basically allows you to deploy a serverless
        webapp (with backend and database) for free (almost). Here, I describe
        how to set up a backend using{" "}
        <Link href="https://www.cloudflare.com/" label="Cloudflare" /> and{" "}
        <Link
          href="https://aws.amazon.com/api-gateway/"
          label="AWS API Gateway"
        />
        . The backend is a GraphQL API served by a Lambda function behind the
        API Gateway. For describing the infrastructure on AWS I am using the{" "}
        <Link
          href="https://aws.amazon.com/serverless/sam/"
          label="SAM framework"
        />
        .
      </P>
      <H4>Prerequisites</H4>
      <P>
        You need a domain. Let's say you own <b>mywebsite.de</b>. Additionally,
        you need a{" "}
        <Link
          href="https://www.cloudflare.com/"
          label="Cloudflare (free tier)"
        />{" "}
        and an <Link href="https://aws.amazon.com/" label="AWS" /> account. Your
        domain needs to be transferred from you current registrar to Cloudflare.{" "}
        <Link
          href="https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare"
          label="Here"
        />{" "}
        are some instructions on how to do that.
      </P>
      <H4>Create a certificate</H4>
      <P>
        We need to create a custom AWS-managed certificate for your domain. In
        AWS this is done in the AWS certificate manager. This must be done in{" "}
        <b>us-east-1</b> (
        <Link
          label="AWS dev guide"
          href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html"
        />
        ). Even if the rest of your infrastructure is in say <i>eu-central-1</i>
        . The certificate should be in <i>us-east-1</i>.
      </P>
      <Ol>
        <Dli label="Request certificate">
          In the AWS console open AWS Certificate Manager in <i>us-east-1</i>{" "}
          and click on <i>Request certificate</i>. Request a public certificate.
        </Dli>
        <Dli label="Define domain name">
          Add your domain name like <Code>mywebsite.de</Code>. Also add a name
          for subdomains like <Code>*.mywebsite.de</Code>
        </Dli>
        <Dli label="Validate certificate">
          I would recommend DNS validation. AWS will give you a few TXT records
          that you have to enter in your domain's DNS records on Cloudflare. It
          can take a few minutes for AWS to recognize the records.
        </Dli>
      </Ol>
      <H4>Deploy backend with custom domain</H4>
      <P>
        Say you have a setup{" "}
        <Link label="like this" href="https://vordeck.de/kn/lambda-graphql" />:
        Your backend is in Lambda functions behind an API Gateway, everything is
        orchestrated using SAM.
      </P>
      <Ol>
        <Dli label="Define API Deployment Resource">
          As shown in the code snippet below add an <i>ApiDeployment</i>{" "}
          resource in your <i>template.yaml</i>. The <i>DomainName</i> must be a
          subdomain of your domain. As <i>CertificateArn</i> enter the ARN of
          the custom AWS-managed certificate created earlier.
        </Dli>
        <Dli label="Use API Deployment">
          In <i>template.yaml</i> in the definition of your endpoint, reference
          the API deployment as a <i>RestApiId</i> property.
        </Dli>
        <Dli label="Deploy SAM">
          Now run <Code>sam deploy</Code> and wait for the deployment to finish.
        </Dli>
        <Dli label="Get API Gateway domain name">
          In the AWS console open <i>API Gateway</i> and click on{" "}
          <i>Custom Domain Names</i>. Your backend domain name should be listed
          there. Click on it. In the endpoint configuration window take the{" "}
          <i>API Gateway domain name</i>. It should look somthing like{" "}
          <Code>dr341df1nraso.cloudfront.net</Code>.
        </Dli>
      </Ol>
      <BlockCode code={templateYaml} lang="yaml" />
      <H4>Cloudflare Setup</H4>
      <P>
        Now we just need to add a DNS record in Cloudflare. Login to Cloudflare
        and select your domain.
      </P>
      <Ol>
        <Dli label="Check Full (strict) SSL/TLS encryption">
          Under <i>SSL/TLS</i> encryption should be set to <i>Full (strict)</i>.
        </Dli>
        <Dli label="Add CNAME">
          Select <i>DNS</i>, then add a new CNAME record. Give it the name of
          your subdomain <i>e.g. backend</i>. As value use the API Gateway
          domain name from earler.
        </Dli>
        <Dli label="Test">
          After saving wait a minute then try to reach your backend via
          Cloudflare. In this example that would be a POST to{" "}
          <i> https://backend.mywebsite.de/graphql</i>.
        </Dli>
      </Ol>
    </>
  );
}
