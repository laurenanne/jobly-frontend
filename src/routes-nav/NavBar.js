import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import authContext from "../auth/authContext";
import UserContext from "../auth/UserContext";

function NavBar({ logout }) {
  const isLoggedIn = useContext(authContext).isLoggedIn;
  const user = useContext(UserContext).currentUser;

  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        {/* check if a user is logged in before showing the Links for Company, Jobs, Profile, and Logout */}
        {isLoggedIn ? (
          <Nav>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem className="logout">
              <NavLink onClick={logout} to="/">
                LogOut {user.username}
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Signup</NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}

export default NavBar;
