import React from "react";
import { Box, Heading, Paragraph, Text } from "grommet";
import { AppHeader, Section } from "../components";

export default function HomePage(): JSX.Element {
  const darkBackgroundPage = {
    backgroundColor: "#042124",
    height: "100vh",
  } as React.CSSProperties;

  return (
    <>
      <Box style={darkBackgroundPage}>
        <AppHeader />
        <Section style={{ marginTop: "20vh" }}>
          <Heading level="1">vordeck</Heading>
          <Text textAlign="center" size="large" color="light-5">
            Heaving software for Biotech and Pharma
          </Text>
        </Section>
      </Box>
      <Section>
        <Heading level="2">Summary</Heading>
        <Paragraph textAlign="center">Some sentences</Paragraph>
        <Paragraph textAlign="center">Contact | About</Paragraph>
      </Section>
    </>
  );
}
