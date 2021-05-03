import React from "react";
import { Box, Anchor, Nav } from "grommet";
import { registry } from "./tils";

function HeaderAnchor(props: { href: string; label: string }): JSX.Element {
  return (
    <Anchor
      href={props.href}
      label={props.label}
      margin="xsmall"
      color="light-1"
    />
  );
}

type AppHeaderProps = {
  children?: React.ReactNode;
};

export default function AppHeader(props: AppHeaderProps): JSX.Element {
  const anchors = registry.map((d) => (
    <HeaderAnchor href={d.path} label={d.title} key={d.path} />
  ));

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "medium", vertical: "xsmall" }}
      elevation="medium"
      margin="none"
    >
      <Nav direction="row" background="brand" pad="xsmall">
        <HeaderAnchor href="/" label="Home" />
        <HeaderAnchor href="/tils" label="TILs" />
        {anchors}
      </Nav>
      {props.children}
    </Box>
  );
}
