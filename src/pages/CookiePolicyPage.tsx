import { Flex, Heading } from "@chakra-ui/react";
import { AppHeader, AppFooter, P, A } from "../components";

export default function CookiePolicyPage(): JSX.Element {
  return (
    <Flex direction="column" minHeight="100vh">
      <AppHeader />
      <Flex direction="column" align="center">
        <Heading variant="h2">Cookie Policy</Heading>
        <P>
          You might have noticed there was no <b>cookie banner</b> you had to
          click away (<A href="https://gdpr.eu/cookies/" label="gdpr.eu" />
          ). This is because I don't track any information about you and don't
          give anything to third-party vendors. There are some cookies from{" "}
          <A href="https://www.cloudflare.com/" label="Cloudflare" />. These are
          technically necessary for delivering this website though.
        </P>
      </Flex>
      <AppFooter />
    </Flex>
  );
}
