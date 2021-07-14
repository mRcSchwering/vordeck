import React from "react";
import { Box, Heading, Paragraph, Text, Button } from "grommet";
import { AppHeader, Section, AppFooter, mailToHref } from "../components";

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
          <Text textAlign="center" size="large" color="light-5" margin="medium">
            Heaving software for Biotech and Pharma
          </Text>
        </Section>
      </Box>
      <Section style={{ marginBottom: "20vh", marginTop: "20vh" }}>
        <Paragraph textAlign="center" size="large">
          I am Marc and I love technology. My background is Molecular
          Biotechnology but for the past years I have worked as a Software
          Developer in Pharma R&D. Another career jumper? Yes, but with
          experience. Do you need help realizing some ideas? Let's have a chat.
        </Paragraph>
        <Paragraph textAlign="center" size="large">
          <Button label="Contact" href={mailToHref} plain /> |{" "}
          <Button label="About" href="/about" plain />
        </Paragraph>
      </Section>
      <AppFooter />
    </>
  );
}
