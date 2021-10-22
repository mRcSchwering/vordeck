export default [
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
];
