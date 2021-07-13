import React from "react";
import { Box, Anchor } from "grommet";

export function AppHeader(): JSX.Element {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="start"
      background="transparent"
      pad={{ left: "medium", right: "medium", vertical: "xsmall" }}
      elevation="none"
      margin="none"
    >
      <Anchor href="/" label="Home" margin="xsmall" color="dark-2" />
      <Anchor href="/about" label="About" margin="xsmall" color="dark-2" />
      <Anchor
        href="/kns"
        label="Knowledge Nuggets"
        margin="xsmall"
        color="dark-2"
      />
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
      gap="large"
      margin="large"
      align="center"
      style={props.style}
    >
      {props.children}
    </Box>
  );
}
