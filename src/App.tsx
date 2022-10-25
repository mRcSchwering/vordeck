import React from "react";
import {
  extendTheme,
  ChakraProvider,
  CSSReset,
  Spinner,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { pages } from "./kns";

// TODO: check final import size

// TODO: react-card-flip needs React v17 but ChakraUI needs React v18
//       creator is working on it: https://github.com/AaronCCWong/react-card-flip/issues/100

function SuspendedHomePage(): JSX.Element {
  const Page = React.lazy(() => import("./pages/HomePage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedAboutPage(): JSX.Element {
  const Page = React.lazy(() => import("./pages/AboutPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedKnsPage(): JSX.Element {
  const Page = React.lazy(() => import("./pages/KnsPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedLegalNoticePage(): JSX.Element {
  const Page = React.lazy(() => import("./pages/LegalNoticePage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedCookiePolicyPage(): JSX.Element {
  const Page = React.lazy(() => import("./pages/CookiePolicyPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function App() {
  return (
    <Router>
      {pages.map((d) => (
        <Route key={d.path} path={d.path} element={<d.page />} />
      ))}
      <Route key="about" path="/about" element={<SuspendedAboutPage />} />
      <Route key="ln" path="/ln" element={<SuspendedLegalNoticePage />} />
      <Route key="cp" path="/cp" element={<SuspendedCookiePolicyPage />} />
      <Route key="kns" path="/kns" element={<SuspendedKnsPage />} />
      <Route key="home" path="/" element={<SuspendedHomePage />} />
    </Router>
  );
}

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
      brand: {
        600: "#153e75", // active
        500: "#2a69ac", // default
      },
    },
    components: {
      Input: {
        defaultProps: {
          variant: "flushed",
        },
      },
      Button: {
        baseStyle: {
          borderRadius: "sm",
        },
        defaultProps: {
          colorScheme: "brand",
        },
      },
      Link: {
        variants: {
          primary: {
            color: "brand.500",
            _hover: { color: "brand.400" },
          },
        },
        defaultProps: {
          variant: "primary",
        },
      },
      Text: {
        variants: {
          p: {
            textAlign: "justify",
            maxWidth: "40rem",
            my: "0.5rem",
            px: ["1rem", "2rem"],
          },
        },
      },
      Heading: {
        variants: {
          h1: {
            fontSize: "1.5rem",
            maxWidth: "40rem",
            my: "0.5rem",
            px: ["1rem", "2rem"],
          },
          h2: {
            fontSize: "1.3rem",
            maxWidth: "40rem",
            my: "0.5rem",
            px: ["1rem", "2rem"],
          },
          h4: {
            fontSize: "1rem",
            maxWidth: "40rem",
            my: "0.5rem",
            px: ["1rem", "2rem"],
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  );
}

export default ThemedApp;
