import React from "react";
import { Grommet, Spinner } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { pages } from "./kns";
import theme from "./theme.json";

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
    <Grommet theme={theme}>
      <Router>
        <Route key="home" path="/" exact component={SuspendedHomePage} />
        <Route key="about" path="/about" exact component={SuspendedAboutPage} />
        <Route key="kns" path="/kns" exact component={SuspendedKnsPage} />
        <Route key="ln" path="/ln" exact component={SuspendedLegalNoticePage} />
        <Route
          key="cp"
          path="/cp"
          exact
          component={SuspendedCookiePolicyPage}
        />
        {pages.map((d) => (
          <Route key={d.path} path={d.path} exact component={d.page} />
        ))}
      </Router>
    </Grommet>
  );
}

export default App;
