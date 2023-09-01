import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import authContext from "../auth/authContext";
import UserContext from "../auth/UserContext";

function Home() {
  const isLoggedIn = useContext(authContext).isLoggedIn;
  const user = useContext(UserContext).currentUser;

  // if user is logged in shows Welcome Back screen
  // shows login or signup when user is not logged in
  return (
    <section className="home">
      <div className="container text-center">
        <h1 className="font-weight-bold mb-3">Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {isLoggedIn ? (
          <p className="welcome">Welcome Back, {user.username}!</p>
        ) : (
          <p>
            <Link to="/login">
              <button className="btn btn-light col-sm-3 m-1">LogIn</button>
            </Link>
            <Link to="signup">
              <button className="btn btn-light col-sm-3 m-1">SignUp</button>
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default Home;
