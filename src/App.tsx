import {
  extendTheme,
  ChakraProvider,
  defineStyleConfig,
} from "@chakra-ui/react";
import Router from "./Router";

// TODO: replace media query with touchscreen query for cards
// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript

// TODO: check final import size

// TODO: react-card-flip needs React v17 but ChakraUI needs React v18
//       creator is working on it: https://github.com/AaronCCWong/react-card-flip/issues/100

// TODO: centered loading spinner

const Link = defineStyleConfig({
  variants: {
    default: {
      color: "secondary.600",
      fontWeight: "semibold",
    },
    nav: {
      fontSize: "xl",
      mx: 2,
      color: "gray.700",
    },
  },
  defaultProps: {
    variant: "default",
  },
});

const Text = defineStyleConfig({
  baseStyle: {
    fontSize: "xl",
    px: [1, 2],
  },
});

const Heading = defineStyleConfig({
  baseStyle: {
    color: "gray.700",
    px: [1, 2],
  },
  variants: {
    h2: {
      mt: ["1rem", "2rem"],
      mb: ["0.5rem", "1rem"],
      fontSize: "5xl",
    },
    h4: {
      mt: ["0.5rem", "1rem"],
      mb: ["0.25rem", "0.5rem"],
      fontSize: "xl",
    },
    h6: {
      mt: ["0.5rem", "1rem"],
      mb: ["0.25rem", "0.5rem"],
      fontSize: "md",
    },
  },
});

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
      primary: {
        300: "#337C83",
        400: "#1B6A71",
        500: "#0c555d",
        600: "#014046",
        700: "#00292D",
      },
      secondary: {
        300: "#FFC38E",
        400: "#E19959",
        500: "#c77933",
        600: "#A35A19",
        700: "#7A3A01",
      },
    },
    components: {
      Text,
      Link,
      Heading,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default ThemedApp;
