import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import AvailableGames from "./pages/AvailableGames";
const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/play" component={Game} />
      <Route exact path="/games" component={AvailableGames} />
    </Switch>
  );
};

export default App;
