import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

const LoggedInLinks = props => {
  
  return (
    <ul className="right">
      <li>
        <NavLink to="/" className="btn btn-floating blue darken-1">
          {props.currentUser.firstName}
        </NavLink>
      </li>
      <li>
        <Link to="/" onClick={props.logout}>
          Log Out
        </Link>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoggedInLinks);
