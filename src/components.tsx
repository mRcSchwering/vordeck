import React from "react";
import {
  Icon,
  Flex,
  Link,
  Box,
  Text,
  Image,
  OrderedList,
  ListItem,
  List,
} from "@chakra-ui/react";
import {
  FaLinkedinIn,
  FaEnvelope,
  FaTwitter,
  FaGithub,
  FaStackOverflow,
} from "react-icons/fa";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const mailToHref =
  "mailto:info@vordeck.de?subject=Contact%20from%20vordeck.de";

export function P(props: {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: string;
  style?: React.CSSProperties;
  maxWidth?: string;
}): JSX.Element {
  return (
    <Box
      mt={["0.5rem", "1rem"]}
      mb={["1rem", "2rem"]}
      maxWidth={props.maxWidth || "xl"}
      width="100%"
      style={props.style}
    >
      <Text as="p" fontSize={props.fontSize} fontWeight={props.fontWeight}>
        {props.children}
      </Text>
    </Box>
  );
}

export function A(props: { href: string; label: string }): JSX.Element {
  return (
    <Link href={props.href} isExternal>
      {props.label}
    </Link>
  );
}

export function Img(props: {
  src: string;
  height?: string;
  width?: string;
  label?: string;
}): JSX.Element {
  return (
    <Flex direction="column" align="center">
      <Image
        style={{ borderRadius: "1vw" }}
        align="center"
        fit="cover"
        src={props.src}
        height={props.height}
        width={props.width}
      />
      <Text fontSize="lg" color="gray.600" m={["0.25rem", "0.5rem"]}>
        {props.label}
      </Text>
    </Flex>
  );
}

export function Code(props: { children: React.ReactNode }): JSX.Element {
  return <code className="inline-code">{props.children}</code>;
}

export function BlockCode(props: {
  code: string;
  lang?: string;
  label?: string;
}): JSX.Element {
  return (
    <Box mb="4rem">
      {props.label && (
        <Text fontSize="lg" color="gray.600" m={["0.25rem", "0.5rem"]}>
          {props.label}
        </Text>
      )}
      <SyntaxHighlighter
        language={props.lang}
        style={docco}
        customStyle={{ maxWidth: 800 }}
      >
        {props.code}
      </SyntaxHighlighter>
    </Box>
  );
}

export function LinkIcon(props: { icon: any; href: string }): JSX.Element {
  return (
    <Link
      fontSize="xl"
      color="gray.600"
      mx="0.5rem"
      href={props.href}
      isExternal
      pt="4px"
    >
      {<Icon as={props.icon} />}
    </Link>
  );
}

export function Nav(props: {
  label: string;
  href: string;
  isExt?: boolean;
  fontSize?: string;
  isDark?: boolean;
}): JSX.Element {
  return (
    <Link
      variant="nav"
      fontSize={props.fontSize}
      color={props.isDark ? "gray.200" : undefined}
      href={props.href}
      isExternal={props.isExt}
      style={{ textDecoration: "none" }}
    >
      {props.label}
    </Link>
  );
}

export function Ul(props: { children: React.ReactNode }): JSX.Element {
  return (
    <List mb={["2em", "4em"]} fontSize="lg" maxWidth="40rem">
      {props.children}
    </List>
  );
}

export function Ol(props: { children: React.ReactNode }): JSX.Element {
  return (
    <OrderedList mb={["2em", "4em"]} fontSize="lg" maxWidth="40rem">
      {props.children}
    </OrderedList>
  );
}

export function Dli(props: {
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ListItem>
      <b>{props.label}</b> {props.children}
    </ListItem>
  );
}

export const mailButton = <LinkIcon icon={FaEnvelope} href={mailToHref} />;
export const linkedinButton = (
  <LinkIcon
    icon={FaLinkedinIn}
    href="https://www.linkedin.com/in/marc-schwering-139914103/"
  />
);
export const twitterButton = (
  <LinkIcon icon={FaTwitter} href="https://twitter.com/schweringMarc" />
);
export const githubButton = (
  <LinkIcon icon={FaGithub} href="https://github.com/mRcSchwering" />
);
export const soButton = (
  <LinkIcon
    icon={FaStackOverflow}
    href="https://stackoverflow.com/users/5562431/mrcschwering"
  />
);

export function AppHeader(props: { isDark?: boolean }): JSX.Element {
  return (
    <Flex
      as="header"
      direction="row"
      align="center"
      justify="start"
      background="transparent"
      p={["0.12rem", "0.25rem"]}
      gap={["0.5rem", "1rem"]}
      margin={0}
    >
      <Nav href="/" label="Home" isDark={props.isDark} />
      <Nav href="/about" label="About" isDark={props.isDark} />
      <Nav href="/kns" label="Knowledge Nuggets" isDark={props.isDark} />
    </Flex>
  );
}

export function AppFooter(): JSX.Element {
  return (
    <Flex
      as="footer"
      direction="row"
      justify="space-between"
      background="transparent"
      maxWidth="100%"
      width="50rem"
      p={["0.12rem", "0.25rem"]}
      alignItems="center"
      mt="auto"
      mx="auto"
      wrap="wrap"
    >
      <Flex direction="row" gap={2}>
        <Nav label="legal notice" href="/ln" />
        <Nav label="cookie policy" href="/cp" />
        <Nav
          label="page source"
          href="https://github.com/mRcSchwering/vordeck"
          isExt
        />
      </Flex>
      <Flex direction="row" gap={2}>
        {mailButton}
        {linkedinButton}
        {twitterButton}
        {githubButton}
        {soButton}
      </Flex>
    </Flex>
  );
}
