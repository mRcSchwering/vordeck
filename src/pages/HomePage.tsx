import React from "react";
import { Box, Heading, Paragraph, Menu, Anchor } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import { useHistory } from "react-router-dom";

function AppHeader(): JSX.Element {
  const history = useHistory();

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="transparent"
      pad={{ left: "medium", right: "medium", vertical: "xsmall" }}
      elevation="xsmall"
      margin="none"
    >
      <Anchor href="/" label="Home" margin="xsmall" color="dark-1" />
      <Menu
        label={<MenuIcon />}
        icon={false}
        items={[
          { label: "Home", onClick: () => history.push("/") },
          { label: "About", onClick: () => history.push("/about") },
          { label: "Knowledge Nuggets", onClick: () => history.push("/kns") },
        ]}
      />
    </Box>
  );
}

export default function HomePage(): JSX.Element {
  const parallaxStyle = {
    minWidth: "100%",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  } as React.CSSProperties;

  return (
    <>
      <AppHeader />
      <Box background="url('background.jpg')" style={parallaxStyle}>
        <Box pad="large" gap="large" align="center">
          <Heading level="2">Some Shitty Name</Heading>
          <Paragraph textAlign="center">
            Software for Biotech and Pharma
          </Paragraph>
          <Paragraph textAlign="center">Contact | About</Paragraph>
        </Box>
      </Box>
      <Box flex align="center" pad="medium" overflow={{ horizontal: "hidden" }}>
        <Box pad="large" gap="large">
          <Heading level="2">Some Shitty Name</Heading>
          <Paragraph textAlign="center">
            Software for Biotech and Pharma
          </Paragraph>
          <Paragraph textAlign="center">Contact | About</Paragraph>
        </Box>
        <Box pad="large" gap="large">
          <Heading level="2">Some Shitty Name</Heading>
          <Paragraph textAlign="center">
            Software for Biotech and Pharma
          </Paragraph>
          <Paragraph textAlign="center">Contact | About</Paragraph>
        </Box>
        <Box pad="large" gap="large">
          <Heading level="2">Some Shitty Name</Heading>
          <Paragraph textAlign="center">
            Software for Biotech and Pharma
          </Paragraph>
          <Paragraph textAlign="center">Contact | About</Paragraph>
        </Box>
      </Box>
    </>
  );
}
