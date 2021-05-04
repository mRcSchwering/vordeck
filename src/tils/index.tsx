import React from "react";
import AppHeader from "../AppHeader";
import { Box, Heading } from "grommet";
import LambdaGraphqlPage from "./LambdaGraphql";
import LatLngMercator from "./LatLngMercator";

type RegistryEntry = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  path: string;
  content: () => JSX.Element;
};

export const registry: RegistryEntry[] = [
  {
    path: "/til/lambda-graphql",
    title: "AWS Lambda and GraphQL",
    description:
      "Deploying a GraphQL API using AWS API Gateway and Lambda with python Ariadne. More elegant than a normal REST API.",
    tags: ["AWS Lambda", "AWS API Gateway", "GraphQL", "python Ariadne"],
    date: "2020-12-22",
    content: LambdaGraphqlPage,
  },
  {
    path: "/til/decimal-and-dms",
    title: "Converting between decimal and DMS coordinates",
    description:
      "Some pitfalls when working with leaflet and converting decimal coordinates to degrees/minutes/seconds with cardinal directions.",
    tags: ["Typescript", "Mercator", "longitude", "latitude", "leaflet"],
    date: "2021-03-12",
    content: LatLngMercator,
  },
  {
    path: "/til/",
    title: "Calculate surface areas and distances from geographic coordinates",
    description:
      "Calculate surface areas and distances from geographic coordinates.",
    tags: ["Typescript", "Mercator", "longitude", "latitude", "leaflet"],
    date: "2021-03-12",
    content: LatLngMercator,
  },
];

type PageProps = {
  title: string;
  description: string;
  img?: string;
  tags: string[];
  date: string;
  path: string;
  content?: () => JSX.Element;
};

function Page(props: PageProps): JSX.Element {
  return (
    <Box fill>
      <AppHeader />
      <Box flex align="center" pad="medium" overflow={{ horizontal: "hidden" }}>
        <Heading level="2">{props.title}</Heading>
        {props.content && props.content()}
      </Box>
    </Box>
  );
}

export const pages = registry.map((d) => ({
  path: d.path,
  page: () => <Page {...d} />,
}));
