import React from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import DocEditor from "./Editor/DocEditor";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Switch>
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/editor" exact={true} component={DocEditor}></Route>
      </Switch>
    </Router>
  )
}
export default App;
