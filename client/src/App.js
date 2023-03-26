import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";

import { PolybaseProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";

import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Staking from "./pages/Staking";
import AvailableGames from "./pages/AvailableGames";
import YourProfile from "./pages/YourProfile";
import YourFriends from "./pages/YourFriends";

const db = new Polybase({
  defaultNamespace:
    "pk/0x4962f0efb35f25decf76908dc15b02ed0c5b9f46722c8aa78efb0e4afbaf196bc9eb555ab9b1b6144400c38252f10c58ff61769a09d66dcb84416db7f2c37630/0xUNO",
});

const App = () => {
  return (
    <PolybaseProvider polybase={db}>
      <Switch>
        {/* ... your app routes */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/play" component={Game} />
        <Route exact path="/stake" component={Staking} />
        <Route exact path="/profile/:address" component={YourProfile} />
        <Route exact path="/friends/:address" component={YourFriends} />
        <Route exact path="/games" component={AvailableGames} />
      </Switch>
    </PolybaseProvider>
  );
};

export default App;
