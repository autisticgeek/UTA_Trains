
import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
//import UTAFrontrunner from "./images/UTA-Frontrunner.png";
//import UTAtrax from "./images/UTA-Trax.png";

import Frontrunner from "./Frontrunner";
import Blue from "./Blue";
import Red from "./Red";
import Green from "./Green";
import All from "./All";

function App(props) {
    return (
        <div>
            <nav className="flex-around">
                <Link to="/fr">Frontrunner</Link>
                <Link to="/blue">Blue Line</Link>
                <Link to="/red">Red Line</Link>
                <Link to="/green">Green Line</Link>
            </nav>
            <Switch>
                <Route path="/fr" component={Frontrunner} />
                <Route path="/blue" component={Blue} />
                <Route path="/red" component={Red} />
                <Route path="/green" component={Green} />
                <Route exact path="/" component={All} />

            </Switch>
        </div>
    )
}

export default App;