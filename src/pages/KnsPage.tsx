import React from "react";
import {
  Text,
  Box,
  Input,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppHeader, AppFooter, P, Section } from "../components";
import { registry } from "../kns";

// TODO: Link instead of useNavigate

type FilterProps = {
  search: string;
  onChange: (d: any) => void;
};

function Filter(props: FilterProps): JSX.Element {
  return (
    <InputGroup width="100%" maxWidth="450px">
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FaSearch} color="primary" mt="5px" />}
      />
      <Input
        size="lg"
        rounded="xl"
        borderColor="gray.300"
        placeholder="filter for keywords..."
        value={props.search}
        onChange={props.onChange}
      />
    </InputGroup>
  );
}

type TilCardProps = {
  path: string;
  title: string;
  tags: string[];
  date: string;
  description: string;
  onClick: (path: string) => void;
};

function TilCard(props: TilCardProps): JSX.Element {
  const tags = props.tags.map((d) => (
    <Box
      key={d}
      border={{ color: "brand", size: "small" }}
      margin="3px"
      p="4px"
      rounded="small"
    >
      <Text size="xsmall" color="brand">
        {d}
      </Text>
    </Box>
  ));

  return (
    <Box
      width="sm"
      margin="1rem"
      onClick={() => props.onClick(props.path)}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Flex p="small" background="light-4" direction="row">
        <Text size="small" color="dark-2">
          {props.date}
        </Text>
        <Text margin={{ horizontal: "xsmall" }} color="brand" fontWeight="bold">
          {props.title}
        </Text>
      </Flex>
      <Box p="small">
        <Text>{props.description}</Text>
      </Box>
      <Flex
        direction="row"
        flexWrap="wrap"
        align="start"
        justify="start"
        gap="none"
        p="small"
      >
        {tags}
      </Flex>
    </Box>
  );
}

export default function TilPage(): JSX.Element {
  const [search, setSearch] = React.useState("");
  let navigate = useNavigate();

  let data = registry.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
  if (search.length >= 3) {
    data = data.filter((val) => {
      const searchLower = search.toLowerCase();
      if (val.description.toLowerCase().includes(searchLower)) return true;
      if (val.title.toLowerCase().includes(searchLower)) return true;
      for (const d of val.tags) {
        if (d.toLowerCase().includes(searchLower)) return true;
      }
      return false;
    });
  }

  return (
    <Flex direction="column" minHeight="100vh">
      <AppHeader />
      <Flex direction="column" align="center" m={["1rem", "2rem"]} mb="4rem">
        <Section>
          <P>
            For my future self and anyone interested: These are little details
            you usually don't come across in hello-world tutorials. Always be
            aware of the expiration date.
          </P>
        </Section>
        <Filter
          search={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Flex
          direction="row"
          justify="center"
          align="start"
          m={["1rem", "2rem"]}
          width="100%"
          maxWidth={1500}
          wrap="wrap"
        >
          {data.map((d) => (
            <TilCard {...d} key={d.path} onClick={(d) => navigate(d)} />
          ))}
        </Flex>
      </Flex>
      <AppFooter />
    </Flex>
  );
}
