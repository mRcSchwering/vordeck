import React from "react";
import {
  Icon,
  Container,
  Flex,
  Link,
  Box,
  Heading,
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

// TODO: add header/footer to page contaienr with align center around content?

export function PageContainer(props: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Flex direction="column" minHeight="100vh">
      {props.children}
    </Flex>
  );
}

export function H2(props: { text: string }): JSX.Element {
  return (
    <Heading as="h2" my={["1rem", "2rem"]} color="gray.700" fontSize="5xl">
      {props.text}
    </Heading>
  );
}

export function H4(props: { text: string }): JSX.Element {
  return (
    <Heading as="h4" my={["0.5rem", "1rem"]} color="gray.700" fontSize="xl">
      {props.text}
    </Heading>
  );
}

export function H6(props: { text: string }): JSX.Element {
  return (
    <Heading as="h6" my={["0.5rem", "1rem"]} color="gray.700" fontSize="md">
      {props.text}
    </Heading>
  );
}

export function P(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <Box my={["1rem", "2rem"]} style={props.style}>
      <Container maxWidth="xl" centerContent>
        <Text as="p" my="1rem">
          {props.children}
        </Text>
      </Container>
    </Box>
  );
}

export function A(props: { href: string; label: string }): JSX.Element {
  return (
    <Link href={props.href} isExternal color="secondary" fontWeight="semibold">
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
    <Box>
      <Text fontSize="lg" color="gray.600" m={["0.25rem", "0.5rem"]}>
        {props.label}
      </Text>
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
      mx={["0.25rem", "0.5rem"]}
      href={props.href}
      isExternal
      pt="4px"
    >
      {<Icon as={props.icon} />}
    </Link>
  );
}

export function Redirect(props: {
  label: string;
  href: string;
  isExt?: boolean;
}): JSX.Element {
  return (
    <Link
      fontSize="xl"
      color="gray.700"
      mx={["0.25rem", "0.5rem"]}
      style={{ textDecoration: "none" }}
      href={props.href}
      isExternal={props.isExt}
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

export function AppHeader(): JSX.Element {
  return (
    <Flex
      as="header"
      direction="row"
      align="center"
      justify="start"
      background="transparent"
      px={["1rem", "2rem"]}
      py={["0.12rem", "0.25rem"]}
      gap={["0.5rem", "1rem"]}
      margin={0}
    >
      <Redirect href="/" label="Home" />
      <Redirect href="/about" label="About" />
      <Redirect href="/kns" label="Knowledge Nuggets" />
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
        <Redirect label="legal notice" href="/ln" />
        <Redirect label="cookie policy" href="/cp" />
        <Redirect
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
