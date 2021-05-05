import React from "react";
import { Paragraph, Box, Image, Text, Anchor } from "grommet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const rect2areaDef = `
type Tuple = [number, number];

export function cosine(degree: number): number {
  return Math.cos((degree * Math.PI) / 180);
}

export function rect2area(lats: Tuple, lngs: Tuple): string {
  const v = (lats[1] - lats[0]) * 60;
  const aveLat = (lats[0] + lats[1]) / 2;
  const u = (lngs[1] - lngs[0]) * 60 * cosine(aveLat);
  return new Intl.NumberFormat().format(Math.round(u * v));
}`;

const leafletLink = (
  <Anchor href="https://leafletjs.com/" label="leafletjs" target="_blank" />
);

const marcatorLink = (
  <Anchor
    href="https://en.wikipedia.org/wiki/Mercator_projection"
    label="Mercator projection (wikipedia)"
    target="_blank"
  />
);

export default function Page(): JSX.Element {
  return (
    <>
      <Paragraph>
        Imagine you have a {leafletLink} app and a user can select a rectangle
        on it. Top and bottom borders of the rectangle are parallel to the
        equator, left and right borders are parallel the meridians. Calculating
        the actual area of this spherical surface is actually quite hard. I'm
        just guessing you work with a {marcatorLink} as well, so the rectangle
        is in reality a trapezoid. And actually it's a trapezoid on an
        ellipsoid.
      </Paragraph>
      <Box height="250px" width="medium">
        <Image
          style={{ borderRadius: "1vw" }}
          fit="cover"
          src="//upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mercator_projection_Square.JPG/480px-Mercator_projection_Square.JPG"
        />
        <Text size="small" color="dark-3" alignSelf="center">
          Mercator projection (wikipedia)
        </Text>
      </Box>

      <Paragraph>
        I don't know how to properly calculate this area but if you don't need
        high precision you can use the approximation below. I found it to be ok
        for areas of below a hundred thousand nautical miles for anything from
        70°N to 70°S. In the function below <code>lats</code> and{" "}
        <code>lngs</code> describe the coordinate at the south-western border
        and the north-eastern border of the rectangle. Basically, the average
        latitude is used to calculate the average distance between the bounding
        meridians. Then, the shape is treated as a planar rectangle.
      </Paragraph>
      <SyntaxHighlighter language="typescript" style={docco}>
        {rect2areaDef}
      </SyntaxHighlighter>
    </>
  );
}
