import React from "react";
import { Text, Flex, Heading } from "@chakra-ui/react";
import { AppHeader, AppFooter, Spinner } from "../components";

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
  {
    path: "/kn/foreground-loc-service",
    title: "Forground Location Service",
    description:
      "A way to create a background location service on Android without the need for background location access",
    tags: [
      "Typescript",
      "Geolocation",
      "Android",
      "ACCESS_BACKGROUND_LOCATION",
      "Expo",
    ],
    date: "2021-11-15",
    depends: () => import("./ForegroundLocationService"),
  },
  {
    path: "/kn/retry-timeouts",
    title: "Retry-Timeout Sessions",
    description:
      "Making requests and other functions more robust by adding timeouts, retries, and backoffs.",
    tags: ["Python", "requests", "timeout", "retry", "backoff"],
    date: "2021-12-03",
    depends: () => import("./TimeoutRetry"),
  },
  {
    path: "/kn/search-json-keys",
    title: "Search Through JSON Objects",
    description:
      "Tools that help searching through deeply nested JSON objects.",
    tags: ["JSON", "Util", "Python"],
    date: "2022-10-13",
    depends: () => import("./SearchJsonKeys"),
  },
  {
    path: "/kn/yaml-envars",
    title: "YAML Files with Environment Variables",
    description: "Script for adding environment variables to YAML files.",
    tags: ["environments", "deployment", "YAML", "bash", "kubernetes"],
    date: "2022-10-14",
    depends: () => import("./YamlEnvars"),
  },
  {
    path: "/kn/python-update-api",
    title: "Better Update Endpoints in Python APIs",
    description:
      "Building more flexible APIs in python by distinguishing between undefined and null.",
    tags: [
      "Ariadne",
      "pydantic",
      "REST",
      "GraphQL",
      "python",
      "null",
      "undefined",
      "typing",
    ],
    date: "2022-10-16",
    depends: () => import("./PythonUpdateApi"),
  },
  {
    path: "/kn/moto-backend",
    title: "Mock AWS Services with Moto in Backend",
    description:
      "Recipe for mocking AWS S3 and other services via moto in a python backend.",
    tags: [
      "boto3",
      "moto",
      "REST",
      "GraphQL",
      "python",
      "mocking",
      "testing",
      "AWS",
    ],
    date: "2022-10-17",
    depends: () => import("./MotoBackend"),
  },
  {
    path: "/kn/aws-mfa-login",
    title: "AWS CLI MFA Login",
    description:
      "For a better feeling when using AWS tokens. AWS CLI session tokens with 2FA on a personal computer.",
    tags: ["AWS", "aws sts", "MFA", "2FA", "security"],
    date: "2023-01-25",
    depends: () => import("./Aws2faLogin"),
  },
  {
    path: "/kn/lofi-sitemap-generator",
    title: "Lo-fi Sitemap XML Generator",
    description:
      "A simple DIY solution for generating a sitemap.xml for a webapp without using additional libraries.",
    tags: ["Typescript", "sitemap.xml", "Regex"],
    date: "2023-03-28",
    depends: () => import("./LofiSitemapGenerator"),
  },
  {
    path: "/kn/python-rust-package",
    title: "Python package with some Rust",
    description:
      "An example setup for a Python package, that is mainly written in Python with a few Rust functions included.",
    tags: ["python", "rust", "maturin", "PyO3", "PyPI", "github-actions"],
    date: "2023-12-01",
    depends: () => import("./PythonRustPackage"),
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
    <Flex direction="column" minHeight="100vh">
      <AppHeader />
      <Flex direction="column" align="center" m="2rem" mb="10em">
        <Flex direction="column" align="center" m="4rem">
          <Heading variant="h2">{props.title}</Heading>
          <Text color="gray.500">{props.description}</Text>
          <Text color="gray.500">{props.date} by Marc Schwering</Text>
        </Flex>
        <React.Suspense fallback={<Spinner />}>
          <Content />
        </React.Suspense>
      </Flex>
      <AppFooter />
    </Flex>
  );
}

export const pages = registry.map((d) => ({
  path: d.path,
  page: () => <Page {...d} />,
}));
