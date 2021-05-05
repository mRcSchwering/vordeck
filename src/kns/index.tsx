import React from "react";
import AppHeader from "../AppHeader";
import { Box, Heading } from "grommet";

type RegistryEntry = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  path: string;
  depends: () => Promise<{ default: any }>;
};

export const registry: RegistryEntry[] = [
  {
    path: "/kn/lambda-graphql",
    title: "AWS Lambda and GraphQL",
    description:
      "Deploying a GraphQL API using AWS API Gateway and Lambda with python Ariadne. More elegant than a normal REST API.",
    tags: ["AWS Lambda", "AWS API Gateway", "GraphQL", "python Ariadne"],
    date: "2020-12-22",
    depends: () => import("./LambdaGraphql"),
  },
  {
    path: "/kn/decimal-and-dms",
    title: "Converting between decimal and DMS coordinates",
    description:
      "Some pitfalls when working with leaflet and converting decimal coordinates to degrees/minutes/seconds with cardinal directions.",
    tags: ["Typescript", "Mercator", "longitude", "latitude", "leaflet"],
    date: "2021-03-12",
    depends: () => import("./LatLngMercator"),
  },
  {
    path: "/kn/",
    title: "Calculate surface areas and distances from geographic coordinates",
    description:
      "Calculate surface areas and distances from geographic coordinates.",
    tags: ["Typescript", "Mercator", "longitude", "latitude", "leaflet"],
    date: "2021-03-12",
    depends: () => import("./LatLngMercator"),
  },
];

type PageProps = {
  title: string;
  description: string;
  img?: string;
  tags: string[];
  date: string;
  path: string;
  depends: () => Promise<{ default: any }>;
};

function Page(props: PageProps): JSX.Element {
  const Content = React.lazy(props.depends);
  return (
    <Box fill>
      <AppHeader />
      <Box flex align="center" pad="medium" overflow={{ horizontal: "hidden" }}>
        <Heading level="2">{props.title}</Heading>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Content />
        </React.Suspense>
      </Box>
    </Box>
  );
}

export const pages = registry.map((d) => ({
  path: d.path,
  page: () => <Page {...d} />,
}));
