import React from "react";
import { Heading, Paragraph, Box, Anchor } from "grommet";
import { AppHeader, Section, AppFooter } from "../components";

const gdprLink = (
  <Anchor href="https://gdpr.eu/cookies/" label="gdpr.eu" target="_blank" />
);

export default function CookiePolicyPage(): JSX.Element {
  return (
    <Box style={{ height: "100vh" }}>
      <AppHeader />
      <Section style={{ marginBottom: "50vh" }}>
        <Heading level="2">Cookie Policy</Heading>
        <Paragraph textAlign="center">
          You might have noticed there was no <b>cookie banner</b> you had to
          click away ({gdprLink}). This is because I don't track any information
          about you and don't give anything to third-party vendors.
        </Paragraph>
      </Section>
      <AppFooter />
    </Box>
  );
}
