import { Flex } from "@chakra-ui/react";
import { AppHeader, AppFooter, PageContainer, H2, P, A } from "../components";

export default function CookiePolicyPage(): JSX.Element {
  return (
    <PageContainer>
      <AppHeader />
      <Flex direction="column" align="center">
        <H2 text="Cookie Policy" />
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
    </PageContainer>
  );
}
