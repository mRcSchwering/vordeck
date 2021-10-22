import React from "react";
import { Spinner } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registry from "./kns/registry";

function SuspendedHomePage() {
  const Page = React.lazy(() => import("./pages/HomePage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedAboutPage() {
  const Page = React.lazy(() => import("./pages/AboutPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedKnsPage() {
  const Page = React.lazy(() => import("./pages/KnsPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedLegalNoticePage() {
  const Page = React.lazy(() => import("./pages/LegalNoticePage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

function SuspendedCookiePolicyPage() {
  const Page = React.lazy(() => import("./pages/CookiePolicyPage"));
  return (
    <React.Suspense fallback={<Spinner />}>
      <Page />
    </React.Suspense>
  );
}

export default function MyRouter() {
  return (
    <Router>
      <Route key="home" path="/" exact component={SuspendedHomePage} />
      <Route key="about" path="/about" exact component={SuspendedAboutPage} />
      <Route key="kns" path="/kns" exact component={SuspendedKnsPage} />
      <Route key="ln" path="/ln" exact component={SuspendedLegalNoticePage} />
      <Route key="cp" path="/cp" exact component={SuspendedCookiePolicyPage} />
      {registry.map((d) => (
        <Route key={d.path} path={d.path} exact component={d.page} />
      ))}
    </Router>
  );
}
