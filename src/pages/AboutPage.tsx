import React from "react";
import Slider from "react-slick";
import {
  Container,
  Link as Anchor,
  Box,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  AppHeader,
  AppFooter,
  Section,
  linkedinButton,
  twitterButton,
  soButton,
  githubButton,
  mailButton,
} from "../components";
import BiotechSvg from "../assets/biotech.jsx";
import DataSvg from "../assets/data.jsx";
import SoftwareSvg from "../assets/software.jsx";

const preferredTechStack = [
  {
    name: "Python3 with type-hints",
    text: "CLIs, backends, and general purpose",
  },
  { name: "React and Typescript", text: "frontends of all kind" },
  { name: "docker", text: "tests, builds, deployments" },
  { name: "gitlab", text: "especially for its CI/CD pipelines" },
  {
    name: "AWS",
    text: "huge infrastructure toolbox",
  },
  {
    name: "serverless",
    text: "over self-hosted where possible",
  },
];

function TechTable(props: {
  data: { name: string; text: string }[];
}): JSX.Element {
  const rows = props.data.map((d) => {
    return (
      <Flex direction="row" justify="space-between">
        <Text fontWeight="bold">{d.name}</Text>
        <Text>{d.text}</Text>
      </Flex>
    );
  });
  return <Flex direction="column">{rows}</Flex>;
}

const projects = [
  <CarouselEntry title="CO2AI: AI for Sustainability">
    <Container>
      As part of a team at BCG GAMMA I developed CO2AI, an app to reduce carbon
      emissions.{" "}
      <Link
        href="https://www.bcg.com/beyond-consulting/bcg-gamma/co2-ai-for-sustainability"
        label="CO2AI"
      />{" "}
      is a carbon accounting and simulation platform for companies. It
      integrates large, curated libraries of emission factors to create accurate
      and detailed predictions based on simulations and business forecasts. As
      of now, it is the most widely used and feature-rich carbon accounting app
      on the market. As a full-stack developer I created several new features,
      and helped in refactoring, increasing performance, and security.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="Android App: Ankerwache">
    <Container>
      I built an anchor watch app (
      <Link
        href="https://github.com/mRcSchwering/ankerwache"
        label="Ankerwache"
      />
      ) for Android using React Native and Expo. This is a tool to help you
      sleep better while on a boat at anchor. Set your anchor position, define a
      radius, and start the anchor watch. If your phone is persistently outside
      the defined radius it will start to ring loudly.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="Pharmacometrics IT Landscape">
    <Container>
      As part of a DevOps team I was building a GxP-validated Pharmacometrics IT
      landscape. The old one had to be replaced. Instead of just re-creating all
      its parts we wanted to design it to be more efficient and flexible. Thus,
      apart from developing the landscape itself, a lot of time was put into
      understanding users, business processes, and regulatory requirements.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="prevailing-winds.de">
    <Container>
      <Link href="https://prevailing-winds.de" label="prevailing-winds.de" /> is
      a side-project I did on the weekend. It's an interactive pilot chart for
      surfers, pilots, sailors, paragliders, and anyone else interested in wind
      strength and directions. There are many great apps, like{" "}
      <Link href="https://windy.com" label="windy.com" />, that show you the
      current winds with short-term predictions. However, I didn't find anything
      with historic wind data passage planning. Over time I added more weather
      and sea state data. Now it is basically a holiday planner.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="Antibody BERT">
    <Container>
      In a machine learning research group I created a transformer wich predicts
      antibody characteristics. I re-designed a{" "}
      <Link label="BERT" href="https://arxiv.org/abs/1810.04805" /> - a
      transformer commonly used in NLP - to understand amino acid chains of
      antibodies. Then, I pre-trained this transformer on hundreds of millions
      of antibodies and fine-tuned it to specific problems in the drug discovery
      and development pipeline.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="Digital Beehive">
    <Container>
      <Link href="https://github.com/mRcSchwering/beehive" label="beehive" />{" "}
      was a little side-project I did to help beekeepers. I developed and
      trained a model which can detect the content of a honeycomb photo. E.g. it
      can count the number of cells with larvae, pollen, nectar and so on. You
      can use this to get an accurate estimate of your beehive's health.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="Visual Analytics Platforms">
    <Container>
      As part of a DevOps team I developed, deployed, and maintained 2 visual
      analytics platforms: one for genes, one for diseases. These platforms
      combined multiple data sources of each entity and represented them in
      interactive plots. One interesting aspect of this project was to find
      clear, useful, and scientificly accurate ways of representing the data.
      Another interesting aspect was the harmonization of data and curation of
      ontologies.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="Biotop Community Lab e.V.">
    <Container>
      I co-founded and supported{" "}
      <Link
        href="https://www.biotop-heidelberg.de/"
        label="Biotop Community Lab e.V."
      />{" "}
      as vice chairman. This is a no-profit organization for promoting the
      democratization of science through access to biotechnology and
      learn-by-doing education. We are a part of the global DIY-bio movement,
      which focuses on bringing biology outside of academic and industrial
      environment to the lay public. We believe that biology is technology and
      we want to put citizens in the conditions to make use of it, as any other
      common technology.
    </Container>
  </CarouselEntry>,
  <CarouselEntry title="CRISPR AnalyzeR">
    <Container>
      <Link
        href="https://www.biorxiv.org/content/10.1101/109967v1"
        label="CRISPR AnalyzeR"
      />{" "}
      is a webapp I wrote during my Masters when working with pooled CRISPR/Cas9
      screens. Analyzing the data from these screens is tedious and largely
      repetitive. This tool does all the pre-processing, data quality checks,
      and differential distribution calculations. Years later I noticed this
      tool was used by several Pharma companies.
    </Container>
  </CarouselEntry>,
];

