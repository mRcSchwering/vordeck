import React from "react";
import { P, Link, BlockCode, Img } from "./components";

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

export default function Page(): JSX.Element {
  return (
    <>
      <P>
        Imagine you have a{" "}
        <Link href="https://leafletjs.com/" label="leafletjs" /> app and a user
        can select a rectangle on it. Top and bottom borders of the rectangle
        are parallel to the equator, left and right borders are parallel the
        meridians. Calculating the actual area of this spherical surface is
        actually quite hard. I'm just guessing you work with a{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Mercator_projection"
          label="Mercator projection (wikipedia)"
        />{" "}
        as well, so the rectangle is in reality a trapezoid. And actually it's a
        trapezoid on an ellipsoid.
      </P>
      <Img
        height="250px"
        src="//upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mercator_projection_Square.JPG/480px-Mercator_projection_Square.JPG"
      >
        Mercator projection (wikipedia)
      </Img>

      <P>
        I don't know how to properly calculate this area but if you don't need
        high precision you can use the approximation below. Try it out. It gives
        you reasonable areas for anything from 70°N to 70°S. In the function
        below <code>lats</code> and <code>lngs</code> describe the coordinate at
        the south-western border and the north-eastern border of the rectangle.
        Basically, the average latitude is used to calculate the average
        distance between the bounding meridians. Then, the shape is treated as a
        (planar) rectangle.
      </P>
      <BlockCode lang="typescript" code={rect2areaDef} />
    </>
  );
}
