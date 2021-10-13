import React from "react";
import { Heading, Paragraph, Box, Image, Text, List, Anchor } from "grommet";
import Slider from "react-slick";
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
import BiotechSvg from "../assets/biotech.svg";
import DataSvg from "../assets/data.svg";
import SoftwareSvg from "../assets/software.svg";

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

const projects = [
  <CarouselEntry title="Pharmacometrics IT Landscape">
    <Paragraph>
      As part of a DevOps team I was building a GxP-validated Pharmacometrics IT
      landscape. The old one had to be replaced. Instead of just re-creating all
      its parts we wanted to design it to be more efficient and flexible. Thus,
      apart from developing the landscape itself, a lot of time was put into
      understanding users, business processes, and regulatory requirements.
    </Paragraph>
  </CarouselEntry>,
  <CarouselEntry title="prevailing-winds.de">
    <Paragraph>
      <Anchor href="https://prevailing-winds.de" label="prevailing-winds.de" />{" "}
      is a side-project I did on the weekend. It's an interactive pilot chart
      for surfers, pilots, sailors, paragliders, and anyone else interested in
      wind strength and directions. There are many great apps, like{" "}
      <Anchor href="https://windy.com" label="windy.com" />, that show you the
      current winds with short-term predictions. However, I didn't find anything
      with historic wind data passage planning. Over time I added more weather
      and sea state data. Now it is basically a holiday planner.
    </Paragraph>
  </CarouselEntry>,
  <CarouselEntry title="Antibody BERT">
    <Paragraph>
      In a machine learning research group I created a transformer wich predicts
      antibody characteristics. I re-designed a{" "}
      <Anchor label="BERT" href="https://arxiv.org/abs/1810.04805" /> - a
      transformer commonly used in NLP - to understand amino acid chains of
      antibodies. Then, I pre-trained this transformer on hundreds of millions
      of antibodies and fine-tuned it to specific problems in the drug discovery
      and development pipeline.
    </Paragraph>
  </CarouselEntry>,
  <CarouselEntry title="Digital Beehive">
    <Paragraph>
      <Anchor href="https://github.com/mRcSchwering/beehive" label="beehive" />{" "}
      was a little side-project I did to help beekeepers. I developed and
      trained a model which can detect the content of a honeycomb photo. E.g. it
      can count the number of cells with larvae, pollen, nectar and so on. You
      can use this to get an accurate estimate of your beehive's health.
    </Paragraph>
  </CarouselEntry>,
  <CarouselEntry title="Visual Analytics Platforms">
    <Paragraph>
      As part of a DevOps team I developed, deployed, and maintained 2 visual
      analytics platforms: one for genes, one for diseases. These platforms
      combined multiple data sources of each entity and represented them in
      interactive plots. One interesting aspect of this project was to find
      clear, useful, and scientificly accurate ways of representing the data.
      Another interesting aspect was the harmonization of data and curation of
      ontologies.
    </Paragraph>
  </CarouselEntry>,
  <CarouselEntry title="Biotop Community Lab e.V.">
    <Paragraph>
      I co-founded and supported{" "}
      <Anchor
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
    </Paragraph>
  </CarouselEntry>,
  <CarouselEntry title="CRISPR AnalyzeR">
    <Paragraph>
      <Anchor
        href="https://www.biorxiv.org/content/10.1101/109967v1"
        label="CRISPR AnalyzeR"
      />{" "}
      is a webapp I wrote during my Masters when working with pooled CRISPR/Cas9
      screens. Analyzing the data from these screens is tedious and largely
      repetitive. This tool does all the pre-processing, data quality checks,
      and differential distribution calculations. Years later I noticed this
      tool was used by several Pharma companies.
    </Paragraph>
  </CarouselEntry>,
];

interface CarouselEntryProps {
  title: string;
  children?: React.ReactNode;
}

