import { P, A, BlockCode, Code, Img } from "../components";

const buildLayer = `LAYER="$1"
TARGET_DIR="./layers/\${LAYER}/python"
REQ_FILE="\${LAYER}_requirements.txt"

rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"

pip install -r "$REQ_FILE" --target "$TARGET_DIR"
find $TARGET_DIR -type f -name "*.so" | xargs -r strip
find $TARGET_DIR -type f -name "*.pyc" | xargs -r rm
find $TARGET_DIR -type f -name "*.npz" | xargs -r rm
find $TARGET_DIR -type f -name "*.dat" | xargs -r rm
find $TARGET_DIR -type d -name "__pycache__" | xargs -r rm -r
find $TARGET_DIR -type d -name "*.dist-info" | xargs -r rm -r
find $TARGET_DIR -type d -name "tests" | xargs -r rm -r`;

const templyml = `Globals:

Function:
  Runtime: python3.11
  MemorySize: 512
  Timeout: 900
  Environment:
    Variables:
      STORAGE_BUCKET: my-s3-bucket

Resources:

SklearnLayer:
  Type: AWS::Serverless::LayerVersion
  Properties:
    LayerName: MySklearnLayer
    ContentUri: layers/sklearn/
    CompatibleRuntimes:
      - python3.11
    RetentionPolicy: Delete

RunModelsFunction:
  Type: AWS::Serverless::Function
  Properties:
    FunctionName: MyRunModelsFunction
    CodeUri: sam
    Handler: run_models.lambda_handler
    Layers:
      - !Ref SklearnLayer
    Policies:
      - S3CrudPolicy:
          BucketName: my-s3-bucket
    Events:
      ...`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://www.tiptoptens.com/wp-content/uploads/2015/06/Overloaded-car-KS.jpg"
        width="500px"
        height="400px"
      />
      <P>
        Reasons for deploying machine learning models on Lambda may be abstruse
        but they do exist. In my case it is being cheap and lazy. I already have
        some deployed Lamda functions using the{" "}
        <A
          label="SAM framework"
          href="https://aws.amazon.com/serverless/sam/"
        />{" "}
        (similar to{" "}
        <A href="https://vordeck.de/kn/lambda-graphql" label="this" />
        ). Some inferences are run once per month and it doesn't matter how
        quick they are. Because I do not have a Docker container registry set up
        yet on my AWS account I wanted to avoid using docker images for Lambda
        deployment.
      </P>
      <P>
        Funny enough, deploying some large language model on AWS Lambda is
        pretty straight forward. That's because the deployment size of something
        like{" "}
        <A
          href="https://llama-cpp-python.readthedocs.io/"
          label="llama-cpp-python"
        />{" "}
        is not that large. But let's be honest, not everything is a chat bot.
        Most{" "}
        <A
          label="real-world machine learning"
          href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7885605/"
        />{" "}
        is done by Random Forests. Deploying a simple{" "}
        <A href="https://scikit-learn.org/" label="scikit-learn" /> model
        however is a whole other story. The deployed zip file of an AWS Lambda
        function must be smaller than 50Mb, and smaller than 250Mb when
        decompressed. <i>scikit-learn</i> alone is already too big for that. And
        chances are the model deployment also includes a{" "}
        <A href="https://pandas.pydata.org/" label="pandas" /> dependency.
      </P>
      <P>
        This{" "}
        <A
          label="AWS blog entry"
          href="https://aws.amazon.com/blogs/machine-learning/build-reusable-serverless-inference-functions-for-your-amazon-sagemaker-models-using-aws-lambda-layers-and-containers/"
        />{" "}
        gives us a hint on how to solve this. We must prepare a{" "}
        <A
          label="Lambda Layer"
          href="https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html"
        />{" "}
        and reduce its size by deleting those parts of all packages which are
        not needed for inference. For convenience I created a bash script for
        preparing Lambda layers in such a way.
      </P>
      <BlockCode code={buildLayer} lang="bash" label="build_layer.sh" />
      <P>
        For layer <i>sklearn</i> packages are installed from a{" "}
        <Code>sklearn_requirements.txt</Code> file to{" "}
        <Code>layers/sklearn/python/</Code> and then pruned by deleting files
        deemed unnecessary. I am using the{" "}
        <A
          label="SAM framework"
          href="https://aws.amazon.com/serverless/sam/"
        />{" "}
        so in the <i>template.yaml</i> I have to define a Lambda layer with{" "}
        <Code>ContentUri: layers/sklearn/</Code>. Since it is a python runtime,
        packages will be expected in that layer under <i>python/</i>.
      </P>
      <BlockCode code={templyml} lang="yaml" label="template.yaml" />
      <P>
        The model weights are abviously too large but these can be loaded during
        runtime from an S3 bucket. In the <i>template.yaml</i> above I am giving
        my Lmabda function (<i>RunModelsFunction</i>) access to the S3 bucket (
        <i>my-s3-bucket</i>) where I will be saving all model weights.
        Additionally, I increase <Code>Timeout</Code> and{" "}
        <Code>MemorySize</Code> accordingly.
      </P>
    </>
  );
}
