import { P, H4, Link, Code, BlockCode, Ol, Dli } from "./components";

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
      <P>
        <Link href="https://aws.amazon.com/free/" label="AWS' free tier" /> and{" "}
        <Link
          href="https://www.cloudflare.com/de-de/plans/"
          label="Cloudflare's free tier"
        />{" "}
        make a great combination. It basically allows you to deploy a serverless
        webapp (with backend and database) for free (almost). Here, I describe
        how to set up an SPA with{" "}
        <Link href="https://www.cloudflare.com/" label="Cloudflare" />,
        <Link href="https://aws.amazon.com/s3/" label="S3" />, and{" "}
        <Link href="https://aws.amazon.com/cloudfront/" label="Cloudfront" />.
      </P>
      <H4>Prerequisites</H4>
      <P>
        You need a domain. Let's say you own <b>mywebsite.de</b>. Additionally,
        you need a{" "}
        <Link href="https://www.cloudflare.com/" label="Cloudflare" /> (free
        tier) and an <Link href="https://aws.amazon.com/" label="AWS" />{" "}
        account. In order to use your domain with Cloudflare, you need to
        transfer it from your registrar to Cloudflare.{" "}
        <Link
          href="https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare"
          label="Here"
        />{" "}
        are some instructions on how to do that. Finally, you need an SPA / some
        static files you want to host as a website.
      </P>
      <H4>S3 Bucket</H4>
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
        With the policy below everyone is able to download all objects within
        your bucket. Replace the name <Code>mywebsite-frontend</Code> with the
        name of your S3 bucket.
      </P>
      <BlockCode code={allowPublicPolicy} lang="json" />
      <H4>Certificate Manager</H4>
      <P>
        In AWS console open Certificate Manager and create a{" "}
        <b>custom AWS-managed certificate</b>. As domains add your domain as
        CNAME. It's convenient to also add a CNAME for all subdomains.
        <i>E.g.</i> <Code>mywebsite.de</Code> and <Code>*.mywebsite.de</Code>.
      </P>
      <H4>Cloudfront Distribution</H4>
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
      <H4>Cloudflare Setup</H4>
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
      <H4>Without Cloudfront</H4>
      <P>
        There is a way of setting this up without Cloudfront. This usually
        involves using the <i>website hosting</i> feature of S3 and then setting
        Cloudflare's SSL/TLS to <i>flexible</i>. In this case the S3 bucket
        needs to bear the domain name of your website (so the S3 bucket must be
        named <i>mywebsite.de</i> for example). There are many tutorials for
        this setup (
        <Link
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
