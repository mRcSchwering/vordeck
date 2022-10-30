import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import Router from "./Router";

// TODO: svg usage is super ugly

// TODO: replace media query with touchscreen query for cards
// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript

// TODO: check final import size

// TODO: react-card-flip needs React v17 but ChakraUI needs React v18
//       creator is working on it: https://github.com/AaronCCWong/react-card-flip/issues/100

function ThemedApp(): JSX.Element {
  /**
   * Theming:
   * General idea: https://chakra-ui.com/docs/styled-system/customize-theme
   * Check component (e.g. button https://chakra-ui.com/docs/components/button/usage)
   * and click on "Theme source" to see how theme is build.
   * Some stuff is not trivial. Here, are examples for most components:
   * https://codesandbox.io/s/chakra-ui-theme-extension-w5u2n?file=/src/theme/Form/index.js
   */
  const theme = extendTheme({
    colors: {
      primaryDark2: "#00292D",
      primaryDark1: "#014046",
      primary: "#0c555d",
      primaryLight1: "#1B6A71",
      primaryLight2: "#337C83",
      secondaryDark2: "#7A3A01",
      secondaryDark1: "#A35A19",
      secondary: "#c77933",
      secondaryLight1: "#E19959",
      secondaryLight2: "#FFC38E",
    },
    components: {
      Text: {
        baseStyle: {
          fontSize: "xl",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default ThemedApp;
