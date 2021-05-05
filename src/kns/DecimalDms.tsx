import React from "react";
import { Paragraph, Anchor } from "grommet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const soPost = (
  <Anchor
    href="https://stackoverflow.com/questions/37893131/how-to-convert-lat-long-from-decimal-degrees-to-dms-format/37893239"
    label="this stackoverflow post"
    target="_blank"
  />
);

const leafletLink = (
  <Anchor href="https://leafletjs.com/" label="leafletjs" target="_blank" />
);

const toDegreesMinutesAndSecondsDef = `
export function toDMS(coordinate: number): string {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const mins = (absolute - degrees) * 60;
  const minsFlrd = Math.floor(mins);
  const seconds = Math.floor((mins - minsFlrd) * 60);
  return degrees + "° " + minutes + "' " + seconds + "''";
}

export function convertLatDMS(lng: number): string {
  const val = toDMS(lat);
  const card = lat >= 0 ? "N" : "S";
  return val + " " + card;
}

export function convertLngDMS(lng: number): string {
  let lngAdj = adjustLng(lng);
  const val = toDMS(lngAdj);
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

export default function Page(): JSX.Element {
  return (
    <>
      <Paragraph>
        When working with geographic coordinates you will probably be using
        decimal coordinates (<i>e.g.</i> <code>-23.91, 15.35</code>). But you
        might want to convert them into the traditional form consisting of
        degrees, minutes, seconds and cardinal direction (<i>e.g.</i>{" "}
        <code>14°24'01''S 1°43'19''W</code>).
      </Paragraph>
      <Paragraph>
        Rounding decimal degrees and assigning cardinal directions according to
        the sign is straight forward. But for getting minutes and seconds you
        have to convert the ramainder of decimal degrees to base 60.
        Fortunately, I found {soPost} where somebody has already done this.
        Below, is my version of it.
      </Paragraph>
      <SyntaxHighlighter language="typescript" style={docco}>
        {toDegreesMinutesAndSecondsDef}
      </SyntaxHighlighter>
      <Paragraph>
        Now comes another tricky part. If you work with libraries like{" "}
        {leafletLink} you also need to consider longitudes higher than 180 and
        lower than -180. The underlying map basically just repeats itself
        infinitely. So, if a user looks at the eastern cost of New Zealand the
        longitude might be 177. After dragging the map a little further
        eastwards, it might be 181. Now, instead of displaying 181°E we should
        actually display 179°W. Of course, the same goes the other way round.
        -190 should become 170E°, and 360 should be 0°E. Thus, we need some
        correction for the longitudes:
      </Paragraph>
      <SyntaxHighlighter language="typescript" style={docco}>
        {adjustLngDef}
      </SyntaxHighlighter>
      <Paragraph>
        In case you want to do this in <b>python</b> note that the modulus
        behaves differently. This is how it would look in python:
      </Paragraph>
      <SyntaxHighlighter language="python" style={docco}>
        {fixLngDegreesDef}
      </SyntaxHighlighter>
    </>
  );
}
