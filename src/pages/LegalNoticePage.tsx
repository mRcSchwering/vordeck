import React from "react";
import { Heading, Paragraph, Box } from "grommet";
import { AppHeader, Section, AppFooter } from "../components";

export default function LegalNoticePage(): JSX.Element {
  return (
    <Box style={{ height: "100vh" }}>
      <AppHeader />
      <Section style={{ marginBottom: "50vh" }}>
        <Heading level="2">Legal Notice</Heading>
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
      </Section>
      <AppFooter />
    </Box>
  );
}