import React from "react";
import { Box, Heading, Paragraph, Text } from "grommet";
import { AppHeader, Section, AppFooter } from "../components";

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
      <Section style={{ marginBottom: "20vh" }}>
        <Heading level="2">Summary</Heading>
        <Paragraph textAlign="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu turpis eu
          sem interdum finibus sit amet non ante. Aenean dictum egestas
          molestie. Vivamus molestie, lectus vitae condimentum consequat, massa
          dolor malesuada eros, convallis euismod est velit at ex. Morbi eu
          maximus mauris. Nulla nec ipsum quis erat auctor viverra. Donec eget
          convallis felis. Phasellus cursus orci eget quam tempor iaculis. Fusce
          posuere arcu sed dolor accumsan porttitor. Aenean eu mauris non turpis
          condimentum malesuada. Fusce venenatis convallis neque nec eleifend.
        </Paragraph>
        <Paragraph textAlign="center">Contact | About</Paragraph>
      </Section>
      <AppFooter />
    </>
  );
}
