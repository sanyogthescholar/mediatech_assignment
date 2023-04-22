import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TVShowDetails from "./components/TVShowDetails";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/showdetails/:id">
          <TVShowDetails key="1" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;