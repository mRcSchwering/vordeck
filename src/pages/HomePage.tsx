import React from "react";
import {
  Heading,
  Text,
  Flex,
  Image,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { AppHeader, AppFooter, mailToHref, Nav, P } from "../components";
import logoSvg from "../assets/android-chrome-367x472.png";
import cloudSvg from "../assets/cloud-icon.svg";
import cogwheelSvg from "../assets/cogwheel-icon.svg";
import dnaSvg from "../assets/dna-icon.svg";
import tachometerSvg from "../assets/tachometer-icon.svg";
import logoDkfz from "../assets/logo_dkfz.svg";
import logoCo2ai from "../assets/logo_co2ai.svg";
import logoBcg from "../assets/logo_bcg.svg";
import logoBayer from "../assets/logo_bayer.svg";
import logoDocmetric from "../assets/logo_docmetric.svg";
import logoMp from "../assets/logo_mp.svg";
import logoUni from "../assets/logo_uni.svg";

const companyLogos = [
  { svg: logoUni, height: 50 },
  { svg: logoMp, height: 50 },
  { svg: logoDkfz, height: 40 },
  { svg: logoBayer, height: 50 },
  { svg: logoCo2ai, height: 50 },
  { svg: logoBcg, height: 40 },
  { svg: logoDocmetric, height: 40 },
];

interface ValuePropCardProps {
  title: string;
  svg: string;
  text: string;
}

function ValuePropCard(props: ValuePropCardProps): JSX.Element {
  return (
    <Card width="260px" height="320px" background="primary.500">
      <CardHeader>
        <Image height="30px" mt="0px" src={props.svg} fit="contain" />
      </CardHeader>
      <CardBody pt={0} color="gray.200" fontSize="lg">
        <Heading
          variant="h4"
          color="gray.200"
          style={{ paddingInlineStart: 0 }}
        >
          {props.title}
        </Heading>
        {props.text}
      </CardBody>
    </Card>
  );
}

export default function HomePage(): JSX.Element {
  const valueProps = [
    {
      svg: dnaSvg,
      title: "Domain Knowledge",
      text: "No PowerPoint karaoke about health care or drug discovery and development. Get to the point on day one.",
    },
    {
      svg: tachometerSvg,
      title: "MVP-driven",
      text: "Deploy a minimum viable product as soon as possible. See production pitfalls immediately. Get users involved early on.",
    },
    {
      svg: cloudSvg,
      title: "Modern Architecture",
      text: "Serverless where practical. Take maintenance and security into consideration. Reduce costs. Have a product that scales seamlessly.",
    },
    {
      svg: cogwheelSvg,
      title: "API-first",
      text: "The system will change over time. Focus on well-defined APIs. Build products on top. Integrate legacy systems. Enable data scientists.",
    },
  ];

  return (
    <>
      <Flex direction="column" minHeight="100vh" background="primary.500">
        <AppHeader isDark />
        <Flex direction="column" align="center" mt="25vh">
          <Heading
            as="h1"
            mt={["2rem", "4rem"]}
            color="primary.700"
            fontSize="6xl"
          >
            vordeck
            <Image width="35px" mx="0.25em" src={logoSvg} display="inline" />
          </Heading>
          <Text textAlign="center" fontSize="3xl" margin="1em" color="gray.200">
            Heaving software for Life Sciences
          </Text>
        </Flex>
      </Flex>
      <Flex
        background="gray.50"
        direction="row"
        align="center"
        justify="space-evenly"
        wrap="wrap"
      >
        {companyLogos.map((d) => (
          <Image
            height={`${d.height}px`}
            mx="1em"
            my="2em"
            src={d.svg}
            display="inline"
          />
        ))}
      </Flex>
      <Flex direction="column" my="10vh" align="center" mx="1rem">
        <P fontSize="2xl">
          I'm Marc, a seasoned Software Developer with a strong background in
          Molecular Biotechnology. With years of experience in Pharma R&D, I
          bring a unique blend of scientific knowledge and technical expertise
          to every project.
          <br />
          <br /> Ready to bring your ideas to life? Let's connect and make it
          happen.
        </P>
        <Flex direction="row" gap="1em" wrap="wrap" justify="center" my="7em">
          {valueProps.map((d) => (
            <ValuePropCard key={d.title} {...d} />
          ))}
        </Flex>
        <Flex my="5vh" textAlign="center" fontSize="2xl">
          <Nav label="Contact" href={mailToHref} fontSize="2xl" /> |{" "}
          <Nav label="About" href="/about" fontSize="2xl" />
        </Flex>
      </Flex>
      <AppFooter />
    </>
  );
}
