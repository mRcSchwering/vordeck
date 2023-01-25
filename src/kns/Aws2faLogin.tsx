import { P, BlockCode, Img, Code, A } from "../components";

const awsDocs = (
  <A
    href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html"
    label="AWS MFA guide"
  />
);

const awsDocs2 = (
  <A
    href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html"
    label="MFA-protected API access"
  />
);

const awsLogin = `#!/bin/bash
# AWS STS session login with MFA
# The MFA device is Authy (Account: <my-authy-account>)
# key id, secret key, and session token are exported.
# Session expires after 12 hours
# Use:
#
#   source aws_login.sh
#
(return 0 2>/dev/null) && sourced=1 || sourced=0
if [ $sourced -eq 0 ]; then
        echo "This script must be sourced"
        exit 1
fi

echo "AWS CLI login for <my-authy-account>"
echo "AWS must be configured for <my-authy-account>"
echo 

read -p "Enter Authy code: " code
echo 

json=$(aws sts get-session-token \\
    --serial-number arn:aws:iam::<my-aws-account>:mfa/<my-authy-account> \\
    --token-code "$code")

keyid=$(echo "$json" | jq -r '.Credentials.AccessKeyId')
secretkey=$(echo "$json" | jq -r '.Credentials.SecretAccessKey')
token=$(echo "$json" | jq -r '.Credentials.SessionToken')

export AWS_ACCESS_KEY_ID="$keyid"
export AWS_SECRET_ACCESS_KEY="$secretkey"
export AWS_SESSION_TOKEN="$token"

echo "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN exported"
echo "Session valid for 12 hours"
`;

const awsLogout = `#!/bin/bash
# Unsets all AWS environment variables
# Afterwards AWS CLI will fall back to reading .aws/credentials
# Use:
#
#   source aws_logout.sh
#
(return 0 2>/dev/null) && sourced=1 || sourced=0
if [ $sourced -eq 0 ]; then
        echo "This script must be sourced"
        exit 1
fi

unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN

echo "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN unset"
`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://i.pinimg.com/originals/88/cc/a6/88cca6e8b43bf251442fde59821f9ea6.jpg"
        width="600px"
        height="400px"
      />
      <P>
        In the beginning I used AWS via the console. I protected a strong
        password and 2FA.Then, I created an admin user with a access key and
        started doing everything via the AWS CLI. I did this because I was too
        lazy to always create dedicated roles and policies for regular AWS
        tinkering. So on the one hand, there's a nicely protected console login.
        And on the other hand, there's a never-expiring, all-access, plain text
        token laying around on my computer. There is a better solution. One that
        is as user-friendly as the admin user token, but much more secure.
      </P>
      <P>
        In principle MFA is explained in this {awsDocs}. But it's hard to find
        the important bits. So, here is a breakdown. First, you create an IAM
        user with an access key and with a policy. In this policy you allow that
        user, whatever you want to allow (
        <Code>"Action": "*", "Resource": "*"</Code> ahem...), but you add the
        condition{" "}
        <Code>{`"Bool": {"aws:MultiFactorAuthPresent": "true"}`}</Code>
        . Then, you have to enable an MFA device for your account for that user.
        You might have already done that for your root user (the one with
        console only login), but you can also do this for other IAM users. I
        used <A href="https://authy.com/" label="Authy" />. Now, you can request
        a session token for that user only if you provide both AWS credentials
        and MFA information. MFA information is provided with{" "}
        <Code>--token-code</Code>. This can be made user friendly with a little
        bash script.
      </P>
      <BlockCode code={awsLogin} lang="bash" label="aws_login.sh" />
      <P>
        This script makes a request to get a session token for this user, parses
        it, sets and exports the relevant AWS environment variables. You will
        find the token code with <Code>{`<my-aws-account>`}</Code> and{" "}
        <Code>{`<my-authy-account>`}</Code> in the MFA identifier for the
        account. For unsetting them, you can create another script.
      </P>
      <BlockCode code={awsLogout} lang="bash" label="aws_logout.sh" />
      <P>
        For a personal computer this solution might be fine. A more secure setup
        would be to instead assume a role with only the access rights needed for
        a certain operation. This is explained in detail in the {awsDocs2} part
        of the AWS user guide.
      </P>
    </>
  );
}
