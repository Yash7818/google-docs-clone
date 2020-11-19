import React from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import DocEditor from "./Editor/DocEditor"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={DocEditor}></Route>
      </Switch>
    </Router>
  )
}
export default App;
