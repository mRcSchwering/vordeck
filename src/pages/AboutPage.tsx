import React from "react";
import { Heading, Paragraph, Box } from "grommet";
import { AppHeader, Section, AppFooter } from "../components";

export default function HomePage(): JSX.Element {
  const molbioBackground = {
    backgroundColor: "#9ad4b1",
  } as React.CSSProperties;

  const datascienceBackground = {
    backgroundColor: "#5fb9d1",
  } as React.CSSProperties;

  const engineeringBackground = {
    backgroundColor: "#d6af7f",
  } as React.CSSProperties;

  const dottedBackground = {
    backgroundImage: "url('dot.png')",
    backgroundSize: 16,
  } as React.CSSProperties;

  return (
    <>
      <AppHeader />
      <Section>
        <Heading level="1">About</Heading>
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
      <Box style={molbioBackground}>
        <Section>
          <Heading level="2">Molecular Biotechnology</Heading>
          <Paragraph textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
            faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu turpis
            eu sem interdum finibus sit amet non ante. Aenean dictum egestas
            molestie. Vivamus molestie, lectus vitae condimentum consequat,
            massa dolor malesuada eros, convallis euismod est velit at ex. Morbi
            eu maximus mauris. Nulla nec ipsum quis erat auctor viverra. Donec
            eget convallis felis. Phasellus cursus orci eget quam tempor
            iaculis. Fusce posuere arcu sed dolor accumsan porttitor. Aenean eu
            mauris non turpis condimentum malesuada. Fusce venenatis convallis
            neque nec eleifend.
          </Paragraph>
        </Section>
      </Box>
      <Box style={datascienceBackground}>
        <Section>
          <Heading level="2">Data Science</Heading>
          <Paragraph textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
            faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu turpis
            eu sem interdum finibus sit amet non ante. Aenean dictum egestas
            molestie. Vivamus molestie, lectus vitae condimentum consequat,
            massa dolor malesuada eros, convallis euismod est velit at ex. Morbi
            eu maximus mauris. Nulla nec ipsum quis erat auctor viverra. Donec
            eget convallis felis. Phasellus cursus orci eget quam tempor
            iaculis. Fusce posuere arcu sed dolor accumsan porttitor. Aenean eu
            mauris non turpis condimentum malesuada. Fusce venenatis convallis
            neque nec eleifend.
          </Paragraph>
        </Section>
      </Box>
      <Box style={engineeringBackground}>
        <Section>
          <Heading level="2">Software Engineering</Heading>
          <Paragraph textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
            faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu turpis
            eu sem interdum finibus sit amet non ante. Aenean dictum egestas
            molestie. Vivamus molestie, lectus vitae condimentum consequat,
            massa dolor malesuada eros, convallis euismod est velit at ex. Morbi
            eu maximus mauris. Nulla nec ipsum quis erat auctor viverra. Donec
            eget convallis felis. Phasellus cursus orci eget quam tempor
            iaculis. Fusce posuere arcu sed dolor accumsan porttitor. Aenean eu
            mauris non turpis condimentum malesuada. Fusce venenatis convallis
            neque nec eleifend.
          </Paragraph>
        </Section>
      </Box>
      <Section style={dottedBackground}>
        <Heading level="2">Projects</Heading>
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
    </>
  );
}
