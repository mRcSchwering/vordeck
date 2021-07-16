import React from "react";
import { Box, Button } from "grommet";
import {
  LinkedinOption,
  StackOverflow,
  Twitter,
  Github,
  MailOption,
} from "grommet-icons";

export const mailToHref =
  "mailto:someone@yoursite.com?subject=Contact%20from%20vordeck.de";

interface HrefButtonProps {
  icon?: JSX.Element;
  label?: string;
  href: string;
}

export function HrefButton(props: HrefButtonProps): JSX.Element {
  return (
    <Button
      icon={props.icon}
      label={props.label}
      href={props.href}
      plain
      target={props.href.startsWith("http") ? "_blank" : "_self"}
    />
  );
}

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
      <HrefButton href="/" label="Home" />
      <HrefButton href="/about" label="About" />
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
      wrap
    >
      <Box direction="row" gap="small">
        <HrefButton label="legal notice" href="/ln" />
        <HrefButton label="cookie policy" href="/cp" />
        <HrefButton
          label="page source"
          href="https://github.com/mRcSchwering/vordeck"
        />
      </Box>
      <Box direction="row" gap="small">
        <HrefButton icon={<MailOption />} href={mailToHref} />
        <HrefButton
          icon={<LinkedinOption />}
          href="https://www.linkedin.com/in/marc-schwering-139914103/"
        />
        <HrefButton
          icon={<Twitter />}
          href="https://twitter.com/schweringMarc"
        />
        <HrefButton icon={<Github />} href="https://github.com/mRcSchwering" />
        <HrefButton
          icon={<StackOverflow />}
          href="https://stackoverflow.com/users/5562431/mrcschwering"
        />
      </Box>
    </Box>
  );
}
