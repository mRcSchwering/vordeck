import React from "react";
import { Box, Button } from "grommet";
import {
  LinkedinOption,
  StackOverflow,
  Twitter,
  Github,
  MailOption,
} from "grommet-icons";

export function AppHeader(): JSX.Element {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="start"
      background="transparent"
      pad={{ horizontal: "medium", vertical: "xsmall" }}
      gap="small"
      elevation="none"
      margin="none"
    >
      <Button href="/" label="Home" plain />
      <Button href="/about" label="About" plain />
      <Button href="/kns" label="Knowledge Nuggets" plain />
    </Box>
  );
}

interface SectionProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Section(props: SectionProps): JSX.Element {
  return (
    <Box
      pad="medium"
      gap="small"
      margin="large"
      align="center"
      style={props.style}
    >
      {props.children}
    </Box>
  );
}

export function AppFooter(): JSX.Element {
  return (
    <Box
      tag="footer"
      direction="row"
      align="center"
      justify="between"
      background="transparent"
      pad="small"
      elevation="none"
      width="large"
      margin="auto"
    >
      <Box direction="row" gap="small">
        <Button label="legal notice" href="/" plain />
        <Button label="cookie policy" href="/" plain />
      </Box>
      <Box direction="row" gap="small">
        <Button
          icon={<MailOption />}
          href="mailto:someone@yoursite.com?subject=Contact%20from%20vordeck.de"
          plain
        />
        <Button icon={<LinkedinOption />} href="/" plain />
        <Button icon={<Twitter />} href="/" plain />
        <Button icon={<Github />} href="/" plain />
        <Button icon={<StackOverflow />} href="/" plain />
      </Box>
    </Box>
  );
}
