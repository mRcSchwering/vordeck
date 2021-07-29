import React from "react";
import { Box, Heading, Paragraph, Text, Image } from "grommet";
import {
  AppHeader,
  AppFooter,
  mailToHref,
  HrefButton,
  Section,
} from "../components";
import ReactCardFlip from "react-card-flip";
import logoSvg from "../assets/logo.svg";

function ValuePropBox(props: { title: string; text: string }): JSX.Element {
  const [isFlipped, setIsFlipped] = React.useState(false);

  function handleCardFlip(e: MouseEvent) {
    e.preventDefault();
    setIsFlipped((prev) => !prev);
  }

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <Box
        width="300px"
        height="300px"
        elevation="xsmall"
        round="300px"
        margin="small"
        align="center"
        justify="center"
        onClick={handleCardFlip}
        background="brand"
      >
        <Box align="center" gap="small" margin="medium">
          <Image src={logoSvg} alt="data science icon" width="50px" />
          <Text weight="bold" size="large" textAlign="center">
            {props.title}
          </Text>
        </Box>
      </Box>
      <Box
        width="300px"
        height="300px"
        elevation="xsmall"
        round="300px"
        margin="small"
        align="center"
        justify="center"
        onClick={handleCardFlip}
      >
        <Text textAlign="center" margin="small" style={{ width: "200px" }}>
          {props.text}
        </Text>
      </Box>
    </ReactCardFlip>
  );
}

export default function HomePage(): JSX.Element {
  const valueProps = [
    {
      title: "Domain Knowledge",
      text: "No introduction to genes and proteins. No PowerPoint karaoke about the drug discovery and development process. Get to the point on day one.",
    },
    {
      title: "MVP-driven",
      text: "Deploy a minimum viable product as soon as possible. See production pitfalls immediately. Get users involved early on.",
    },
    {
      title: "Modern Architecture",
      text: "Serverless over self-hosted wherever possible. Minimize maintenance effort. Reduce costs. Have a product that scales seamlessly.",
    },
    {
      title: "API-first",
      text: "IT landscapes change, organizations change, even SOPs change. Focus on well-defined APIs. Build products on top. Integrate with legacy. Enable data scientists.",
    },
  ];

  return (
    <>
      <Box background="brand" height="100vh">
        <AppHeader />
        <Section style={{ marginTop: "20vh" }}>
          <Heading level="1" color="dark-5">
            vordeck
            <Image
              src={logoSvg}
              alt="data science icon"
              width="35px"
              margin={{ horizontal: "small" }}
            />
          </Heading>
          <Text textAlign="center" size="large" margin="medium">
            Heaving software for Biotech and Pharma
          </Text>
        </Section>
      </Box>
      <Section style={{ marginBottom: "20vh", marginTop: "20vh" }}>
        <Paragraph size="xlarge">
          I am Marc. My background is Molecular Biotechnology but for the past
          years I have worked as a Software Developer in Pharma R&D. Another
          career jumper? Yes, but with experience. Do you need help realizing
          some ideas? Let's have a chat.
        </Paragraph>
        <Box
          direction="row"
          wrap
          justify="center"
          margin={{ vertical: "medium" }}
        >
          {valueProps.map((d) => (
            <ValuePropBox key={d.title} {...d} />
          ))}
        </Box>
        <Paragraph textAlign="center" size="large">
          <HrefButton label="Contact" href={mailToHref} /> |{" "}
          <HrefButton label="About" href="/about" />
        </Paragraph>
      </Section>
      <AppFooter />
    </>
  );
}
