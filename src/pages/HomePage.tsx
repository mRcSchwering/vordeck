import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import {
  AppHeader,
  AppFooter,
  mailToHref,
  Redirect,
  Section,
} from "../components";
import ReactCardFlip from "react-card-flip";
import LogoSvg from "../assets/logo.jsx";
import CloudSvg from "../assets/cloudIcon.jsx";
import CogwheelSvg from "../assets/cogwheelIcon.jsx";
import DnaSvg from "../assets/dnaIcon.jsx";
import TachometerSvg from "../assets/tachometerIcon.jsx";

interface CardProps {
  background?: string;
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Card(props: CardProps): JSX.Element {
  return (
    <Box
      width="260px"
      height="260px"
      boxShadow="sm"
      borderRadius="260px"
      margin="small"
      alignContent="center"
      justifyContent="center"
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
  svg: () => JSX.Element;
  text: string;
  isSmall: boolean;
}

function ValuePropBox(props: ValuePropBoxProps): JSX.Element {
  const [isFlipped, setIsFlipped] = React.useState(false);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsFlipped((prev) => !prev);
  }

  function handleHover(d: boolean) {
    props.isSmall || setIsFlipped(d);
  }

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <Card
        onClick={handleClick}
        onMouseEnter={() => handleHover(true)}
        background="brand"
      >
        <Flex
          p={{ horizontal: "medium", top: "70px" }}
          gap="small"
          justify="start"
          width="100%"
        >
          <Box height="70px">
            <props.svg />
          </Box>
          <Text fontWeight="bold" size="medium" textAlign="center">
            {props.title}
          </Text>
        </Flex>
      </Card>
      <Card onClick={handleClick} onMouseLeave={() => handleHover(false)}>
        <Text
          textAlign="center"
          margin={{ horizontal: "10px" }}
          size="small"
          style={{ width: "200px" }}
        >
          {props.text}
        </Text>
      </Card>
    </ReactCardFlip>
  );
}

export default function HomePage(): JSX.Element {
  const [isSmall] = useMediaQuery("(min-width: 768px)");

  const valueProps = [
    {
      svg: DnaSvg,
      title: "Domain Knowledge",
      text: "No PowerPoint karaoke about genes, proteins, drug discovery and development. Get to the point on day one.",
    },
    {
      svg: TachometerSvg,
      title: "MVP-driven",
      text: "Deploy a minimum viable product as soon as possible. See production pitfalls immediately. Get users involved early on.",
    },
    {
      svg: CloudSvg,
      title: "Modern Architecture",
      text: "Serverless over self-hosted where possible. Minimize maintenance. Reduce costs. Have a product that scales seamlessly.",
    },
    {
      svg: CogwheelSvg,
      title: "API-first",
      text: "The system will change over time. Focus on well-defined APIs. Build products on top. Integrate legacy systems. Enable data scientists.",
    },
  ];

  return (
    <>
      <Box background="brand" height="100vh">
        <AppHeader />
        <Section style={{ marginTop: "20vh" }}>
          <Heading as="h1" color="dark-5">
            vordeck
            <Box width="35px" margin={{ horizontal: "small" }}>
              <LogoSvg />
            </Box>
          </Heading>
          <Text textAlign="center" size="large" margin="medium">
            Heaving software for Biotech and Pharma
          </Text>
        </Section>
      </Box>
      <Section style={{ marginBottom: "20vh", marginTop: "20vh" }}>
        <Container size="large">
          I am Marc. My background is Molecular Biotechnology but for the past
          years I have worked as a Software Developer in Pharma R&D. Another
          career jumper? Yes, but with experience. Do you need help realizing
          some ideas? Let's have a chat.
        </Container>
        <Flex
          direction="row"
          flexWrap="wrap"
          justify="center"
          margin={{ vertical: "large" }}
        >
          {valueProps.map((d) => (
            <ValuePropBox key={d.title} isSmall={isSmall} {...d} />
          ))}
        </Flex>
        <Container textAlign="center" size="large">
          <Redirect label="Contact" href={mailToHref} /> |{" "}
          <Redirect label="About" href="/about" />
        </Container>
      </Section>
      <AppFooter />
    </>
  );
}
