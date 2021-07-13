import React from "react";
import { AppHeader } from "../components";
import { Box, Heading, Spinner, Text } from "grommet";

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
      "Converting decimal coordinates to degrees/minutes/seconds with cardinal directions when working with leaflet.",
    tags: ["Typescript", "longitude", "latitude", "leaflet"],
    date: "2021-03-11",
    depends: () => import("./DecimalDms"),
  },
  {
    path: "/kn/earth-rectangle-area",
    title: "Area on earth from geographic coordinates",
    description:
      "Approximate area of a reasonably small rectangle on a Mercator projection given by 2 bounding geographic coordinates.",
    tags: ["Typescript", "longitude", "latitude", "leaflet", "Mercator"],
    date: "2021-03-12",
    depends: () => import("./EartRectangleArea"),
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
        <Text color="dark-3">{props.description}</Text>
        <Text color="dark-3">{props.date} by Marc Schwering</Text>
        <React.Suspense fallback={<Spinner />}>
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
