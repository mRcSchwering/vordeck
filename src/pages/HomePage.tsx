import React from "react";
import {
  Heading,
  Container,
  Text,
  useMediaQuery,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AppHeader, AppFooter, mailToHref, Redirect, P } from "../components";
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
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Card(props: CardProps): JSX.Element {
  return (
    <Flex
      width="260px"
      height="260px"
      boxShadow="2xl"
      borderRadius="260px"
      margin="0.5em"
      align="center"
      justify="start"
      direction="column"
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      background={props.background}
    >
      {props.children}
    </Flex>
  );
}

interface ValuePropBoxProps {
  title: string;
  svg: string;
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
        background="primary"
      >
        <Image height="70px" mt="70px" src={props.svg} fit="contain" />
        <Text
          mt="10px"
          fontWeight="bold"
          fontSize="xl"
          textAlign="center"
          color="gray.200"
          width="150px"
        >
          {props.title}
        </Text>
      </Card>
      <Card onClick={handleClick} onMouseLeave={() => handleHover(false)}>
        <Text textAlign="center" my="auto" mx="1em" fontSize="lg" width="220px">
          {props.text}
        </Text>
      </Card>
    </ReactCardFlip>
  );
}

export default function HomePage(): JSX.Element {
  const [isLarge] = useMediaQuery("(min-width: 768px)");

  const valueProps = [
    {
      svg: dnaSvg,
      title: "Domain Knowledge",
      text: "No PowerPoint karaoke about genes, proteins, drug discovery and development. Get to the point on day one.",
    },
    {
      svg: tachometerSvg,
      title: "MVP-driven",
      text: "Deploy a minimum viable product as soon as possible. See production pitfalls immediately. Get users involved early on.",
    },
    {
      svg: cloudSvg,
      title: "Modern Architecture",
      text: "Serverless over self-hosted where possible. Minimize maintenance. Reduce costs. Have a product that scales seamlessly.",
    },
    {
      svg: cogwheelSvg,
      title: "API-first",
      text: "The system will change over time. Focus on well-defined APIs. Build products on top. Integrate legacy systems. Enable data scientists.",
    },
  ];

  return (
    <>
      <Flex background="primary" height="100vh" direction="column">
        <AppHeader isDark />
        <Flex direction="column" align="center" mt="25vh">
          <Heading
            as="h1"
            my={["1rem", "2rem"]}
            color="primaryDark1"
            fontSize="6xl"
          >
            vordeck
            <Image width="35px" mx="0.25em" src={logoSvg} display="inline" />
          </Heading>
          <Text textAlign="center" fontSize="3xl" margin="1em" color="gray.200">
            Heaving software for Biotech and Pharma
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" my="10vh" align="center">
        <P fontSize="2xl">
          I am Marc. My background is Molecular Biotechnology but for the past
          years I have worked as a Software Developer in Pharma R&D. Another
          career jumper? Yes, but with experience. Do you need help realizing
          some ideas? Let's have a chat.
        </P>
        <Flex direction="row" gap="1em" wrap="wrap" justify="center" my="7em">
          {valueProps.map((d) => (
            <ValuePropBox key={d.title} isSmall={!isLarge} {...d} />
          ))}
        </Flex>
        <Container textAlign="center" fontSize="2xl">
          <Redirect label="Contact" href={mailToHref} fontSize="2xl" /> |{" "}
          <Redirect label="About" href="/about" fontSize="2xl" />
        </Container>
      </Flex>
      <AppFooter />
    </>
  );
}
