/**
 * Should stay as .js without any imports
 * because this is needed by pre-deploy script to generate sitemap
 */
import React from "react";
import { Spinner } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registry from "./kns/registry.js";

function Page(props) {
  const Content = React.lazy(props.depends);
  return (
    <Box fill>
      <AppHeader />
      <Box flex align="center" pad="medium" overflow={{ horizontal: "hidden" }}>
        <Box flex align="center" margin="large">
          <Heading level="2">{props.title}</Heading>
          <Text color="dark-3">{props.description}</Text>
          <Text color="dark-3">{props.date} by Marc Schwering</Text>
        </Box>
        <React.Suspense fallback={<Spinner />}>
          <Content />
        </React.Suspense>
      </Box>
      <AppFooter />
    </Box>
  );
}

export const pages = registry.map((d) => ({
  path: d.path,
  page: () => <Page {...d} />,
}));

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
      {pages.map((d) => (
        <Route key={d.path} path={d.path} exact component={d.page} />
      ))}
    </Router>
  );
}
