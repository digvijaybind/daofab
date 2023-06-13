import logo from "./logo.svg";
import "./App.css";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./Theme";
import Child from "./component/Child";
import Parent1 from "./component/Parent1";
import Parent from "./component/Parent";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Parent />
      </ThemeProvider>
    </div>
  );
}

export default App;
