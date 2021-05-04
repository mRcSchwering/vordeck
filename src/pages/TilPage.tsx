import React from "react";
import {
  Text,
  Anchor,
  Box,
  TextInput,
  Paragraph,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "grommet";
import { Search } from "grommet-icons";
import AppHeader from "../AppHeader";
import { registry } from "../tils";

type FilterProps = {
  search: string;
  onChange: (d: any) => void;
};

function Filter(props: FilterProps): JSX.Element {
  return (
    <Box
      width="medium"
      height="50px"
      direction="row"
      align="center"
      pad={{ horizontal: "small", vertical: "xsmall" }}
      round="small"
      border={{
        side: "all",
        color: "border",
      }}
    >
      <Search color="brand" />
      <TextInput
        plain
        style={{ height: "40px" }}
        placeholder="filter for keywords..."
        value={props.search}
        onChange={props.onChange}
      />
    </Box>
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
    <Box key={d} background="brand" margin="3px" pad="4px" round="small">
      <Text size="small">{d}</Text>
    </Box>
  ));

  return (
    <Card width="medium">
      <CardHeader pad="small" background="light-1" direction="row">
        <Text size="small" color="dark-2">
          {props.date}
        </Text>
        <Anchor href={props.path} label={props.title} />
      </CardHeader>
      <CardBody pad="small">
        <Text>{props.description}</Text>
      </CardBody>
      <CardFooter
        direction="row"
        wrap={true}
        align="start"
        justify="start"
        gap="none"
        pad="small"
      >
        {tags}
      </CardFooter>
    </Card>
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
    <Box fill>
      <AppHeader />
      <Box flex align="center" pad="medium" overflow={{ horizontal: "hidden" }}>
        <Paragraph>
          These are things I have learned working on projects reduced to little
          knowledge nuggets. My future self will probably be looking for these
          pieces of code but maybe it also helps other people.
        </Paragraph>
        <Filter
          search={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Box
          flex
          align="center"
          pad="medium"
          overflow={{ horizontal: "hidden" }}
        >
          <Box gap="medium">
            {data.map((d) => (
              <TilCard {...d} key={d.path} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
