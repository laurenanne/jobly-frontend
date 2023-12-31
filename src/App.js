import React, { useEffect, useState } from "react";
import Routes from "./routes-nav/Routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import JoblyApi from "./JoblyApi";
import UserContext from "./auth/UserContext";
import authContext from "./auth/authContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // each time there is a new token, get the current User information and save
  useEffect(() => {
    async function getUser() {
      let user = await JoblyApi.getCurrentUser(currentUser.username);
      setCurrentUser(user);
    }
    getUser();
  }, [token]);

  // function to handle login and set and save token to local storage
  async function login(data) {
    try {
      let token = await JoblyApi.getToken(data);
      setCurrentUser({ username: data.username });
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  // function to handle user logout. Clear token from storage
  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  // function to handle new user signup
  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setCurrentUser({ username: data.username });
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  // edit a user's username, firstname, lastname or email
  async function edit(data, userName) {
    try {
      let user = await JoblyApi.edit(data, userName, token);
      setCurrentUser(user);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  // handles user applying to a job
  async function apply(id) {
    let username = currentUser.username;
    let res = await JoblyApi.apply(username, id);
    if (res) {
      let user = await JoblyApi.getCurrentUser(currentUser.username);
      setCurrentUser(user);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <authContext.Provider value={{ isLoggedIn }}>
          <UserContext.Provider value={{ currentUser }}>
            <NavBar logout={logout} />
            <Routes login={login} signup={signup} edit={edit} apply={apply} />
          </UserContext.Provider>
        </authContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
