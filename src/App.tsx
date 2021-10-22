import { Grommet } from "grommet";
import theme from "./theme.json";
import MyRouter from "./Router";

function App() {
  return (
    <Grommet theme={theme}>
      <MyRouter />
    </Grommet>
  );
}

export default App;
