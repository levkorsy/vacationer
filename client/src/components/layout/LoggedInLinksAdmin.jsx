import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

const LoggedInLinksAdmin = props => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/" className="btn btn-floating blue darken-1">
          ADM
        </NavLink>
      </li>
      <li>
        <Link to="/" onClick={props.logout}>
          Log Out
        </Link>
      </li>
      <li>
        <NavLink to="/addnew">Add</NavLink>
      </li>
      <li>
        <NavLink to="/chart">Chart Vacations</NavLink>
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
)(LoggedInLinksAdmin);
