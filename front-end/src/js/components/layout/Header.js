import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const Header = props => {
  const { user, handleLogout } = props;
  console.log(props)

  const handleLogoutClick = () =>{
    handleLogout();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Link className="navbar-brand" to="/dashboard">
        Dashboard
      </Link>
      <Nav className="mr-auto" />
      <Nav>
        <div className="right-navigation">
          <h3>Name: {_.isEmpty(user) ? '' : user.user_name}</h3>
          {user ? 
            <button onClick={handleLogoutClick}>Logout</button> :
            "Login"}
        </div>
      </Nav>
    </Navbar>
  );
};

export default Header;
