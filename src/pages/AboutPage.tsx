import React from "react";
import {
  Heading,
  Paragraph,
  Box,
  Carousel,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Anchor,
} from "grommet";
import { AppHeader, Section, AppFooter } from "../components";
import BiotechSvg from "../assets/biotech.svg";
import DataSvg from "../assets/data.svg";
import SoftwareSvg from "../assets/software.svg";

const cirsprPaper = (
  <Anchor
    href="https://www.biorxiv.org/content/10.1101/109967v1"
    label="paper"
  />
);

interface CarouselEntryProps {
  title: string;
  children?: React.ReactNode;
}

function CarouselEntry(props: CarouselEntryProps): JSX.Element {
  // TODO: carousel bug: https://github.com/grommet/grommet/issues/3536

  return (
    <Box direction="row" justify="center">
      <Card elevation="large" width="medium" background="light-1">
        <CardBody pad="small">{props.children}</CardBody>
        <CardFooter background="light-2" pad="small">
          {props.title}
        </CardFooter>
      </Card>
    </Box>
  );
}

export default function HomePage(): JSX.Element {
  const molbioBackground = {
    backgroundColor: "#CEE7BB",
  } as React.CSSProperties;

  const datascienceBackground = {
    backgroundColor: "#99AFC0",
  } as React.CSSProperties;

  const engineeringBackground = {
    backgroundColor: "#EABDCA",
  } as React.CSSProperties;

  const dottedBackground = {
    backgroundImage: "url('dot.png')",
    backgroundSize: 16,
    marginBottom: "20vh",
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
          the developer team. Understanding the business domain as a developer
          can be key to creating the right software. This is especially true for
          research and development.
        </Text>
        <Box direction="row" justify="center" pad="medium" gap="small" wrap>
          <Image
            src="avatar.jpg"
            alt="avatar"
            width="200px"
            height="200px"
            style={{ borderRadius: "50%", margin: "30px" }}
          />
          <Paragraph size="large">
            Hi, my name is Marc Schwering. Throughout my life I have changed
            career paths quite a few times. During my studies in Heidelberg I
            was working as a wetlab scientist. Later, I converted to
            bioinformatics and machine learning. When I moved to Berlin and
            started working for Bayer I converted again to software development.
            For 4 years I was surrounded by senior developers creating software
            for researchers in Pharma. I want to continue doing that for Biotch
            and Pharma.
          </Paragraph>
        </Box>
      </Section>
      <Box style={molbioBackground}>
        <Box direction="row" justify="center" pad="xlarge" gap="xsmall" wrap>
          <Box margin="small">
            <Heading level="2" margin={{ vertical: "small" }}>
              Biotechnology
            </Heading>
            <Paragraph size="large">
              I studied Molecular Biotechnology in Heidelberg and worked at the
              German Cancer Research Center for a while. My big fascinations
              were synthetic biology and biophysics. I believe that
              biotechnology can play a key role in solving most of humanities
              problems. Although, I have officially left the wetlab for now, I
              never lost interest. I am continuously trying to stay up to date
              with latest methods and the current state of Biohacking.
            </Paragraph>
          </Box>
          <Image src={BiotechSvg} alt="biotech icon" width="200px" />
        </Box>
      </Box>
      <Box style={datascienceBackground}>
        <Box direction="row" justify="center" pad="xlarge" gap="xsmall" wrap>
          <Image src={DataSvg} alt="data science icon" width="230px" />
          <Box margin="small">
            <Heading level="2" margin={{ vertical: "small" }}>
              Data Science
            </Heading>
            <Paragraph size="large">
              Towards to end of my studies I drifted from pure wetlab work more
              and more over to bioinformatics. At first I worked with
              traditional sequencing and imaging methods, later with machine
              learning. My Bachelor thesis was spatial modeling and simulations,
              and my Master thesis single cell RNA sequencing. During my time at
              Bayer I had the chance to keep up to date by having several
              machine learning research projects on the side.
            </Paragraph>
          </Box>
        </Box>
      </Box>
      <Box style={engineeringBackground}>
        <Box direction="row" justify="center" pad="xlarge" gap="xsmall" wrap>
          <Box margin="small">
            <Heading level="2" margin={{ vertical: "small" }}>
              Software Engineering
            </Heading>
            <Paragraph size="large">
              Already during my studies I created some apps for others. When I
              naively joined Bayer I realized how complex software development
              can be. I was fortunate enough to be part of an amazing DevOps
              team of senior developers. We were mostly autonomous and owned our
              products as a whole: from business analysis and UX design, over
              development and deployment, to maintainance. I helped the
              organization move services into the cloud and learned how to deal
              with legacy systems as well as build serverless applications on
              AWS.
            </Paragraph>
          </Box>
          <Image
            src={SoftwareSvg}
            alt="software engineering icon"
            width="200px"
          />
        </Box>
      </Box>
      <Section style={dottedBackground}>
        <Heading level="2">Previous Projects</Heading>
        <Box height="medium" width="large" overflow="hidden">
          <Carousel fill>
            <CarouselEntry title="CRISPR AnalyzeR">
              <Paragraph>
                While performing pooled CRISPR/Cas screens in the lab I created
                a tool to analyze data from these screens. It performs quality
                controls, data cleaning, and calculates differential
                distributions (here is the {cirsprPaper}). Years later I
                discovered that this tool is beeing used by quite a few Pharma
                companies.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="Visual Analytics Platforms">
              <Paragraph>
                Together with team we created visual analytics platforms for
                entities such as genes and diseases. A researcher should be able
                to quickly see different aspects at once. We focused a lot on
                how to properly represent the data graphically. Every plot
                should give you an overview first, but have the option to drill
                down into a single data point. Organizing and harmonizing the
                data behind all these plots was a major obstacle, technically
                and organizationally.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="Digital Beehive">
              <Paragraph>
                As a side-project I developed a tool for beekeepers. From
                pictures of honeycombs it can detect and distinguish contents
                such as larvae, capped or empty cells, cells with eggs, nectar,
                and pollen. This can be used to accurately characterize
                beehive's health.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="Antibody BERT">
              <Paragraph>
                This was another side-project in a machine learning research
                group. I repurposed a BERT transformer — usually used in natural
                language processing — to understand antibodies. I took the
                original BERT transformer and adapted some parts of the design
                to handle amino acid sequences of antibodies. I performed a
                pre-training on several hundred million antibodies, then
                fine-tuned it for specific downstream tasks.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="Data and Metadata Management Solutions">
              <Paragraph>
                As the company was moving data and processes into the cloud I
                was part of a DevOps team that supports this transition by
                developing data warehousing and data management tools. We took
                care of doing business analyses, designing and testing
                solutions, and implementing them while keeping legacy systems
                alive for the transition.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="prevailing-winds.de">
              <Paragraph>
                This is an idea I had when planning a sailing trip. It's an
                interactive pilot chart for surfers, pilots, sailors,
                paragliders, and anyone else interested in wind strengh and
                direction. There are many great apps, like windy.com, that show
                you the current winds with short-term predictions. However,
                there is nothing similar with historic wind data for long-term
                planning.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="Pharmacometrics IT Landscape">
              <Paragraph>
                A fully GxP-validated IT landscape that supports a
                pharmacometrics group in their activities, from study planning
                to result submission. One central API combines multiple
                features, allowing us to automatically track the flow of
                versions, data, and decisions while the experts are performing
                their analyses.
              </Paragraph>
            </CarouselEntry>
          </Carousel>
        </Box>
      </Section>
      <AppFooter />
    </>
  );
}
