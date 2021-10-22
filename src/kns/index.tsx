import React from "react";
import { AppHeader, AppFooter } from "../components";
import { Box, Heading, Spinner, Text } from "grommet";
import registry from "./registry";

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
        <Box flex align="center" margin="large">
          <Heading level="2">{props.title}</Heading>
          <Text color="dark-3">{props.description}</Text>
          <Text color="dark-3">{props.date} by Marc Schwering</Text>
        </Box>
        <React.Suspense fallback={<Spinner />}>
          <Content />
        </React.Suspense>
      </Box>
      <AppFooter />
    </Box>
  );
}

export const pages = registry.map((d) => ({
  path: d.path,
  page: () => <Page {...d} />,
}));
