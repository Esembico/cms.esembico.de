import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./css/App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Recommendations from "./pages/Recommendations";
import Team from "./pages/Team";
import Images from "./pages/Images";

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="main">
        <Switch>
          <Route exact={true} path="/team">
            <Team />
          </Route>
          <Route exact={true} path="/recommendations">
            <Recommendations />
          </Route>
          <Route exact={true} path="/images">
            <Images />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
