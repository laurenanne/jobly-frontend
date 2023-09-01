import React from "react";
import Home from "../home/Home";
import { Route, Switch } from "react-router-dom";
import CompanyList from "../company/CompanyList";
import CompanyDetail from "../company/CompanyDetail";
import JobList from "../job/JobList";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import Profile from "../profile/Profile";
import "./Routes.css";
import ProtectedRoutes from "./ProtectedRoutes";

function Routes(props) {
  return (
    <div className="Jobly">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LoginForm login={props.login} />
        </Route>
        <Route path="/signup">
          <SignUpForm signup={props.signup} />
        </Route>

        {/* Protected Routes that can only be accessed once a user is logged in */}
        <ProtectedRoutes exact path="/companies" component={CompanyList} />

        <ProtectedRoutes
          path="/companies/:id"
          component={CompanyDetail}
          apply={props.apply}
        />

        <ProtectedRoutes path="/jobs" component={JobList} apply={props.apply} />

        <ProtectedRoutes
          path="/profile"
          component={Profile}
          edit={props.edit}
        />

        <Route>
          <p className="errMess">Hmmm. I can't seem to find what you want.</p>
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
