import { Heading } from "@chakra-ui/react";
import { P, BlockCode, Img, Code, A, Ul, Dli } from "../components";

const dataPrep = `import polars as pl
import pyarrow.parquet as pq

DATA_DIR = Path(".") / "mydata"
S3_RATINGS = "s3://my-bucket/mydata/title.ratings.parquet"
S3_BASICS = "s3://my-bucket/mydata/title.basics/"

def load_ratings() -> pl.DataFrame:
    schema_def = {
        "tconst": pl.String(),
        "averageRating": pl.Float32(),
        "numVotes": pl.UInt32(),
    }
    return pl.read_csv(
        DATA_DIR / "title.ratings.tsv",
        separator="\t",
        null_values="\\N",
        schema=pl.Schema(schema_def),
        ignore_errors=True,
    )  # (1.5Mio, 3)

def load_basics() -> pl.DataFrame:
    schema_def = {
        "tconst": pl.String(),
        "titleType": pl.String(),
        "primaryTitle": pl.String(),
        "originalTitle": pl.String(),
        "isAdult": pl.UInt8(),
        "startYear": pl.UInt16(),
        "endYear": pl.UInt16(),
        "runtimeMinutes": pl.UInt16(),
        "genres": pl.String(),
    }
    return pl.read_csv(
        DATA_DIR / "title.basics.tsv",
        separator="\t",
        null_values="\\N",
        schema=pl.Schema(schema_def),
        ignore_errors=True,
    )  # (11Mio, 9)
      
tab = load_ratings().to_arrow()
pq.write_table(tab, S3_RATINGS)

tab = load_basics().to_arrow()
pq.write_to_dataset(tab, S3_BASICS, partition_cols=["startYear"])`;

const query1 = `tconsts = (
    pl.scan_parquet(S3_RATINGS)
    .filter((pl.col("averageRating") > 8) & (pl.col("numVotes") > 10000))
    .select((pl.col("tconst"),))
    .collect()
)["tconst"]`;

const query2 = `df = (
    pl.scan_parquet(S3_BASICS, hive_partitioning=True)
    .filter((pl.col("tconst").is_in(tconsts)))
    .select(pl.col("genres").value_counts(sort=True, name="n"))
    .head(10)
    .collect()
    .unnest("genres")
)`;

const query3 = `df = (
    pl.scan_parquet(S3_BASICS, hive_partitioning=True)
    .filter((pl.col("startYear") >= 2000) & (pl.col("tconst").is_in(tconsts)))
    .select(pl.col("genres").value_counts(sort=True, name="n"))
    .head(10)
    .collect()
    .unnest("genres")
)`;

const query4 = `df = (
    pl.scan_parquet(S3_BASICS, hive_partitioning=True)
    .filter((pl.col("startYear") == 2000) & (pl.col("tconst").is_in(tconsts)))
    .select(pl.col("genres").value_counts(sort=True, name="n"))
    .head(10)
    .collect()
    .unnest("genres")
)`;

const query5 = `tmp = (
    pl.scan_parquet(S3_BASICS, hive_partitioning=True)
    .filter((pl.col("startYear") == 2000))
    .select(pl.col("genres"), pl.col("tconst"))
    .collect()
)
df = (
    tmp.filter(pl.col("tconst").is_in(tconsts))
    .select(pl.col("genres").value_counts(sort=True, name="n"))
    .head(10)
    .unnest("genres")
)`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://www.meister.com/_Resources/Persistent/b/6/2/6/b626662961471a6b69364a4c3daed3ccdc026670/pflege_3-1920x1079.jpg"
        width="600px"
        height="250px"
      />
      <P>
        I wanted to see how practial it is to query{" "}
        <A href="https://parquet.apache.org/" label="Parquet" /> files on S3
        directly using <A href="https://docs.pola.rs/" label="Polars" /> and{" "}
        <A href="https://arrow.apache.org/" label="PyArrow" />.{" "}
        <b>Here's my tl;dr:</b>
        Files are basically downloaded, then queried. I assumed pyarrow would
        somehow be able to pushdown predicates over S3. But it doesn't. Of
        course, in a partitioned dataset, filtering to only a few partitions,
        will reduce the download size. But filtering within a parquet file will
        happen on the local machine.
      </P>
      <Heading variant="h4">Test data</Heading>
      <P>
        I downloaded some tables from{" "}
        <A
          href="https://developer.imdb.com/non-commercial-datasets/"
          label="imdb"
        />
        : <i>title.ratings.tsv</i> with 1.5 Mio rows of movie ratings and{" "}
        <i>title.basics.tsv</i> with 11 Mio rows of basic information about
        movies. One can be joined to the other over a variable{" "}
        <Code>tconst</Code>. The code below creates a parquet file for{" "}
        <i>ratings</i> and a hive-partitioned parquet dataset for <i>basics</i>{" "}
        with <Code>startYear</Code> as partitioning variable. It is recommended
        to create fewer than 10k partitions (ok) with files not larger than 2GB
        (ok) and not smaller than 20Mb (not ok). Most files in the partitioned
        dataset are smaller than 20Mb.
      </P>
      <BlockCode code={dataPrep} lang="python" label="data_prep.py" />
      <Heading variant="h4">Queries</Heading>
      <P>
        I timed a bunch of queries with different filters and aggregations.
        Below are some examples of queries for finding the most common genres of
        highly rated movies. Locally, these queries are a matter of
        milliseconds. From S3 querying 1.5Mio rows already takes 2s.
      </P>
      <BlockCode
        code={query1}
        lang="python"
        label="scan 1.5Mio rows, result 3k rows: 2s"
      />
      <P>
        I think I secretly hoped that predicate pushdown, which works well with
        local parquet files, would also somehow work with S3 parquet files. The
        filter above with average rating and number of votes selects about 3k
        rows. But it doesn't really matter here. Without filters the query will
        also take 2s.
      </P>
      <P>
        It becomes painful with larger datasets. Scanning the <i>basics</i>{" "}
        dataset with 11Mio rows on S3 takes about 110s. It is actually faster to
        use boto to download the files into a temporary directory and then run
        the query locally.
      </P>
      <BlockCode
        code={query2}
        lang="python"
        label="scan 11Mio rows, use 3k rows as filter: 110s"
      />
      <P>
        A filter on partitions is recognized fortunately. Below is the same
        query but with an additional filter for a movies of a specific{" "}
        <Code>startYear</Code>.<Code>startYear</Code> was a partition of the
        dataset. So now only one parquet file is downloaded and queried. The
        whole query now "only" took 16s.
      </P>
      <BlockCode
        code={query4}
        lang="python"
        label="scan 11Mio rows, single partition and 3k rows as filter: 16s"
      />
    </>
  );
}
