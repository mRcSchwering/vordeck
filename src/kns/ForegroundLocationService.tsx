import { Heading } from "@chakra-ui/react";
import { P, A, BlockCode, Img, Code } from "../components";

const taskDef = `import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const WATCH_LOCATION_TASK = "watch-location-task";

interface TaskExecutorBody {
  data: any;
  error: TaskManager.TaskManagerError | null;
}

TaskManager.defineTask(
  WATCH_LOCATION_TASK,
  ({ data, error }: TaskExecutorBody) => {
    const location: Location.LocationObject = data.locations[0];

    if (error) {
      console.log("Error in WATCH_LOCATION_TASK", error.message);
      return;
    }

    const { latitude, longitude, accuracy } = location.coords;
    bkgLocationService.setLocation({
      lat: latitude,
      lng: longitude,
      acc: accuracy,
      ts: location.timestamp,
    });
  }
);`;

const startService = `// ask permission
resp = await Location.requestForegroundPermissionsAsync();
// then check if granted

// on some event
const opts = {
  accuracy: Location.Accuracy.Highest,
  timeInterval: 5000,
  foregroundService: {
    notificationTitle: "Regular location updates...",
    notificationBody:
      "Sounds alarm if drift is persistently higher than radius",
    notificationColor: "#0c555d",
  },
  pausesUpdatesAutomatically: false,
  distanceInterval: 1,
};
await Location.startLocationUpdatesAsync(WATCH_LOCATION_TASK, opts);`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/onetime_location_perm.png"
        width="420px"
        height="290px"
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
        warning if the anchor is dragging.
      </P>
      <P>
        In Expo there are currently problems with the{" "}
        <i>ACCESS_BACKGROUND_LOCATION</i> permission (see e.g.{" "}
        <A
          label="this github issue"
          href="https://github.com/expo/expo/issues/14774"
        />
        ). I actually wanted to use{" "}
        <A
          label="geofencing"
          href="https://developer.android.com/training/location/geofencing"
        />{" "}
        for my app but it also requires background location access. I did not
        want to wait for this issue being fixed and so I had to look for
        alternatives.
      </P>
      <Heading variant="h4">Android Foreground Services</Heading>
      <P>
        Fortunately, there is a thing called{" "}
        <A
          label="foreground services on Android"
          href="https://developer.android.com/guide/components/foreground-services"
        />
        . Basically, a notification is shown to the user when your app performs
        a task. By that, it is not considered a background task anymore as the
        user can see that your app is currently doing something. Thus, no
        background access permissions are required. For my usecase this made
        sense. I wanted to show a notification anyway for when the anchor watch
        is active.
      </P>
      <P>
        From a developer perspective this thing works like a background service.
        You first define a task on the main level of the JS bundle. Below is an
        example. I left out error handling for brevity.
      </P>
      <BlockCode code={taskDef} lang="typescript" label="bkgLocService.ts" />
      <P>
        Then, from within my React app I can start the task. Here, I am using{" "}
        <A
          label="Location.startLocationUpdatesAsync"
          href="https://docs.expo.dev/versions/latest/sdk/location/#locationstartlocationupdatesasynctaskname-options"
        />
        . Note the <Code>foregroundService</Code> key in the options though. It
        defines a notification and thereby converts this task to a foreground
        service. All I need to ask for in this case is forground location
        permission.
      </P>
      <BlockCode
        code={startService}
        lang="typescript"
        label="someComponent.tsx"
      />
      <P>
        The user will have the options <i>Deny</i>, <i>Only this time</i>,{" "}
        <i>While using the app</i>. The task continues to run even with the app
        in the background and the phone locked.
      </P>
    </>
  );
}
