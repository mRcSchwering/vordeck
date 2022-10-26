import React from "react";
import {
  Icon,
  Container,
  Flex,
  Link,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  FaLinkedinIn,
  FaEnvelope,
  FaTwitter,
  FaGithub,
  FaStackOverflow,
} from "react-icons/fa";

export const mailToHref =
  "mailto:info@vordeck.de?subject=Contact%20from%20vordeck.de";

export function H2(props: { text: string }): JSX.Element {
  return (
    <Heading as="h2" my={["1rem", "2rem"]} color="gray.700" fontSize="3rem">
      {props.text}
    </Heading>
  );
}

export function H6(props: { text: string }): JSX.Element {
  return (
    <Heading as="h6" my={["0.5rem", "1rem"]} color="gray.700" fontSize="1rem">
      {props.text}
    </Heading>
  );
}

export function P(props: { children: React.ReactNode }): JSX.Element {
  return (
    <Text as="p" my="1rem" fontSize="1.3rem">
      {props.children}
    </Text>
  );
}

export function A(props: { href: string; label: string }): JSX.Element {
  return (
    <Link href={props.href} isExternal color="secondary" fontWeight="semibold">
      {props.label}
    </Link>
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

interface SectionProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Section(props: SectionProps): JSX.Element {
  return (
    <Box mt={["1rem", "2rem"]} style={props.style}>
      <Container maxWidth="xl" centerContent>
        {props.children}
      </Container>
    </Box>
  );
}

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
