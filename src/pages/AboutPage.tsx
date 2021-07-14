import React from "react";
import { Heading, Paragraph, Box } from "grommet";
import { AppHeader, Section, AppFooter } from "../components";

export default function HomePage(): JSX.Element {
  const molbioBackground = {
    backgroundColor: "#CEE7BB",
  } as React.CSSProperties;

  const datascienceBackground = {
    backgroundColor: "#99AFC0",
  } as React.CSSProperties;

  const engineeringBackground = {
    backgroundColor: "#EABDCA",
  } as React.CSSProperties;

  const dottedBackground = {
    backgroundImage: "url('dot.png')",
    backgroundSize: 16,
    marginBottom: "20vh",
  } as React.CSSProperties;

  return (
    <>
      <AppHeader />
      <Section>
        <Heading level="1">About</Heading>
        <Paragraph size="large">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu turpis eu
          sem interdum finibus sit amet non ante. Interdum et malesuada fames ac
          ante ipsum primis in faucibus. Vivamus vel fringilla ex, in interdum
          ex. Morbi eu turpis eu sem interdum finibus sit amet non ante.
        </Paragraph>
      </Section>
      <Box style={molbioBackground}>
        <Box direction="row" justify="center" pad="xlarge">
          <Box margin="small">
            <Heading level="2">Molecular Biotechnology</Heading>
            <Paragraph size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu
              turpis eu sem interdum finibus sit amet non ante.
            </Paragraph>
          </Box>
          <Box background="gray" width="medium"></Box>
        </Box>
      </Box>
      <Box style={datascienceBackground}>
        <Box direction="row" justify="center" pad="xlarge">
          <Box background="gray" width="medium"></Box>
          <Box margin="small">
            <Heading level="2">Data Science</Heading>
            <Paragraph size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu
              turpis eu sem interdum finibus sit amet non ante.
            </Paragraph>
          </Box>
        </Box>
      </Box>
      <Box style={engineeringBackground}>
        <Box direction="row" justify="center" pad="xlarge">
          <Box margin="small">
            <Heading level="2">Software Engineering</Heading>
            <Paragraph size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu
              turpis eu sem interdum finibus sit amet non ante. neque nec
              eleifend.
            </Paragraph>
          </Box>
          <Box background="gray" width="medium"></Box>
        </Box>
      </Box>
      <Section style={dottedBackground}>
        <Heading level="2">Projects</Heading>
        <Paragraph size="large">
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
