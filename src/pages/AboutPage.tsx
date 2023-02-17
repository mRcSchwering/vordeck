import React from "react";
import Slider from "react-slick";
import {
  Link as Anchor,
  Flex,
  Text,
  Image,
  useMediaQuery,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Table,
  Heading,
} from "@chakra-ui/react";
import {
  AppHeader,
  AppFooter,
  linkedinButton,
  twitterButton,
  soButton,
  githubButton,
  mailButton,
  P,
} from "../components";
import biotechSvg from "../assets/biotech.svg";
import dataSvg from "../assets/data.svg";
import softwareSvg from "../assets/software.svg";

const preferredTechStack = [
  {
    name: "Python3",
    text: "CLIs, backends, and general purpose",
  },
  { name: "React and Typescript", text: "frontends of all kind" },
  { name: "docker", text: "tests, builds, deployments" },
  { name: "gitlab", text: "VCS and CI/CD pipelines" },
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
  <CarouselEntry title="MagicSoup: A Cellular Evolution Game" key={9}>
    I created{" "}
    <Link href="https://magic-soup.readthedocs.io/" label="MagicSoup" />, a game
    that simulates cell metabolic and transduction pathway evolution. Given a
    defined chemistry, cells are allowed to evolve proteins with different
    domains and different kinetic properties. They thereby create complex signal
    processing networks. As it is the case in nature, these networks consist of
    structures such as hubs, feed-back loops, and oscillators from which complex
    behaviour emerges. I implemented the simulation as a{" "}
    <Link label="python package" href="https://pypi.org/project/magicsoup/" />
    with most calculations being done in CUDA kernels.
  </CarouselEntry>,
  <CarouselEntry title="CO2AI: AI for Sustainability" key={9}>
    As part of a team at BCG GAMMA I developed CO2AI, an app to reduce carbon
    emissions.{" "}
    <Link
      href="https://www.bcg.com/beyond-consulting/bcg-gamma/co2-ai-for-sustainability"
      label="CO2AI"
    />{" "}
    is a carbon accounting and simulation platform for companies. It integrates
    large, curated libraries of emission factors to create accurate and detailed
    predictions based on simulations and business forecasts. As of now, it is
    the most widely used and feature-rich carbon accounting app on the market.
    As a full-stack developer I created several new features, and helped in
    refactoring, increasing performance, and security.
  </CarouselEntry>,
  <CarouselEntry title="Android App: Ankerwache" key={8}>
    I built an anchor watch app (
    <Link
      href="https://github.com/mRcSchwering/ankerwache"
      label="Ankerwache"
    />
    ) for Android using React Native and Expo. This is a tool to help you sleep
    better while on a boat at anchor. Set your anchor position, define a radius,
    and start the anchor watch. If your phone is persistently outside the
    defined radius it will start to ring loudly.
  </CarouselEntry>,
  <CarouselEntry title="Pharmacometrics IT Landscape" key={7}>
    As part of a DevOps team I was building a GxP-validated Pharmacometrics IT
    landscape. The old one had to be replaced. Instead of just re-creating all
    its parts we wanted to design it to be more efficient and flexible. Thus,
    apart from developing the landscape itself, a lot of time was put into
    understanding users, business processes, and regulatory requirements.
  </CarouselEntry>,
  <CarouselEntry title="prevailing-winds.de" key={6}>
    <Link href="https://prevailing-winds.de" label="prevailing-winds.de" /> is a
    side-project I did on the weekend. It's an interactive pilot chart for
    surfers, pilots, sailors, paragliders, and anyone else interested in wind
    strength and directions. There are many great apps, like{" "}
    <Link href="https://windy.com" label="windy.com" />, that show you the
    current winds with short-term predictions. However, I didn't find anything
    with historic wind data passage planning. Over time I added more weather and
    sea state data. Now it is basically a holiday planner.
  </CarouselEntry>,
  <CarouselEntry title="Antibody BERT" key={5}>
    In a machine learning research group I created a transformer wich predicts
    antibody characteristics. I re-designed a{" "}
    <Link label="BERT" href="https://arxiv.org/abs/1810.04805" /> - a
    transformer commonly used in NLP - to understand amino acid chains of
    antibodies. Then, I pre-trained this transformer on hundreds of millions of
    antibodies and fine-tuned it to specific problems in the drug discovery and
    development pipeline.
  </CarouselEntry>,
  <CarouselEntry title="Digital Beehive" key={4}>
    <Link href="https://github.com/mRcSchwering/beehive" label="beehive" /> was
    a little side-project I did to help beekeepers. I developed and trained a
    model which can detect the content of a honeycomb photo. E.g. it can count
    the number of cells with larvae, pollen, nectar and so on. You can use this
    to get an accurate estimate of your beehive's health.
  </CarouselEntry>,
  <CarouselEntry title="Visual Analytics Platforms" key={3}>
    As part of a DevOps team I developed, deployed, and maintained 2 visual
    analytics platforms: one for genes, one for diseases. These platforms
    combined multiple data sources of each entity and represented them in
    interactive plots. One interesting aspect of this project was to find clear,
    useful, and scientificly accurate ways of representing the data. Another
    interesting aspect was the harmonization of data and curation of ontologies.
  </CarouselEntry>,
  <CarouselEntry title="Biotop Community Lab e.V." key={2}>
    I co-founded and supported{" "}
    <Link
      href="https://www.biotop-heidelberg.de/"
      label="Biotop Community Lab e.V."
    />{" "}
    as vice chairman. This is a no-profit organization for promoting the
    democratization of science through access to biotechnology and
    learn-by-doing education. We are a part of the global DIY-bio movement,
    which focuses on bringing biology outside of academic and industrial
    environment to the lay public. We believe that biology is technology and we
    want to put citizens in the conditions to make use of it, as any other
    common technology.
  </CarouselEntry>,
  <CarouselEntry title="CRISPR AnalyzeR" key={1}>
    <Link
      href="https://www.biorxiv.org/content/10.1101/109967v1"
      label="CRISPR AnalyzeR"
    />{" "}
    is a webapp I wrote during my Masters when working with pooled CRISPR/Cas9
    screens. Analyzing the data from these screens is tedious and largely
    repetitive. This tool does all the pre-processing, data quality checks, and
    differential distribution calculations. Years later I noticed this tool was
    used by several Pharma companies.
  </CarouselEntry>,
];

