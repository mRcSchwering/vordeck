import React from "react";
import { Grommet, Spinner } from "grommet";
import { hp } from "grommet-theme-hp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { pages } from "./kns";

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
        <Route key="about" path="/" exact component={HomePage} />
        <Route key="kns" path="/kns" exact component={SuspendedKnsPage} />
        {pages.map((d) => (
          <Route key={d.path} path={d.path} exact component={d.page} />
        ))}
      </Router>
    </Grommet>
  );
}

export default App;
