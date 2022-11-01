import { Heading } from "@chakra-ui/react";
import { P, A, Code, BlockCode, Ol, Dli, Img } from "../components";

const allowPublicPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::mywebsite-frontend/*"
      }
  ]
}`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/cloudflare_cloudfront__lambda_s3.jpg"
        width="800px"
        height="150px"
      />
      <P>
        <A href="https://aws.amazon.com/free/" label="AWS' free tier" /> and{" "}
        <A
          href="https://www.cloudflare.com/de-de/plans/"
          label="Cloudflare's free tier"
        />{" "}
        make a great combination. It basically allows you to deploy a serverless
        webapp (with backend and database) for free (almost). Here, I describe
        how to set up an SPA with{" "}
        <A href="https://www.cloudflare.com/" label="Cloudflare" />,
        <A href="https://aws.amazon.com/s3/" label="S3" />, and{" "}
        <A href="https://aws.amazon.com/cloudfront/" label="Cloudfront" />.
      </P>
      <Heading variant="h4">Prerequisites</Heading>
      <P>
        You need a domain. Let's say you own <b>mywebsite.de</b>. Additionally,
        you need a <A href="https://www.cloudflare.com/" label="Cloudflare" />{" "}
        (free tier) and an <A href="https://aws.amazon.com/" label="AWS" />{" "}
        account. Your domain needs to be transferred from you current registrar
        to Cloudflare.{" "}
        <A
          href="https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare"
          label="Here"
        />{" "}
        are some instructions on how to do that. Finally, you need an SPA / some
        static files you want to host as a website.
      </P>
      <Heading variant="h4">Create SPA S3 Bucket</Heading>
      <P>
        The website lives in an S3 bucket. Once we connect Cloudfront to it, all
        files in the S3 bucket will be served as website. A (re)deploy will just
        be the process of uploading new files to the S3 bucket.
      </P>
      <Ol>
        <Dli label="Create S3 bucket">
          In the AWS console, open S3 and create a bucket. You could name it{" "}
          <i>mywebsite-frontend</i> for example
        </Dli>
        <Dli label="Upload SPA">
          You can upload all files using the AWS console.
        </Dli>
        <Dli label="Allow public access">
          go to <i>Permissions</i> and uncheck all public access blocks. Then
          edit the bucket policy like shown below.
        </Dli>
        <Dli label="Whait for global S3 URL to become active">
          There is a local URL of your bucket (like{" "}
          <i>http://s3-eu-central-1.amazonaws.com/mywebsite-frontend/</i>) and a
          global (like <i>http://s3.amazonaws.com/mywebsite-frontend/</i>). The
          first one is immediately active upon bucket creation. The second one
          can take up to a few hours. Cloudfront (later) is easier to set up if
          the global version is already available.
        </Dli>
      </Ol>
      <P>
        With the policy below everyone has read access to your bucket. Replace
        the name <Code>mywebsite-frontend</Code> with the name of your S3
        bucket.
      </P>
      <BlockCode code={allowPublicPolicy} lang="json" />
      <Heading variant="h4">Create a certificate</Heading>
      <P>
        We need to create a custom AWS-managed certificate for your domain. In
        AWS this is done in the AWS certificate manager. This must be done in{" "}
        <b>us-east-1</b> (
        <A
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
      <Heading variant="h4">Create Cloudfront Distribution</Heading>
      <P>
        Cloudfront is AWS' content delivery network. Here, we use it get TLS/SSL
        for our S3 bucket SPA. This way we can establish a secure <i>HTTPS</i>{" "}
        connection to our website.
      </P>
      <Ol>
        <Dli label="Create a Cloudfront distribution">
          In AWS console open Cloudfront and create a new distribution.
        </Dli>
        <Dli label="Chose S3 bucket as origin">
          Chose the S3 bucket you just created as origin. Use its global URL.
          You should be able to select it from the dropdown.
        </Dli>
        <Dli label="Set a custom SSL certificate">
          Set the custom AWS-managed SSL certificate for your domain that you
          created above.
        </Dli>
        <Dli label="(Set custom error for redirect)">
          If you have different routes in your SPA you will need to redirect
          every request to <i>index.html</i>. For that go to <i>Error Pages</i>{" "}
          and create a custom error response with error Code 403, minimum TTL 0,
          response path <i>index.html</i>, and response Code 200.
        </Dli>
        <Dli label="Get distribution domain name">
          Deploy the distribution and get a distribution domain name (some URL
          that looks like this <i>https://d1dyasvndfdski.cloudfront.net</i>).
        </Dli>
      </Ol>
      <Heading variant="h4">Cloudflare Setup</Heading>
      <P>
        Finally, we need to do some DNS configuration in Cloudflare. Cloudflare
        should direct <i>mywebsite.de</i> requests to the Cloudfront
        distribution.
      </P>
      <Ol>
        <Dli label="Select your domain">
          After your domain was transferred to Cloudflare you should be able to
          select it in their console.
        </Dli>
        <Dli label="Set Full (strict) SSL/TLS encryption">
          Select <i>SSL/TLS</i> then select <i>Full (strict)</i>.
        </Dli>
        <Dli label="Edit DNS record">
          Select <i>DNS</i>, then select the record named <i>mywebsite.de</i>.
          If it's not there create a new record. Make it a <i>CNAME</i> record.
          As content enter the Cloudfront distribution domain name from above.
          The proxy status should be <i>Proxied</i>
        </Dli>
        <Dli label="(Add www CNAME record)">
          Optionally add another <i>CNAME</i> with name <i>www</i> and the
          Cloudfront distribution domain name as content.
        </Dli>
      </Ol>
      <P>
        Afterwards the SPA should be reachable from <i>https://mywebsite.de</i>{" "}
        and <i>https://www.mywebsite.de</i>. If not try to access the different
        URLs to find out where the problem is. If you can't reach the S3 URL (
        <i>http://s3.amazonaws.com/mywebsite-frontend/</i>) the URL might not be
        active yet or the permissions are wrong.
      </P>
      <Heading variant="h4">Without Cloudfront</Heading>
      <P>
        There is a way of setting this up without Cloudfront. This usually
        involves using the <i>website hosting</i> feature of S3 and then setting
        Cloudflare's SSL/TLS to <i>flexible</i>. In this case the S3 bucket
        needs to bear the domain name of your website (so the S3 bucket must be
        named <i>mywebsite.de</i> for example). There are many tutorials for
        this setup (
        <A
          href="https://medium.com/@hranicka/hosting-a-static-website-amazon-s3-cloudflare-127b57a13461"
          label="here is one"
        />
        ). The main problem with this setup is that you need to set Cloudfront's
        SSL/TLS to <i>flexible</i>. And unfortunately in Cloudfront you can only
        set the whole domain to one SSL/TLS setting. So, if any other resource
        under your domain is already encrypted, you cannot serve define it in
        Cloudflare anymore. Say your backend is an AWS API Gateway (which comes
        already with <i>https</i>). You will have to use its direct URL (which
        looks something like{" "}
        <i>
          https://tpdfuasbh6.execute-api.eu-central-1.amazonaws.com/stage/graphql/
        </i>
        ). By using Cloudfront S3 is encrypted as well and Cloudflare can be set
        to <i>Full (strict)</i>, thus allowing you to hide everything behind
        Cloudflare.
      </P>
    </>
  );
}