function Link(props: { href: string; label: string }): JSX.Element {
  return (
    <Anchor href={props.href} isExternal>
      {props.label}
    </Anchor>
  );
}

function CarouselEntry(props: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <Flex direction="column" align="center" mb={["2rem", "1rem"]}>
      <Heading variant="h4">{props.title}</Heading>
      <P>{props.children}</P>
    </Flex>
  );
}

function TechTable(props: {
  data: { name: string; text: string }[];
}): JSX.Element {
  const rows = props.data.map((d) => {
    return (
      <Tr key={d.name}>
        <Td fontWeight="bold">{d.name}</Td>
        <Td>{d.text}</Td>
      </Tr>
    );
  });
  return (
    <TableContainer>
      <Table variant="simple" fontSize="lg">
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  );
}

function PhaseSection(props: {
  children?: React.ReactNode;
  background?: string;
}): JSX.Element {
  return (
    <Flex
      direction="row"
      justify="center"
      px={["0.5rem", "1rem"]}
      py="4rem"
      gap="0.25rem"
      wrap="wrap"
      background={props.background}
    >
      {props.children}
    </Flex>
  );
}

export default function HomePage(): JSX.Element {
  const [isLarge] = useMediaQuery("(min-width: 768px)");

  const dottedBackground = {
    backgroundImage: "url('dot.png')",
    backgroundSize: 16,
  } as React.CSSProperties;

  return (
    <Flex minHeight="100vh" direction="column">
      <Flex minHeight="90vh" direction="column">
        <AppHeader />
        <Flex direction="column" align="center">
          <Text
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            maxWidth="3xl"
            mx="0.5rem"
            mt="15vh"
          >
            Software development is full of decisions, a lot of which are left
            to the developer team. Domain knowledge is key to creating useful
            software. This is especially true in research and development.
          </Text>
          <Flex
            direction="row"
            justify="center"
            align="center"
            mx="0.5rem"
            mt="5vh"
            mb="5rem"
            wrap="wrap"
            maxWidth="4xl"
            width="100%"
          >
            <Image
              src="avatar.jpg"
              alt="avatar"
              width="200px"
              height="200px"
              rounded="50%"
              m="2rem"
            />
            <Flex direction="column" justify="center">
              <P
                style={{
                  marginBottom: "0",
                  marginTop: "0",
                  marginLeft: "0.2rem",
                  marginRight: "0.2rem",
                }}
                maxWidth={["100%", "lg"]}
              >
                Hi, my name is Marc Schwering. My original background is
                Molecular Biotechnology. Throughout my career I have changed
                from wetlab, to data science, to software development. The past
                years I have built software for Bayer's Pharma R&D. Now I am
                working as a freelancer.
              </P>
              <Flex direction="row" gap="small">
                {mailButton}
                {linkedinButton}
                {twitterButton}
                {soButton}
                {githubButton}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <PhaseSection background="#edfadd">
        <Flex m="1rem" direction="column">
          <Heading variant="h2">Biotechnology</Heading>
          <P fontSize="xl" style={{ marginTop: "0" }}>
            I studied Molecular Biotechnology in Heidelberg and worked at the
            German Cancer Research Center for a while. My big fascinations were
            synthetic biology and biophysics. I believe that biotechnology can
            be key to solving many of humanities problems. Although, I have
            officially left the wetlab for now, I never lost interest. I am
            continuously trying to stay up to date with latest methods and the
            current state of Biohacking.
          </P>
        </Flex>
        <Image width="200px" src={biotechSvg} />
      </PhaseSection>
      <PhaseSection background="#d3e8eb">
        <Image width="230px" src={dataSvg} />
        <Flex m="1rem" direction="column">
          <Heading variant="h2">Data Science</Heading>
          <P fontSize="xl" style={{ marginTop: "0" }}>
            Towards to end of my studies I drifted from pure wetlab work to
            bioinformatics. At first I worked with traditional sequencing and
            imaging methods, later with machine learning. My theses were in
            spatial modeling and simulations, and single cell RNA sequencing.
            During my time at Bayer I had the chance to stay up to date by
            having several machine learning research projects on the side.
          </P>
        </Flex>
      </PhaseSection>
      <PhaseSection background="#fff1e8">
        <Flex m="1rem" direction="column">
          <Heading variant="h2">Software Engineering</Heading>
          <P fontSize="xl" style={{ marginTop: "0" }}>
            When I naively joined Bayer as a former bioinformatician I realized
            how complex software development can be. I was fortunate enough to
            be part of an amazing DevOps team of senior developers. We were
            mostly autonomous and owned our products: from business analysis,
            over development and deployment, to maintainance. I helped the
            organization move services into the cloud, and learned how to deal
            with legacy systems as well as build serverless applications on AWS.
          </P>
        </Flex>
        <Image width="200px" src={softwareSvg} />
      </PhaseSection>

      <Flex
        direction="column"
        align="center"
        my="4rem"
        py="1rem"
        mx="1rem"
        style={dottedBackground}
      >
        <Heading variant="h2">Previous Projects</Heading>
        <Flex direction="column" maxWidth="4xl" width="100%">
          <Slider dots={true} arrows={isLarge}>
            {projects}
          </Slider>
        </Flex>
      </Flex>

      <Flex direction="column" align="center" my="4rem" mx="1rem" mb="20vh">
        <Heading variant="h2">Preferred Techstack</Heading>
        <TechTable data={preferredTechStack} />
      </Flex>
      <AppFooter />
    </Flex>
  );
}
