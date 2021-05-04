import React from "react";
import { Box, Heading, Paragraph } from "grommet";
import AppHeader from "../AppHeader";

export default function HomePage(): JSX.Element {
  return (
    <Box fill>
      <AppHeader />
      <Box flex align="center" pad="medium" overflow={{ horizontal: "hidden" }}>
        <Heading level="2">Home</Heading>
        <Paragraph>Yessa...</Paragraph>
      </Box>
    </Box>
  );
}
