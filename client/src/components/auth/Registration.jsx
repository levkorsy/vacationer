import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Redirect } from 'react-router-dom'

class Registration extends Component {
  state = {
    lastName: "",
    firstName: "",
    userName: "",
    password: "",
    message: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, message: "" });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.register(this.state)
  };
  render() {
    const { authError } = this.props;

    const { auth } = this.props;

    if (auth.isLoggedIn) return <Redirect to="/"/>;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Registration</h5>
          <div className="input-field">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" type="text" onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" type="text" onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="userName">User Name</label>
            <input id="userName" type="text" onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Register</button>
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
    register: newUser => dispatch(register(newUser))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);