import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    message: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, message: "" });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };
  render() {
    const { authError } = this.props;
    const { auth } = this.props;

    if (auth.isLoggedIn) return <Redirect to="/" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Log in</h5>
          <div className="input-field">
            <label htmlFor="userName">User Name</label>
            <input id="userName" type="text" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn light-blue darken-4 z-depth-0">Login</button>
            <div className="red-text center"> 
              {authError ? <p>{authError}</p> : null} 
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: loginUser => dispatch(login(loginUser))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
