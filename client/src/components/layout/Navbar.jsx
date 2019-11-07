import React from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import LoggedInLinksAdmin from "./LoggedInLinksAdmin";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth } = props;
  
  var links;
  if (auth.isLoggedIn) {
    if (auth.currentUser != null) {
      if (auth.currentUser.role === 1) {
        links = <LoggedInLinksAdmin currentUser={auth.currentUser} />;
      } else {
        links = <LoggedInLinks currentUser={auth.currentUser} />;
      }
    } else {
      links = <LoggedOutLinks />;
    }
  } else {
    links = <LoggedOutLinks />;
  }

  return (
    <nav className="nav-wrapper light-blue darken-4">
      <div className="container">
        <Link to="/" className="brand-logo">
          Vacations
        </Link>
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(Navbar);
