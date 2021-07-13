import React from "react";
import { Grommet, Spinner } from "grommet";
import { hp } from "grommet-theme-hp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { pages } from "./kns";

function SuspendedHomePage(): JSX.Element {
  const HomePage = React.lazy(() => import("./pages/HomePage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <HomePage />
    </React.Suspense>
  );
}

function SuspendedAboutPage(): JSX.Element {
  const AboutPage = React.lazy(() => import("./pages/AboutPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <AboutPage />
    </React.Suspense>
  );
}

function SuspendedKnsPage(): JSX.Element {
  const KnsPage = React.lazy(() => import("./pages/KnsPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <KnsPage />
    </React.Suspense>
  );
}

function App() {
  return (
    <Grommet theme={hp}>
      <Router>
        <Route key="home" path="/" exact component={SuspendedHomePage} />
        <Route key="about" path="/about" exact component={SuspendedAboutPage} />
        <Route key="kns" path="/kns" exact component={SuspendedKnsPage} />
        {pages.map((d) => (
          <Route key={d.path} path={d.path} exact component={d.page} />
        ))}
      </Router>
    </Grommet>
  );
}

export default App;
