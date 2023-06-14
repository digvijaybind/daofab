import logo from "./logo.svg";
import "./App.css";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./Theme";
import Child from "./component/Child";
import Parent from "./component/Parent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Parent />} />
            <Route path="/child" element={<Child />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
