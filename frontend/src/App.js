import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BusinessForm from "./components/BusinessForm";
import Business from "./components/Business";
import Businesses from "./components/Businesses";
import EditBusiness from "./components/EditBusiness";
import Query from "./components/Query";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/businesses" exact>
            <Businesses />
          </Route>
          <Route path='/businesses/new'>
            <BusinessForm />
          </Route>
          <Route path="/businesses/:businessId" exact>
            <Business />
          </Route>
          <Route path="/businesses/:businessId/edit">
            <EditBusiness />
          </Route>
          <Route path="/search/:query" exact>
            <Query />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
