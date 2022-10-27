import { P, A, BlockCode, Img, H4 } from "../components";

const code1 = `export function getDistanceFromLatLonInM(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  return 12742000 * Math.asin(Math.sqrt(a));
}`;

const code2 = `function floatNull(d: number): boolean {
  if (d == 0) return true;
  if (Math.abs(d) < 0.000001) return true;
  return false;
}

export function getCoordsFromVector(
  bear: number,
  dist: number,
  lat: number,
  lng: number
): {
  lat: number;
  lng: number;
} {
  const s = Math.sin;
  const c = Math.cos;
  const deg2rad = 0.017453292519943295; // Math.PI / 180
  const rad2deg = 57.29577951308232; // 180 / Math.PI
  const R_EARTH = 6371.01; // Earth's average radius in km

  const rlat = deg2rad * lat;
  const rlng = deg2rad * lng;
  const rbearing = deg2rad * bear;
  const rdist = dist / R_EARTH; // normalize linear distance to radian angle

  const rlat2 = Math.asin(
    s(rlat) * c(rdist) + c(rlat) * s(rdist) * c(rbearing)
  );

  let rlng2 = rlng;
  // if Endpoint not a pole
  if (!floatNull(c(rlat2))) {
    const d = Math.asin((s(rbearing) * s(rdist)) / c(rlat2));
    rlng2 = ((rlng - d + Math.PI) % (2 * Math.PI)) - Math.PI;
  }

  return { lat: rad2deg * rlat2, lng: rad2deg * rlng2 };
}`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Law-of-haversines.svg/231px-Law-of-haversines.svg.png"
        width="250px"
        height="250px"
      />
      <P>
        These are two more knowledge nuggets in the series of
        geolocation-related calculations (see{" "}
        <A
          label="Decimals to DMS"
          href="https://vordeck.de/kn/decimal-and-dms"
        />{" "}
        and{" "}
        <A
          label="Area on Earth"
          href="https://vordeck.de/kn/earth-rectangle-area"
        />
        ). One is about calculating the distance on earth between to points
        given in latitude and longitude. The other is about finding point B when
        moving from point A a given distance in a given direction. These
        calculation are all along a{" "}
        <A
          label="great circle"
          href="https://en.wikipedia.org/wiki/Great_circle"
        />
        . In other words, they assume the earth is a perfect sphere. This is
        actually not true but it is still correct within{" "}
        <A
          label="about 0.5%"
          href="https://en.wikipedia.org/wiki/Arc_length#Arcs_of_great_circles_on_the_Earth"
        />
        . Btw,{" "}
        <A
          label="movable-type.co.uk"
          href="http://www.movable-type.co.uk/scripts/latlong.html"
        />{" "}
        is a great resource for these kind of questions.
      </P>
      <H4 text="Great Circle Distance" />
      <P>
        This is the distance from one point on earth to another along a great
        circle. The formula is called{" "}
        <A
          href="https://en.wikipedia.org/wiki/Haversine_formula"
          label="Haversine formula"
        />{" "}
        and below is an implementation in Typescript. It is not obvious that
        this is the Haversine formula because it is a very optimized version
        from{" "}
        <A
          label="this SO question"
          href="https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula"
        />
        . The distance is given in meters, latitudes/longitudes are in degrees.
      </P>
      <BlockCode code={code1} lang="typescript" />
      <H4 text="Coordinates from Bearing and Distance" />
      <P>
        The following is a Typescript implementation from{" "}
        <A
          label="this SO question"
          href="https://stackoverflow.com/questions/877524/calculating-coordinates-given-a-bearing-and-a-distance"
        />
        . It can be derived from the Haversine formula as well. This one is not
        optimized. Bearing is given in degrees, distance in km,
        latitudes/longitudes in degrees.
      </P>
      <BlockCode code={code2} lang="typescript" />
    </>
  );
}
