import { Heading } from "@chakra-ui/react";
import { P, A, Code, BlockCode, Img } from "../components";

const usageCode = `const [loc, setLoc] = React.useState<LocationType>();

async function startLocUpdates() {
  subscribeBkgLocationUpdates(locationSubscription: setLoc);
}

async function stopLocUpdates() {
  unsubscribeBkgLocationUpdates(setLoc);
}`;

const taskCode = `import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const MY_BKG_TASK = "MY_BKG_TASK";

TaskManager.defineTask(MY_BKG_TASK, ({ data }: any) => {
  const loc: Location.LocationObject = data.locations[0];
  bkgLocService.setLocation({
    lat: loc.coords.latitude,
    lng: loc.coords.longitude,
    acc: loc.coords.accuracy,
    ts: loc.timestamp,
  });
});`;

const serviceCode = `type SubscrType = (loc: LocationType) => void;

interface BkgLocationServiceType {
  subscribe: (sub: SubscrType) => void;
  setLocation: (location: LocationType) => void;
  unsubscribe: (sub: SubscrType) => void;
}

function BkgLocService(): BkgLocationServiceType {
  let subscribers: SubscrType[] = [];
  return {
    subscribe: (sub: SubscrType) => subscribers.push(sub),
    setLocation: (loc: LocationType) => subscribers.forEach((sub) => sub(loc)),
    unsubscribe: (sub: SubscrType) => {
      subscribers = subscribers.filter((_sub) => _sub !== sub);
    },
  };
}

const bkgLocService = BkgLocService();`;

const fullCode = `import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const MY_BKG_TASK = "MY_BKG_TASK";

TaskManager.defineTask(MY_BKG_TASK, ({ data }: any) => {
  const loc: Location.LocationObject = data.locations[0];
  bkgLocService.setLocation({
    lat: loc.coords.latitude,
    lng: loc.coords.longitude,
    acc: loc.coords.accuracy,
    ts: loc.timestamp,
  });
});

interface LocationType {
  lat: number;
  lng: number;
  ts: number | null;
  acc: number | null;
}

type SubscrType = (loc: LocationType) => void;

interface BkgLocationServiceType {
  subscribe: (sub: SubscrType) => void;
  setLocation: (location: LocationType) => void;
  unsubscribe: (sub: SubscrType) => void;
}

function BkgLocService(): BkgLocationServiceType {
  let subscribers: SubscrType[] = [];
  return {
    subscribe: (sub: SubscrType) => subscribers.push(sub),
    setLocation: (loc: LocationType) => subscribers.forEach((sub) => sub(loc)),
    unsubscribe: (sub: SubscrType) => {
      subscribers = subscribers.filter((_sub) => _sub !== sub);
    },
  };
}

const bkgLocService = BkgLocService();

export async function subscrBkgLoc(subscr: (loc: LocationType) => void) {
  const resp = await Location.requestForegroundPermissionsAsync();
  if (resp.granted) {
    bkgLocService.subscribe(subscr);
    await Location.startLocationUpdatesAsync(MY_BKG_TASK, {});
  }
}

export async function unsubscBkgLoc(subscr: (loc: LocationType) => void) {
  bkgLocService.unsubscribe(subscr);
  await TaskManager.unregisterTaskAsync(MY_BKG_TASK);
}`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/observer.jpeg"
        width="600px"
        height="300px"
      />
      <P>
        I was developing a{" "}
        <A label="React Native" href="https://reactnative.dev/" /> app with{" "}
        <A label="Expo" href="https://expo.dev/" /> and needed background
        location updates. The app (
        <A
          label="ankerwache (github)"
          href="https://github.com/mRcSchwering/ankerwache"
        />
        ) is an anchor watch while on a boat at anchor. It should raise a
        warning if the anchor is dragging. Background tasks in Expo can be
        managed with{" "}
        <A
          label="TaskManager"
          href="https://docs.expo.dev/versions/v43.0.0/sdk/task-manager/"
        />
        . First, a task has to be defined with{" "}
        <A
          label="TaskManager.defineTask"
          href="https://docs.expo.dev/versions/v43.0.0/sdk/task-manager/#taskmanagerdefinetasktaskname-taskexecutor"
        />
        , then it can be started with <i>e.g.</i>{" "}
        <A
          label="Location.startLocationUpdatesAsync"
          href="https://docs.expo.dev/versions/latest/sdk/location/#locationstartlocationupdatesasynctaskname-options"
        />
        . According to the docs the task has to be defined in the global scope
        of JS bundle.
      </P>
      <P>
        The problem now: How do you use the location information in your app?
        Whatever state you want to define for the location, it only exists in
        the React app scope. But the task is defined outside of that. After all,{" "}
        <Code>{"<App />"}</Code> could be unmounted while the background task is
        still running. So, how do you get events from your background task into
        your React app?
      </P>
      <Heading variant="h4">Observer Pattern</Heading>
      <P>
        To achieve that we can implement an{" "}
        <A
          label="Observer pattern"
          href="https://refactoring.guru/design-patterns/observer"
        />
        . The link nicely explains the idea. In short, we create an object, a{" "}
        <i>Publisher</i> which others, the <i>Observers</i> or{" "}
        <i>Subscribers</i>, can subscribe to. When the Publisher has any updates
        it will inform all its Subscribers via some known method. In TypeScript
        such a thing can look like this.
      </P>
      <BlockCode code={fullCode} lang="typescript" label="myBkgService.ts" />
      <P>
        <Code>BkgLocService</Code> is the <i>Publisher</i>. In this example I
        added some convenience functions
        <Code>subscrBkgLoc</Code> and <Code>unsubscBkgLoc</Code>. From the React
        app I can now get background location updates like this:
      </P>
      <BlockCode code={usageCode} lang="typescript" label="SomeComponent.tsx" />
      <Heading variant="h4">Explanation</Heading>
      <P>
        First, the task needs to be defined. This thing needs to be called in
        the global scope of the JS bundle. It will become active once we call{" "}
        <Code>Location.requestForegroundPermissionsAsync</Code>. In this case it
        will recieve location objects as <i>data</i>. There is also an{" "}
        <i>error</i> object but I left it out for brevity. The task will use a
        method of the <i>Publisher</i>, <Code>bkgLocService.setLocation</Code>.
        More on that below.
      </P>
      <BlockCode code={taskCode} lang="typescript" />
      <P>
        Next is the Publisher. Below we define it and then instantiate it. Here,
        this thing only provides methods to subscribe, unsubscribe, and set the
        location. Subscribe and unsubscribe is used by the Subscribers.{" "}
        <Code>setLocation</Code> is the method which is called by our background
        task. This can be used by the subscribers to tell the task what to do
        with the location. In our example it will have a reference to a{" "}
        <i>setState</i> function.
      </P>
      <BlockCode code={serviceCode} lang="typescript" />
      <P>
        To be precise, this is actually not a typical Observer pattern. The
        Publisher is actually just a <i>Mediator</i>. It doesn't know anything
        about the location. It just mediates between the Subscribers and the
        background task. It is actually a{" "}
        <A
          label="Pub-Sub pattern (wiki)"
          href="https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern"
        />
        . However, I think the Pub-Sub explanation is very generic. The{" "}
        <A
          label="Observer pattern"
          href="https://refactoring.guru/design-patterns/observer"
        />{" "}
        better explains the idea.
      </P>
    </>
  );
}
