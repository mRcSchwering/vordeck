import React from "react";
import { Heading, Paragraph, Anchor, Box, Image } from "grommet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const prevailingWindsLink = (
  <Anchor
    href="https://www.prevailing-winds.de/"
    label="prevailing-winds.de"
    target="_blank"
  />
);

const leafletLink = (
  <Anchor href="https://leafletjs.com/" label="leafletjs.com" target="_blank" />
);

const reactLeafletLink = (
  <Anchor
    href="https://react-leaflet.js.org/"
    label="react-leaflet.js.org"
    target="_blank"
  />
);

const decimalDegreesLink = (
  <Anchor
    href="https://en.wikipedia.org/wiki/Decimal_degrees"
    label="Decimal degrees (Wikipedia)"
    target="_blank"
  />
);

const toDegreesMinutesAndSecondsDef = `
export function toDegreesMinutesAndSeconds(coordinate: number): string {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  return degrees + "° " + minutes + "' " + seconds + "''";
}

const val = toDegreesMinutesAndSeconds(lat);
const card = lat >= 0 ? "N" : "S";
return val + " " + card;
}

export function convertLngDMS(lng: number): string {
let lngAdj = adjustLng(lng);
const val = toDegreesMinutesAndSeconds(lngAdj);
const card = lngAdj >= 0 ? "E" : "W";
return val + " " + card;
}`;

const adjustLngDef = `
export function adjustLng(lng: number): number {
  const lngAdj = lng % 360;
  if (lngAdj > 180) return (lngAdj % 180) - 180;
  if (lngAdj < -180) return (lngAdj % 180) + 180;
  return lngAdj;
}`;

const fixLngDegreesDef = `
def fix_lng_degrees(lng: float) -> float:
    sign = 1 if lng > 0 else -1
    lng_adj = (abs(lng) % 360) * sign
    if lng_adj > 180:
        return (lng_adj % 180) - 180
    elif lng_adj < -180:
        return lng_adj % 180
    return lng_adj`;

const cosineDef = `
export function cosine(degree: number): number {
  return Math.cos((degree * Math.PI) / 180);
}`;

const rect2areaDef = `
type Tuple = [number, number];

export function rect2area(lats: Tuple, lngs: Tuple): string {
  const v = (lats[1] - lats[0]) * 60;
  const aveLat = (lats[0] + lats[1]) / 2;
  const u = (lngs[1] - lngs[0]) * 60 * cosine(aveLat);
  return new Intl.NumberFormat().format(Math.round(u * v));
}`;

export default function Page(): JSX.Element {
  return (
    <>
      <Paragraph>
        - working on {prevailingWindsLink}- working with map, more than just
        pinning an address - using {leafletLink} for map (together with{" "}
        {reactLeafletLink}) - user should be able to select an area on map and
        see windrose for this area - idea for sailors/surfers/pilots for holiday
        planning or passage planning
      </Paragraph>
      <Box height="300px" width="550px">
        <Image
          style={{ borderRadius: "1vw" }}
          fit="cover"
          src="//vordeck-content.s3.amazonaws.com/prevailing-winds-la-rochelle.png"
        />
      </Box>
      <Heading level="3">Decimal coordinate to degrees/minutes/seconds</Heading>
      <Paragraph>
        - leaflet uses decimal degrees ({decimalDegreesLink}) - plus = east,
        minus = west - want to convert to traditional DMS
        (degrees/minutes/seconds) - where degrees are = 180 with a cardinal sign
        - minutes and seconds with base 60
      </Paragraph>

      <SyntaxHighlighter language="typescript" style={docco}>
        {toDegreesMinutesAndSecondsDef}
      </SyntaxHighlighter>

      <Heading level="3">Fixing Longitudes</Heading>

      <Paragraph>
        - dragging map to right monotonously increases longitude, to left
        decreases - 180°E = 180, dragging 1 degree further east should be 179°
        W, but is 181 - same the other way round, 180°W = -180, but going 1°
        further west should be 179°E but is -181 - and of course if I keep on
        turning further 360° I should end up at 179°E again - but the leaflet
        coordinates keeps increasing
      </Paragraph>
      <Box height="small" width="large">
        <Image
          style={{ borderRadius: "1vw" }}
          fit="cover"
          src="//vordeck-content.s3.amazonaws.com/map-repetitions.png"
        />
      </Box>

      <SyntaxHighlighter language="typescript" style={docco}>
        {adjustLngDef}
      </SyntaxHighlighter>

      <Paragraph>
        - I needed the same thing in my python backend as well - here I stumbled
        accross the fact that pythons modulus works a little different than in
        most languages
      </Paragraph>
      <SyntaxHighlighter language="python" style={docco}>
        {fixLngDegreesDef}
      </SyntaxHighlighter>

      <Heading level="3">Distances bewteen meridians</Heading>
      <Paragraph>
        - this has to do with the mercato projection - every degree in latitude
        is a distance of exactly 60M (going perfectly north or south) - but the
        longitude distances become smaller towards the poles - the are 60M at
        the equator and 0 at the poles - this decrease follows a cosine - so
        l_lng(d_lat) = cos(d_lat) * 60M where d_lat is the latitude in degrees
        and l_lng is the distance between 2 meridians at that latitude - using
        the following cosine
      </Paragraph>

      <Box height="medium">
        <Image
          style={{ borderRadius: "1vw" }}
          fit="contain"
          src="//upload.wikimedia.org/wikipedia/commons/e/ef/FedStats_Lat_long.svg"
        />
      </Box>

      <SyntaxHighlighter language="typescript" style={docco}>
        {cosineDef}
      </SyntaxHighlighter>

      <Paragraph>
        - needed to calculate it the other way round - calculating the area
        spanned by a rectangle enclosed by 2 lats and 2 lngs
      </Paragraph>

      <Box height="250px" width="medium">
        <Image
          style={{ borderRadius: "1vw" }}
          fit="cover"
          src="//upload.wikimedia.org/wikipedia/commons/8/87/Tissot_mercator.png"
        />
      </Box>

      <SyntaxHighlighter language="typescript" style={docco}>
        {rect2areaDef}
      </SyntaxHighlighter>
    </>
  );
}
