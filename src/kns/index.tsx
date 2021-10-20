import React from "react";
import { AppHeader, AppFooter } from "../components";
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
  {
    path: "/kn/s3-cloudfront-cloudflare",
    title: "Deploy a SPA for free",
    description:
      "Deploy a single page application using AWS S3, AWS Cloudfront, and Cloudflare for free (almost).",
    tags: ["Cloudflare", "AWS S3", "AWS Cloudfront"],
    date: "2021-10-18",
    depends: () => import("./S3CloudfrontCloudflareDeploy"),
  },
  {
    path: "/kn/api-gateway-cloudflare",
    title: "API Gateway and Cloudflare",
    description:
      "Deploy a serverless backend using AWS API Gateway and Cloudflare for free (almost).",
    tags: ["Cloudflare", "AWS API Gateway"],
    date: "2021-10-19",
    depends: () => import("./ApiGatewayCloudflareDeploy"),
  },
  {
    path: "/kn/vscode-setup",
    title: "Proper VSCode Setup",
    description:
      "VSCode settings and configuration. A dump of settings that I usually need.",
    tags: ["VSCode", "configuration"],
    date: "2021-10-19",
    depends: () => import("./VsCodeSetup"),
  },
  {
    path: "/kn/optuna-gpu-queue",
    title: "Parallel HParam Search with 1 GPU per Trial",
    description:
      "Using Optuna to search a hyperparameter space in many trials where each trial grabs itself one unused GPU.",
    tags: [
      "Optuna",
      "GPU",
      "multiprocessing",
      "hyperparameter",
      "optimization",
    ],
    date: "2021-10-19",
    depends: () => import("./OptunaGpuQueue"),
  },
  {
    path: "/kn/pytorch-lightning-tensorboard",
    title: "Pytorch-lightning with Tensorboard",
    description:
      "How to set up pytorch-lightning with a tensorboard logger that track the performance of different hyperparameter sets.",
    tags: [
      "pytorch-lightning",
      "Tensorboard",
      "pytorch",
      "hyperparameter",
      "optimization",
    ],
    date: "2021-10-20",
    depends: () => import("./pytorchLightningTensorboard"),
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
