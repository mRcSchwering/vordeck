import React from "react";
import { Heading, Container, Box, Link } from "@chakra-ui/react";
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
    <Box style={{ height: "100vh" }}>
      <AppHeader />
      <Section style={{ marginBottom: "30vh" }}>
        <Heading as="h2">Cookie Policy</Heading>
        <Container textAlign="center">
          You might have noticed there was no <b>cookie banner</b> you had to
          click away ({gdprLink}). This is because I don't track any information
          about you and don't give anything to third-party vendors. There are
          some cookies from {cloudflareLink}. These are technically necessary
          for delivering this website though.
        </Container>
      </Section>
      <AppFooter />
    </Box>
  );
}
