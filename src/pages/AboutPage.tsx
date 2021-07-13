import React from "react";
import { Heading, Paragraph } from "grommet";
import { AppHeader, Section } from "../components";

export default function HomePage(): JSX.Element {
  const dottedBackground = {
    backgroundImage: "url('dot.png')",
    backgroundSize: 16,
  } as React.CSSProperties;

  return (
    <>
      <AppHeader />
      <Section>
        <Heading level="1">About</Heading>
        <Paragraph textAlign="center">Some introduction</Paragraph>
      </Section>
      <Section style={dottedBackground}>
        <Heading level="2">Domains</Heading>
        <Paragraph textAlign="center">domain cards</Paragraph>
      </Section>
      <Section>
        <Heading level="2">Projects</Heading>
        <Paragraph textAlign="center">a project carousel</Paragraph>
      </Section>
    </>
  );
}
