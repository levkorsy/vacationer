import React, { Component } from "react";
import { addVacation } from "../../store/actions/vacationActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AddVacation extends Component {
  state = {
    description: "",
    destination: "",
    file: "",
    date_from: "",
    date_to: "",
    price: "",
    selectedFile: null
  };
  onChangeFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      file: event.target.files[0].name
    });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, message: "" });
  };
  handleSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("YES", "it works");
    data.append("file", this.state.selectedFile);

    this.setState({ data: data });

    this.props.addVacation(this.state, data);
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;

    if (!auth.isLoggedIn) return <Redirect to="/login" />;
    return (
      <div className="container">
        <form
          onSubmit={this.handleSubmit}
          className="white"
          method="post"
          encType="multipart/form-data"
        >
          <h5 className="grey-text text-darken-3">Add new vacation</h5>
          <div className="input-field">
            <label htmlFor="destination">Vacation destination:</label>
            <input
              id="destination"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="description">Descriprion:</label>
            <textarea
              className="materialize-textarea"
              id="description"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="date_from">date_from</label>
            <input
              id="date_from"
              type="date"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="date_to">date_to</label>
            <input
              id="date_to"
              type="date"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="price">price</label>
            <input
              id="price"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="file"></label>
            <div className="file-field input-field">
              <div className="btn">
                <span>Upload</span>
                <input
                  type="file"
                  onChange={this.onChangeFile}
                  accept="image/*"
                  name="file"
                  required
                />
              </div>

              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  type="text"
                  placeholder="Upload file"
                  required
                />
              </div>
            </div>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addVacation: (vaction, data) => dispatch(addVacation(vaction, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVacation);
