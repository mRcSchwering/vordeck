import React from "react";
import { Grommet } from "grommet";
import { hp } from "grommet-theme-hp";
import AboutPage from "./AboutPage";

function App() {
  return (
    <Grommet theme={hp}>
      <AboutPage />
    </Grommet>
  );
}

export default App;
