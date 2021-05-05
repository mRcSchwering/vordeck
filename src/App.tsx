import React from "react";
import { Grommet } from "grommet";
import { hp } from "grommet-theme-hp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import KnsPage from "./pages/KnsPage";
import { pages } from "./kns";

function App() {
  return (
    <Grommet theme={hp}>
      <Router>
        <Route key="about" path="/" exact component={HomePage} />
        <Route key="kns" path="/kns" exact component={KnsPage} />
        {pages.map((d) => (
          <Route key={d.path} path={d.path} exact component={d.page} />
        ))}
      </Router>
    </Grommet>
  );
}

export default App;
