import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import authContext from "./authContext";

function App() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // upon loading, call API to get a list of all companies
  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    getCompanies();
  }, []);

  // upon loading, call API to get a list of all jobs
  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

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
    let token = await JoblyApi.getToken(data);
    console.log(token);
    setCurrentUser({ username: data.username });
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    setToken(token);
  }

  // function to handle user logout. Clear token from storage
  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  // function to handle new user signup
  async function signup(data) {
    let token = await JoblyApi.signup(data);
    setCurrentUser({ username: data.username });
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    setToken(token);
  }

  // edit a user's username, firstname, lastname or email
  async function edit(data, userName) {
    let user = await JoblyApi.edit(data, userName, token);
    if (user) {
      setCurrentUser(user);
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
            <Routes
              login={login}
              signup={signup}
              setCurrentUser={setCurrentUser}
              companies={companies}
              jobs={jobs}
              edit={edit}
              apply={apply}
            />
          </UserContext.Provider>
        </authContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
