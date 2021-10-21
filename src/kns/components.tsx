import React from "react";
import { Paragraph, Anchor, Heading, Box, Image, Text } from "grommet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function Link(props: { href: string; label: string }): JSX.Element {
  return <Anchor href={props.href} label={props.label} target="_blank" />;
}

export function Ol(props: { children: React.ReactNode }): JSX.Element {
  return (
    <Box width="600px">
      <ol>{props.children}</ol>
    </Box>
  );
}

export function Dli(props: {
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <li>
      <b>{props.label}</b> {props.children}
    </li>
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
      <Text weight="bold" color="dark-1" style={{ marginBottom: -15 }}>
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

export function H4(props: { children: React.ReactNode }): JSX.Element {
  return <Heading level="4">{props.children}</Heading>;
}

export function P(props: { children: React.ReactNode }): JSX.Element {
  return <Paragraph>{props.children}</Paragraph>;
}

export function Img(props: {
  src: string;
  height: string;
  width?: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <Box height={props.height} width={props.width}>
      <Image style={{ borderRadius: "1vw" }} fit="cover" src={props.src} />
      <Text size="small" color="dark-3" alignSelf="center">
        {props.children}
      </Text>
    </Box>
  );
}
