import { Box, Heading, Paragraph, Text } from "grommet";
import {
  AppHeader,
  AppFooter,
  mailToHref,
  HrefButton,
  Section,
} from "../components";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Box background="brand" height="100vh">
        <AppHeader />
        <Section style={{ marginTop: "20vh" }}>
          <Heading level="1" color="dark-5">
            vordeck
          </Heading>
          <Text textAlign="center" size="large" margin="medium">
            Heaving software for Biotech and Pharma
          </Text>
        </Section>
      </Box>
      <Section style={{ marginBottom: "20vh", marginTop: "20vh" }}>
        <Paragraph size="xlarge">
          I am Marc and I love technology. My background is Molecular
          Biotechnology but for the past years I have worked as a Software
          Developer in Pharma R&D. Another career jumper? Yes, but with
          experience. Do you need help realizing some ideas? Let's have a chat.
        </Paragraph>
        <Paragraph textAlign="center" size="large">
          <HrefButton label="Contact" href={mailToHref} /> |{" "}
          <HrefButton label="About" href="/about" />
        </Paragraph>
      </Section>
      <AppFooter />
    </>
  );
}
