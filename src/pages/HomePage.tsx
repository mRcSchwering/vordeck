import React from "react";
import {
  Box,
  Heading,
  Paragraph,
  Text,
  Image,
  ResponsiveContext,
} from "grommet";
import {
  AppHeader,
  AppFooter,
  mailToHref,
  HrefButton,
  Section,
} from "../components";
import ReactCardFlip from "react-card-flip";
import logoSvg from "../assets/logo.svg";
import cloudSvg from "../assets/cloud-icon.svg";
import cogwheelSvg from "../assets/cogwheel-icon.svg";
import dnaSvg from "../assets/dna-icon.svg";
import tachometerSvg from "../assets/tachometer-icon.svg";

interface CardProps {
  background?: string;
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: MouseEvent) => void;
}

function Card(props: CardProps): JSX.Element {
  return (
    <Box
      width="250px"
      height="250px"
      elevation="small"
      round="250px"
      margin="small"
      align="center"
      justify="center"
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      background={props.background}
    >
      {props.children}
    </Box>
  );
}

interface ValuePropBoxProps {
  title: string;
  svg: string;
  text: string;
  size: string;
}

function ValuePropBox(props: ValuePropBoxProps): JSX.Element {
  const [isFlipped, setIsFlipped] = React.useState(false);

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    setIsFlipped((prev) => !prev);
  }

  function handleHover(d: boolean) {
    props.size === "small" || setIsFlipped(d);
  }

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <Card
        onClick={handleClick}
        onMouseEnter={() => handleHover(true)}
        background="brand"
      >
        <Box
          pad={{ horizontal: "medium", top: "60px" }}
          gap="small"
          justify="start"
          fill
        >
          <Box height="70px">
            <Image src={props.svg} alt={props.title} fit="contain" />
          </Box>
          <Text weight="bold" size="medium" textAlign="center">
            {props.title}
          </Text>
        </Box>
      </Card>
      <Card onClick={handleClick} onMouseLeave={() => handleHover(false)}>
        <Text
          textAlign="center"
          margin="small"
          size="small"
          style={{ width: "180px" }}
        >
          {props.text}
        </Text>
      </Card>
    </ReactCardFlip>
  );
}

export default function HomePage(): JSX.Element {
  const size = React.useContext(ResponsiveContext);

  const valueProps = [
    {
      svg: dnaSvg,
      title: "Domain Knowledge",
      text: "No PowerPoint karaoke about genes and proteins, or the drug discovery and development process. Get to the point on day one.",
    },
    {
      svg: tachometerSvg,
      title: "MVP-driven",
      text: "Deploy a minimum viable product as soon as possible. See production pitfalls immediately. Get users involved early on.",
    },
    {
      svg: cloudSvg,
      title: "Modern Architecture",
      text: "Serverless over self-hosted wherever possible. Minimize maintenance effort. Reduce costs. Have a product that scales seamlessly.",
    },
    {
      svg: cogwheelSvg,
      title: "API-first",
      text: "The system will change over time. Focus on well-defined APIs. Build products on top. Integrate legacy systems. Enable data scientists.",
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
              alt="logo"
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
        <Paragraph size="large">
          I am Marc. My background is Molecular Biotechnology but for the past
          years I have worked as a Software Developer in Pharma R&D. Another
          career jumper? Yes, but with experience. Do you need help realizing
          some ideas? Let's have a chat.
        </Paragraph>
        <Box
          direction="row"
          wrap
          justify="center"
          margin={{ vertical: "large" }}
        >
          {valueProps.map((d) => (
            <ValuePropBox key={d.title} size={size} {...d} />
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
