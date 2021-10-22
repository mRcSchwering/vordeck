import React from "react";
import {
  Text,
  Box,
  TextInput,
  Paragraph,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "grommet";
import { Search } from "grommet-icons";
import { useHistory } from "react-router-dom";
import { AppHeader, AppFooter } from "../components";
import registry from "../kns/registry";

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
  onClick: (path: string) => void;
};

function TilCard(props: TilCardProps): JSX.Element {
  const tags = props.tags.map((d) => (
    <Box key={d} background="brand" margin="3px" pad="4px" round="xsmall">
      <Text size="small">{d}</Text>
    </Box>
  ));

  return (
    <Card
      width="medium"
      margin="small"
      onClick={() => props.onClick(props.path)}
    >
      <CardHeader pad="small" background="light-4" direction="row">
        <Text size="small" color="dark-2">
          {props.date}
        </Text>
        <Text margin={{ horizontal: "xsmall" }} color="brand" weight="bold">
          {props.title}
        </Text>
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
  let history = useHistory();

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
          For my future self and anyone interested: These are little details you
          usually don't come across in hello-world tutorials. Always be aware of
          the expiration date.
        </Paragraph>
        <Filter
          search={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Box
          flex
          direction="row"
          justify="center"
          align="start"
          pad="medium"
          overflow={{ horizontal: "hidden" }}
          wrap={true}
        >
          {data.map((d) => (
            <TilCard {...d} key={d.path} onClick={(d) => history.push(d)} />
          ))}
        </Box>
      </Box>
      <AppFooter />
    </Box>
  );
}
