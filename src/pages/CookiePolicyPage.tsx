import { Heading, Text, Flex, Link } from "@chakra-ui/react";
import { AppHeader, Section, AppFooter } from "../components";

const gdprLink = (
  <Link href="https://gdpr.eu/cookies/" isExternal>
    gdpr.eu
  </Link>
);

const cloudflareLink = (
  <Link href="https://www.cloudflare.com/" isExternal>
    Cloudflare
  </Link>
);

export default function CookiePolicyPage(): JSX.Element {
  return (
    <Flex direction="column" style={{ height: "100vh" }}>
      <AppHeader />
      <Section style={{ marginBottom: "30vh" }}>
        <Heading as="h2" my={10} color="gray.700" fontSize={50}>
          Cookie Policy
        </Heading>
        <Text as="p" my={10} fontSize={21}>
          You might have noticed there was no <b>cookie banner</b> you had to
          click away ({gdprLink}). This is because I don't track any information
          about you and don't give anything to third-party vendors. There are
          some cookies from {cloudflareLink}. These are technically necessary
          for delivering this website though.
        </Text>
      </Section>
      <AppFooter />
    </Flex>
  );
}