function Link(props: { href: string; label: string }): JSX.Element {
  return (
    <Anchor href={props.href} isExternal>
      {props.label}
    </Anchor>
  );
}

interface CarouselEntryProps {
  title: string;
  children?: React.ReactNode;
}

function CarouselEntry(props: CarouselEntryProps): JSX.Element {
  return (
    <Box p="medium" alignContent="center">
      <Heading margin="small" as="h4">
        {props.title}
      </Heading>
      <Container>{props.children}</Container>
    </Box>
  );
}

interface PhaseSectionProps {
  children?: React.ReactNode;
  background?: string;
}

function PhaseSection(props: PhaseSectionProps): JSX.Element {
  return (
    <Box background={props.background}>
      <Flex
        direction="row"
        justify="center"
        p="xlarge"
        gap="xsmall"
        flexWrap="wrap"
      >
        {props.children}
      </Flex>
    </Box>
  );
}

export default function HomePage(): JSX.Element {
  const dottedBackground = {
    backgroundImage: "url('dot.png')",
    backgroundSize: 16,
  } as React.CSSProperties;

  return (
    <>
      <AppHeader />
      <Section>
        <Text
          fontSize="large"
          fontWeight="bold"
          style={{ maxWidth: "800px" }}
          margin="large"
        >
          Software development is full of decisions, a lot of which are left to
          the developer team. Domain knowledge is key to creating useful
          software. This is especially true in research and development.
        </Text>
        <Flex
          direction="row"
          justify="center"
          p="medium"
          gap="small"
          flexWrap="wrap"
        >
          <Image
            src="avatar.jpg"
            alt="avatar"
            width="200px"
            height="200px"
            style={{ borderRadius: "50%", margin: "30px" }}
          />
          <Box margin="auto">
            <Container size="large">
              Hi, my name is Marc Schwering. My original background is Molecular
              Biotechnology. Throughout my career I have changed from wetlab, to
              data science, to software development. The past years I have built
              software for Bayer's Pharma R&D. Now I am working as a freelancer.
            </Container>
            <Flex direction="row" gap="small">
              {mailButton}
              {linkedinButton}
              {twitterButton}
              {soButton}
              {githubButton}
            </Flex>
          </Box>
        </Flex>
      </Section>
      <PhaseSection background="#edfadd">
        <Box margin="small">
          <Heading as="h3" margin={{ vertical: "small" }}>
            Biotechnology
          </Heading>
          <Container size="large">
            I studied Molecular Biotechnology in Heidelberg and worked at the
            German Cancer Research Center for a while. My big fascinations were
            synthetic biology and biophysics. I believe that biotechnology can
            be key to solving many of humanities problems. Although, I have
            officially left the wetlab for now, I never lost interest. I am
            continuously trying to stay up to date with latest methods and the
            current state of Biohacking.
          </Container>
        </Box>
        <Box width="200px">
          <BiotechSvg />
        </Box>
      </PhaseSection>
      <PhaseSection background="#d3e8eb">
        <Box width="230px">
          <DataSvg />
        </Box>
        <Box margin="small">
          <Heading as="h3" margin={{ vertical: "small" }}>
            Data Science
          </Heading>
          <Container size="large">
            Towards to end of my studies I drifted from pure wetlab work to
            bioinformatics. At first I worked with traditional sequencing and
            imaging methods, later with machine learning. My theses were in
            spatial modeling and simulations, and single cell RNA sequencing.
            During my time at Bayer I had the chance to stay up to date by
            having several machine learning research projects on the side.
          </Container>
        </Box>
      </PhaseSection>
      <PhaseSection background="#fff1e8">
        <Box margin="small">
          <Heading as="h3" margin={{ vertical: "small" }}>
            Software Engineering
          </Heading>
          <Container size="large">
            When I naively joined Bayer as a former bioinformatician I realized
            how complex software development can be. I was fortunate enough to
            be part of an amazing DevOps team of senior developers. We were
            mostly autonomous and owned our products: from business analysis,
            over development and deployment, to maintainance. I helped the
            organization move services into the cloud, and learned how to deal
            with legacy systems as well as build serverless applications on AWS.
          </Container>
        </Box>
        <Box width="200px">
          <SoftwareSvg />
        </Box>
      </PhaseSection>
      <Section style={dottedBackground}>
        <Heading as="h3">Previous Projects</Heading>
        <Box width="large" overflow="hidden">
          <Slider dots={true} arrows={true}>
            {projects}
          </Slider>
        </Box>
      </Section>
      <Section>
        <Heading as="h3">Preferred Techstack</Heading>
        <TechTable data={preferredTechStack} />
      </Section>
      <AppFooter />
    </>
  );
}
