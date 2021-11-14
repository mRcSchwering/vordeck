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
    tags: ["AWS Lambda", "AWS API Gateway", "GraphQL", "python Ariadne", "SAM"],
    date: "2020-12-27",
    depends: () => import("./LambdaGraphql"),
  },
  {
    path: "/kn/decimal-and-dms",
    title: "Converting between decimal and DMS coordinates",
    description:
      "Converting decimal coordinates to degrees/minutes/seconds with cardinal directions when working with leaflet.",
    tags: ["Typescript", "Longitude", "Latitude", "leaflet", "Geolocation"],
    date: "2021-03-11",
    depends: () => import("./DecimalDms"),
  },
  {
    path: "/kn/earth-rectangle-area",
    title: "Area on earth from geographic coordinates",
    description:
      "Approximate area of a reasonably small rectangle on a Mercator projection given by 2 bounding geographic coordinates.",
    tags: [
      "Typescript",
      "Longitude",
      "Latitude",
      "leaflet",
      "Mercator",
      "Geolocation",
    ],
    date: "2021-03-12",
    depends: () => import("./EartRectangleArea"),
  },
  {
    path: "/kn/s3-cloudfront-cloudflare",
    title: "Deploy a SPA for free",
    description:
      "Deploy a single page application using AWS S3, AWS Cloudfront, and Cloudflare for free (almost).",
    tags: ["Cloudflare", "AWS S3", "AWS Cloudfront"],
    date: "2021-03-07",
    depends: () => import("./S3CloudfrontCloudflareDeploy"),
  },
  {
    path: "/kn/api-gateway-cloudflare",
    title: "API Gateway and Cloudflare",
    description:
      "Deploy a serverless backend using AWS API Gateway and Cloudflare for free (almost).",
    tags: ["Cloudflare", "AWS API Gateway"],
    date: "2021-03-28",
    depends: () => import("./ApiGatewayCloudflareDeploy"),
  },
  {
    path: "/kn/vscode-setup",
    title: "Proper VSCode Setup",
    description:
      "VSCode settings and configuration. A dump of settings that I usually need.",
    tags: ["VSCode", "configuration"],
    date: "2021-08-22",
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
    date: "2021-07-18",
    depends: () => import("./OptunaGpuQueue"),
  },
  {
    path: "/kn/pytorch-lightning-tensorboard",
    title: "PyTorch Lightning with TensorBoard",
    description:
      "How to set up PyTorch Lightning with a TensorBoard logger that tracks the performance of different hyperparameter sets.",
    tags: [
      "PyTorch Lightning",
      "TensorBoard",
      "PyTorch",
      "hyperparameter",
      "optimization",
      "RAY[tune]",
      "Optuna",
    ],
    date: "2021-06-13",
    depends: () => import("./pytorchLightningTensorboard"),
  },
  {
    path: "/kn/serverless-rds-sam",
    title: "AWS Serverless RDS and SAM",
    description:
      "Using AWS RDS serverless with API Gateway & Lambda orchestrated by SAM. Or how to attach a Lambda function to a VPC using SAM.",
    tags: ["AWS RDS", "AWS Lambda", "AWS API Gateway", "SAM"],
    date: "2021-08-15",
    depends: () => import("./SamServerlessRds"),
  },
  {
    path: "/kn/sam-authorizer",
    title: "AWS API Gateway Authorizer and SAM",
    description:
      "How to make a GraphQL API secured by a API Gateway authorizer work using SAM.",
    tags: ["AWS Cognito", "AWS Lambda", "AWS API Gateway", "SAM"],
    date: "2021-08-29",
    depends: () => import("./SamAuthorizer"),
  },
  {
    path: "/kn/rn-scrollselect",
    title: "React Native Scroll Selection",
    description: "How to make a scrollable select input with React Native",
    tags: ["Typescript", "React Native", "Expo", "Android"],
    date: "2021-11-11",
    depends: () => import("./ReactNativeScrollSelect"),
  },
  {
    path: "/kn/bkgservice-observer",
    title: "Background Service Observer",
    description:
      "Using an sub-pub pattern to get background location updates in a React Native app",
    tags: [
      "Typescript",
      "React Native",
      "Expo",
      "Android",
      "Background service",
      "subscription",
    ],
    date: "2021-11-12",
    depends: () => import("./BackgroundServiceObserver"),
  },
  {
    path: "/kn/great-circle-calcs",
    title: "Great Circle Calculations",
    description:
      "Some useful functions for calculating with geolocations, distances, and bearings",
    tags: [
      "Typescript",
      "Geolocation",
      "Longitude",
      "Latitude",
      "Bearing",
      "Haversine",
      "Orthodrome",
    ],
    date: "2021-11-14",
    depends: () => import("./GreatCircleCalcs"),
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
