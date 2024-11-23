import { P, BlockCode, Img, Code, A } from "../components";

const code = `import datetime as dt
import boto3

client = boto3.client("logs")

def _awsptime(ts: int) -> dt.datetime:
    return dt.datetime.fromtimestamp(ts / 1000)

def _awsftime(ts: dt.datetime) -> int:
    return int(ts.timestamp() * 1000)

def search_log_groups(pattern: str) -> list[str]:
    """List all log group names that match pattern"""
    kwargs = {"logGroupNamePattern": pattern}
    res = client.describe_log_groups(**kwargs)
    group_names: list[str] = [d["logGroupName"] for d in res["logGroups"]]

    while "nextToken" in res:
        res = client.describe_log_groups(**kwargs, nextToken=res["nextToken"])
        group_names.extend(d["logGroupName"] for d in res["logGroups"])

    return group_names

def list_log_streams(
    group: str, earliest: dt.datetime, latest: dt.datetime
) -> list[str]:
    """List all log streams of a log group whose latest timestamp is in a time frame"""
    kwargs = {"logGroupName": group, "orderBy": "LastEventTime", "descending": True}
    event_time = latest
    streams = []

    res = client.describe_log_streams(**kwargs)
    for stream in res["logStreams"]:
        event_time = _awsptime(stream["lastEventTimestamp"])
        if earliest <= event_time <= latest:
            streams.append(stream["logStreamName"])

    while "nextToken" in res and event_time >= earliest:
        res = client.describe_log_streams(**kwargs, nextToken=res["nextToken"])
        for stream in res["logStreams"]:
            event_time = _awsptime(stream["lastEventTimestamp"])
            if earliest <= event_time <= latest:
                streams.append(stream["logStreamName"])

    return streams

def get_log_events(
    group: str, streams: list[str], earliest: dt.datetime, latest: dt.datetime
) -> list[tuple[dt.datetime, str]]:
    """Get events of all log streams within a time frame in chronological order"""
    events: list[tuple[dt.datetime, str]] = []
    kwargs = {
        "logGroupName": group,
        "startFromHead": True,
        "startTime": _awsftime(earliest),
        "endTime": _awsftime(latest),
    }

    for stream in streams:
        res = client.get_log_events(**kwargs, logStreamName=stream)
        events.extend((_awsptime(d["timestamp"]), d["message"]) for d in res["events"])

        while "nextForwardToken" in res:
            token = res["nextForwardToken"]
            res = client.get_log_events(**kwargs, logStreamName=stream, nextToken=token)
            events.extend(
                (_awsptime(d["timestamp"]), d["message"]) for d in res["events"]
            )
            if res["nextForwardToken"] == token:
                break

    return sorted(events)`;

const utcnow = `import time
import datetime as dt

def utcnow() -> dt.datetime:
    """Get naive datetime of the current UTC time (not host's timezone)"""
    return dt.datetime.now() + dt.timedelta(seconds=time.timezone)`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://i.kym-cdn.com/entries/icons/original/000/022/524/pepe_silvia_meme_banner.jpg"
        width="450px"
        height="250px"
      />
      <P>
        These are some functions I often use to gather logs from AWS.{" "}
        <A label="CloudWatch" href="https://aws.amazon.com/cloudwatch/" /> is
        AWS' application monitoring solution. It is well integrated with all
        services but sometimes annoying to actually find anything. One annoyance
        is that all events are grouped into <i>log groups</i> and{" "}
        <i>log streams</i>. What often happens is that log events of some point
        of interest are distributed over multiple log groups and log streams. On
        the AWS console this means a lot of tabs and clicking. It is much easier
        to use a CLI to gather all relevant log events and then browse through
        them on a terminal using <Code>grep</Code> and <Code>less</Code>.
      </P>
      <BlockCode code={code} lang="python" />
      <P>
        The core of this CLI is <Code>search_log_groups</Code>,{" "}
        <Code>list_log_streams</Code>, and <Code>get_log_events</Code>. They use{" "}
        <Code>describe_log_groups</Code> and <Code>describe_log_streams</Code>{" "}
        from{" "}
        <A
          label="boto3"
          href="https://boto3.amazonaws.com/v1/documentation/api/latest/index.html"
        />{" "}
        to find relevant log groups and log streams. Then{" "}
        <Code>get_log_events</Code> is used to download all relevant log events
        and return them in chronological order. Note that AWS timestamps are in
        UTC. For converting your current timezone to UTC (without needing to
        import <Code>pytz</Code>) you can use <Code>time.timezone</Code>.{" "}
        <i>E.g.</i> getting the current local time converted to UTC as timezone
        naive datetime object:
      </P>
      <BlockCode code={utcnow} lang="python" />
    </>
  );
}
