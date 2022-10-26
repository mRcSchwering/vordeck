import React from "react";
import {
  Text,
  Box,
  Input,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { AppHeader, AppFooter, P, PageContainer } from "../components";
import { registry } from "../kns";

type FilterProps = {
  search: string;
  onChange: (d: any) => void;
};

function Filter(props: FilterProps): JSX.Element {
  return (
    <InputGroup width="100%" maxWidth="md">
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
};

function TilCard(props: TilCardProps): JSX.Element {
  const tags = props.tags.map((d) => (
    <Box
      key={d}
      borderWidth="2px"
      borderColor="primary"
      margin="3px"
      p="0.2rem"
      rounded="lg"
    >
      <Text fontSize="md" color="primary">
        {d}
      </Text>
    </Box>
  ));

  return (
    <LinkBox
      as="article"
      width="md"
      margin={["0.5rem", "1rem"]}
      boxShadow="md"
      rounded="lg"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Flex p="0.5rem" background="gray.100" direction="row" gap="1rem">
        <LinkOverlay href={props.path}>
          <Text fontSize="md" color="gray.700" width="6rem">
            {props.date}
          </Text>
        </LinkOverlay>
        <Text fontSize="lg" color="primary" fontWeight="bold">
          {props.title}
        </Text>
      </Flex>
      <Box p="0.5rem">
        <Text fontSize="lg">{props.description}</Text>
      </Box>
      <Flex
        direction="row"
        wrap="wrap"
        align="start"
        justify="start"
        gap="none"
        p="0.5rem"
      >
        {tags}
      </Flex>
    </LinkBox>
  );
}

export default function TilPage(): JSX.Element {
  const [search, setSearch] = React.useState("");

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
    <PageContainer>
      <AppHeader />
      <Flex direction="column" align="center" m={["1rem", "2rem"]} mb="4rem">
        <P>
          For my future self and anyone interested: These are little details you
          usually don't come across in hello-world tutorials. Always be aware of
          the expiration date.
        </P>
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
            <TilCard {...d} key={d.path} />
          ))}
        </Flex>
      </Flex>
      <AppFooter />
    </PageContainer>
  );
}
