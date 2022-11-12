import React from "react";
import { Spinner } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pages } from "./kns";

function SuspendedHomePage(): JSX.Element {
  const Page = React.lazy(() => import("./pages/HomePage"));
  return (
    <React.Suspense fallback={<Spinner background="primary.500" />}>
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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map((d) => (
          <Route key={d.path} path={d.path} element={<d.page />} />
        ))}
        <Route key="about" path="/about" element={<SuspendedAboutPage />} />
        <Route key="ln" path="/ln" element={<SuspendedLegalNoticePage />} />
        <Route key="cp" path="/cp" element={<SuspendedCookiePolicyPage />} />
        <Route key="kns" path="/kns" element={<SuspendedKnsPage />} />
        <Route key="home" path="/" element={<SuspendedHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
