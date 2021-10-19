import React from "react";
import { Paragraph, Anchor, Heading } from "grommet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const awsLink = (
  <Anchor href="https://aws.amazon.com/" label="AWS" target="_blank" />
);

const cloudflareLink = (
  <Anchor
    href="https://www.cloudflare.com/"
    label="Cloudflare"
    target="_blank"
  />
);

const awsfreeLink = (
  <Anchor
    href="https://aws.amazon.com/free/"
    label="AWS' free tier"
    target="_blank"
  />
);

const websitehostingtutLink = (
  <Anchor
    href="https://medium.com/@hranicka/hosting-a-static-website-amazon-s3-cloudflare-127b57a13461"
    label="here is one"
    target="_blank"
  />
);

const cloudflarepricingLink = (
  <Anchor
    href="https://www.cloudflare.com/de-de/plans/"
    label="Cloudflare's free tier"
    target="_blank"
  />
);

const cloudflaretransferLink = (
  <Anchor
    href="https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare"
    label="Here"
    target="_blank"
  />
);

const s3Link = (
  <Anchor href="https://aws.amazon.com/s3/" label="S3" target="_blank" />
);

const cloudfrontLink = (
  <Anchor
    href="https://aws.amazon.com/cloudfront/"
    label="Cloudfront"
    target="_blank"
  />
);

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
      <Paragraph>
        {awsfreeLink} and {cloudflarepricingLink} make a great combination. It
        basically allows you to deploy a serverless webapp (with backend and
        database) for free (almost). Here, I describe how to set up an SPA with{" "}
        {cloudflareLink},{s3Link}, and {cloudfrontLink}.
      </Paragraph>
      <Heading level="4">Prerequisites</Heading>
      <Paragraph>
        You need a domain. Let's say you own <b>mywebsite.de</b>. Additionally,
        you need a {cloudflareLink} (free tier) and an {awsLink} account. In
        order to use your domain with Cloudflare, you need to transfer it from
        your registrar to Cloudflare. {cloudflaretransferLink} are some
        instructions on how to do that. Finally, you need an SPA / some static
        files you want to host as a website.
      </Paragraph>
      <Heading level="4">S3 Bucket</Heading>
      <Paragraph>
        <ol>
          <li>
            <b>Create S3 bucket</b> In the AWS console, open S3 and create a
            bucket. You could name it <i>mywebsite-frontend</i> for example
          </li>
          <li>
            <b>Upload SPA</b> putting all static files into the S3 bucket
          </li>
          <li>
            <b>Allow public access</b> go to <i>Permissions</i> and uncheck all
            public access blocks. Then edit the bucket policy like shown below.
          </li>
          <li>
            <b>Whait for global S3 URL to become active</b> There is a local URL
            of your bucket (like{" "}
            <i>http://s3-eu-central-1.amazonaws.com/mywebsite-frontend/</i>) and
            a global (like <i>http://s3.amazonaws.com/mywebsite-frontend/</i>).
            The first one is immediately active upon bucket creation. The second
            one can take up to a few hours. Cloudfront (later) is easier to set
            up if the global version is already available.
          </li>
        </ol>
        With the policy below everyone is able to download all objects within
        your bucket. Replace the name <code>mywebsite-frontend</code> with the
        name of your S3 bucket.
      </Paragraph>
      <SyntaxHighlighter language="json" style={docco}>
        {allowPublicPolicy}
      </SyntaxHighlighter>
      <Heading level="4">Certificate Manager</Heading>
      <Paragraph>
        In AWS console open Certificate Manager and create a{" "}
        <b>custom AWS-managed certificate</b>. As domains add your domain as
        CNAME. It's convenient to also add a CNAME for all subdomains.
        <i>E.g.</i> <code>mywebsite.de</code> and <code>*.mywebsite.de</code>.
      </Paragraph>
      <Heading level="4">Cloudfront Distribution</Heading>
      <Paragraph>
        <ol>
          <li>
            <b>Create a Cloudfront distribution</b> In AWS console open
            Cloudfront and create a new distribution.
          </li>
          <li>
            <b>Chose S3 bucket as origin</b> Chose the S3 bucket you just
            created as origin. Use its global URL. You should be able to select
            it from the dropdown.
          </li>
          <li>
            <b>Set a custom SSL certificate</b> Set the custom AWS-managed SSL
            certificate for your domain that you created above.
          </li>
          <li>
            <b>(Set custom error for redirect)</b> If you have different routes
            in your SPA you will need to redirect every request to{" "}
            <i>index.html</i>. For that go to <i>Error Pages</i> and create a
            custom error response with error code 403, minimum TTL 0, response
            path <i>index.html</i>, and response code 200.
          </li>
          <li>
            <b>Get distribution domain name</b> Deploy the distribution and get
            a distribution domain name (some URL that looks like this{" "}
            <i>https://d1dyasvndfdski.cloudfront.net</i>).
          </li>
        </ol>
      </Paragraph>
      <Heading level="4">Cloudflare Setup</Heading>
      <Paragraph>
        <ol>
          <li>
            <b>Select your domain</b> After your domain was transferred to
            Cloudflare you should be able to select it in their console.
          </li>
          <li>
            <b>Set Full (strict) SSL/TLS encryption</b> Select <i>SSL/TLS</i>{" "}
            then select <i>Full (strict)</i>.
          </li>
          <li>
            <b>Edit DNS record</b> Select <i>DNS</i>, then select the record
            named <i>mywebsite.de</i>. If it's not there create a new record.
            Make it a <i>CNAME</i> record. As content enter the Cloudfront
            distribution domain name from above. The proxy status should be{" "}
            <i>Proxied</i>
          </li>
          <li>
            <b>Add www CNAME record</b> Optionally add another <i>CNAME</i> with
            name <i>www</i> and the Cloudfront distribution domain name as
            content.
          </li>
        </ol>
        Afterwards the SPA should be reachable from <i>https://mywebsite.de</i>{" "}
        and <i>https://www.mywebsite.de</i>. If not try to access the different
        URLs to find out where the problem is. If you can't reach the S3 URL (
        <i>http://s3.amazonaws.com/mywebsite-frontend/</i>) the URL might not be
        active yet or the permissions are wrong.
      </Paragraph>
      <Heading level="4">Without Cloudfront</Heading>
      <Paragraph>
        There is a way of setting this up without Cloudfront. This usually
        involves using the <i>website hosting</i> feature of S3 and then setting
        Cloudflare's SSL/TLS to <i>flexible</i>. In this case the S3 bucket
        needs to bear the domain name of your website (so the S3 bucket must be
        named <i>mywebsite.de</i> for example). There are many tutorials for
        this setup ({websitehostingtutLink}). The main problem with this setup
        is that you need to set Cloudfront's SSL/TLS to <i>flexible</i>. And
        unfortunately in Cloudfront you can only set the whole domain to one
        SSL/TLS setting. So, if any other resource under your domain is already
        encrypted, you cannot serve define it in Cloudflare anymore. Say your
        backend is an AWS API Gateway (which comes already with <i>https</i>).
        You will have to use its direct URL (which looks something like{" "}
        <i>
          https://tpdfuasbh6.execute-api.eu-central-1.amazonaws.com/stage/graphql/
        </i>
        ). By using Cloudfront S3 is encrypted as well and Cloudflare can be set
        to <i>Full (strict)</i>.
      </Paragraph>
    </>
  );
}
