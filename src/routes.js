import React from "react";
import { BrowserRouter, Route, Switch, /*Redirect*/ } from "react-router-dom";

//import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
//import Home from "./pages/Home";

//import { isAuthenticated } from "./services/adonis/auth.js";

/*
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
*/

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      {/*<Route path="/signup" component={SignUp} />*/}
      {/*<PrivateRoute path="/home" component={Home} />*/}
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;