function CarouselEntry(props: CarouselEntryProps): JSX.Element {
  return (
    <Box pad="medium" align="center">
      <Heading margin="small" level="4">
        {props.title}
      </Heading>
      <Paragraph>{props.children}</Paragraph>
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
      <Box direction="row" justify="center" pad="xlarge" gap="xsmall" wrap>
        {props.children}
      </Box>
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
          size="large"
          weight="bold"
          style={{ maxWidth: "800px" }}
          margin="large"
        >
          Software development is full of decisions, a lot of which are left to
          the developer team. Domain knowledge is key to creating useful
          software. This is especially true in research and development.
        </Text>
        <Box direction="row" justify="center" pad="medium" gap="small" wrap>
          <Image
            src="avatar.jpg"
            alt="avatar"
            width="200px"
            height="200px"
            style={{ borderRadius: "50%", margin: "30px" }}
          />
          <Box margin="auto">
            <Paragraph size="large">
              Hi, my name is Marc Schwering. My original background is Molecular
              Biotechnology. Throughout my career I have changed from wetlab, to
              data science, to software development. The past years I have built
              software for Bayer's Pharma R&D. Now I am working as a freelancer.
            </Paragraph>
            <Box direction="row" gap="small">
              {mailButton}
              {linkedinButton}
              {twitterButton}
              {soButton}
              {githubButton}
            </Box>
          </Box>
        </Box>
      </Section>
      <PhaseSection background="#edfadd">
        <Box margin="small">
          <Heading level="3" margin={{ vertical: "small" }}>
            Biotechnology
          </Heading>
          <Paragraph size="large">
            I studied Molecular Biotechnology in Heidelberg and worked at the
            German Cancer Research Center for a while. My big fascinations were
            synthetic biology and biophysics. I believe that biotechnology can
            be key to solving many of humanities problems. Although, I have
            officially left the wetlab for now, I never lost interest. I am
            continuously trying to stay up to date with latest methods and the
            current state of Biohacking.
          </Paragraph>
        </Box>
        <Image src={BiotechSvg} alt="biotech icon" width="200px" />
      </PhaseSection>
      <PhaseSection background="#d3e8eb">
        <Image src={DataSvg} alt="data science icon" width="230px" />
        <Box margin="small">
          <Heading level="3" margin={{ vertical: "small" }}>
            Data Science
          </Heading>
          <Paragraph size="large">
            Towards to end of my studies I drifted from pure wetlab work to
            bioinformatics. At first I worked with traditional sequencing and
            imaging methods, later with machine learning. My theses were in
            spatial modeling and simulations, and single cell RNA sequencing.
            During my time at Bayer I had the chance to stay up to date by
            having several machine learning research projects on the side.
          </Paragraph>
        </Box>
      </PhaseSection>
      <PhaseSection background="#fff1e8">
        <Box margin="small">
          <Heading level="3" margin={{ vertical: "small" }}>
            Software Engineering
          </Heading>
          <Paragraph size="large">
            When I naively joined Bayer as a former bioinformatician I realized
            how complex software development can be. I was fortunate enough to
            be part of an amazing DevOps team of senior developers. We were
            mostly autonomous and owned our products: from business analysis,
            over development and deployment, to maintainance. I helped the
            organization move services into the cloud, and learned how to deal
            with legacy systems as well as build serverless applications on AWS.
          </Paragraph>
        </Box>
        <Image
          src={SoftwareSvg}
          alt="software engineering icon"
          width="200px"
        />
      </PhaseSection>
      <Section style={dottedBackground}>
        <Heading level="3">Previous Projects</Heading>
        <Box width="large" overflow="hidden">
          <Slider dots={true} arrows={true}>
            {projects}
          </Slider>
        </Box>
      </Section>
      <Section>
        <Heading level="3">Preferred Techstack</Heading>
        <List primaryKey="name" secondaryKey="text" data={preferredTechStack} />
      </Section>
      <AppFooter />
    </>
  );
}
