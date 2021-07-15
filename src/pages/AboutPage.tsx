import React from "react";
import {
  Heading,
  Paragraph,
  Box,
  Carousel,
  Card,
  CardBody,
  CardFooter,
} from "grommet";
import { AppHeader, Section, AppFooter } from "../components";
import BiotechSvg from "../assets/biotech.svg";
import DataSvg from "../assets/data.svg";
import SoftwareSvg from "../assets/software.svg";

interface CarouselEntryProps {
  title: string;
  children?: React.ReactNode;
}

function CarouselEntry(props: CarouselEntryProps): JSX.Element {
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
        <Heading level="1">About</Heading>
        <Paragraph size="large">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu turpis eu
          sem interdum finibus sit amet non ante. Interdum et malesuada fames ac
          ante ipsum primis in faucibus. Vivamus vel fringilla ex, in interdum
          ex. Morbi eu turpis eu sem interdum finibus sit amet non ante.
        </Paragraph>
      </Section>
      <Box style={molbioBackground}>
        <Box direction="row" justify="center" pad="xlarge" gap="xsmall">
          <Box margin="small">
            <Heading level="2">Molecular Biotechnology</Heading>
            <Paragraph size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu
              turpis eu sem interdum finibus sit amet non ante.
            </Paragraph>
          </Box>
          <img src={BiotechSvg} alt="biotech icon" width="200px" />
        </Box>
      </Box>
      <Box style={datascienceBackground}>
        <Box direction="row" justify="center" pad="xlarge" gap="xsmall">
          <img src={DataSvg} alt="data science icon" width="230px" />
          <Box margin="small">
            <Heading level="2">Data Science</Heading>
            <Paragraph size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu
              turpis eu sem interdum finibus sit amet non ante.
            </Paragraph>
          </Box>
        </Box>
      </Box>
      <Box style={engineeringBackground}>
        <Box direction="row" justify="center" pad="xlarge" gap="xsmall">
          <Box margin="small">
            <Heading level="2">Software Engineering</Heading>
            <Paragraph size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Vivamus vel fringilla ex, in interdum ex. Morbi eu
              turpis eu sem interdum finibus sit amet non ante. neque nec
              eleifend.
            </Paragraph>
          </Box>
          <img
            src={SoftwareSvg}
            alt="software engineering icon"
            width="200px"
          />
        </Box>
      </Box>
      <Section style={dottedBackground}>
        <Heading level="2">Projects</Heading>
        <Paragraph size="large">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          faucibus dui. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Vivamus vel fringilla ex, in interdum ex.
        </Paragraph>
        <Box height="medium" width="large" overflow="hidden">
          <Carousel fill>
            <CarouselEntry title="Project 1">
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                et faucibus dui. Interdum et malesuada fames ac ante ipsum
                primis in faucibus. Vivamus vel fringilla ex, in interdum ex.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="Project 2">
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                et faucibus dui. Interdum et malesuada fames ac ante ipsum
                primis in faucibus. Vivamus vel fringilla ex, in interdum ex.
                Morbi eu turpis eu sem interdum finibus sit amet non ante.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Vivamus vel fringilla ex, in interdum ex. Morbi eu turpis eu sem
                interdum finibus sit amet non ante.
              </Paragraph>
            </CarouselEntry>
            <CarouselEntry title="Project 3">
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                et faucibus dui. Interdum et malesuada fames ac ante ipsum
                primis in faucibus. Vivamus vel fringilla ex, in interdum ex.
                Morbi eu turpis eu sem interdum finibus sit amet non ante. neque
                nec eleifend.
              </Paragraph>
            </CarouselEntry>
          </Carousel>
        </Box>
      </Section>
      <AppFooter />
    </>
  );
}
