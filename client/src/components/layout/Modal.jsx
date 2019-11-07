import React, { Component } from "react";
import { delVacation } from "../../store/actions/vacationActions";
import { editVac } from "../../store/actions/vacationActions";

import { connect } from "react-redux";
import M from "materialize-css";
import ReactTooltip from "react-tooltip";

import "materialize-css/dist/css/materialize.min.css";
import { withRouter } from "react-router-dom";

class Modal extends Component {
  state = {
    description: this.props.vacation.description,
    destination: this.props.vacation.destination,
    picture: this.props.vacation.picture,
    date_from: this.props.vacation.date_from,
    date_to: this.props.vacation.date_to,
    price: this.props.vacation.price,
    id: this.props.vacation.id,
    selectedFile: null
  };
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }
  onChangeFile = event => {
    this.setState({
      picture: event.target.files[0],
      loaded: 0
    });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, message: "" });
  };
  handleDelete = () => {
    let id = this.props.vacation.id;
    this.props.delVacation(id);
    this.props.history.push("/login");
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    this.setState({ data: data });
    this.props.editVac(this.state, data);
    this.props.history.push("/login");
  };
  render() {
    var modalIdDelete = `modal${this.props.vacation.id}`;
    var modalIdEdit = `modal${this.props.vacation.id}2`;
    if (this.props.modalType === "delete") {
      return (
        <div className="flexItem">
          <button
            className=" waves-effect waves-light btn modal-trigger red"
            data-target={modalIdDelete}
            data-tip="Press here to delete"
            data-place="right"
          >
            <i className="material-icons">delete_forever</i>
          </button>

          <div
            ref={Modal => {
              this.Modal = Modal;
            }}
            id={modalIdDelete}
            className="modal"
          >
            <div className="modal-content">
              <h4 className="center">
                Are you shure you whant to delete this vacation?
              </h4>
              <p></p>
            </div>
            <div className="modal-footer">
              <button className="modal-close waves-effect waves-red btn-flat">
                Disagree
              </button>
              <button
                className="modal-close waves-effect waves-green btn-flat"
                onClick={this.handleDelete}
              >
                Agree
              </button>
            </div>
          </div>
        </div>
      );
    } else if (this.props.modalType === "edit") {
      return (
        <div className="flexItem">
          <button
            data-tip="Press here to edit vacation"
            data-place="left"
            className="waves-effect waves-light btn modal-trigger tooltipped"
            data-target={modalIdEdit}
          >
            <i className="material-icons">edit</i>
          </button>

          <div
            ref={Modal => {
              this.Modal = Modal;
            }}
            id={modalIdEdit}
            className="modal"
          >
            <div className="modal-content">
              <form
                onSubmit={this.handleSubmit}
                className="white"
                method="post"
                encType="multipart/form-data"
              >
                <h5 className="grey-text text-darken-3">Edit vacation</h5>
                <div className="input-field">
                  <label htmlFor="destination" className="active">
                    Vacation destination
                  </label>
                  <input
                    id="destination"
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={this.props.vacation.destination}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="description" className="active">
                    Descriprion:
                  </label>
                  <textarea
                    className="materialize-textarea"
                    id="description"
                    onChange={this.handleChange}
                    defaultValue={this.props.vacation.description}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="date_from" className="active">
                    date_from
                  </label>
                  <input
                    id="date_from"
                    type="date"
                    onChange={this.handleChange}
                    defaultValue={this.props.vacation.date_from}
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="date_to" className="active">
                    date_to
                  </label>
                  <input
                    id="date_to"
                    type="date"
                    onChange={this.handleChange}
                    defaultValue={this.props.vacation.date_to}
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="price" className="active">
                    price
                  </label>
                  <input
                    id="price"
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={this.props.vacation.price}
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="file"></label>
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>Upload</span>
                      <input
                        type="file"
                        name="file"
                        onChange={this.onChangeFile}
                        defaultValue={this.props.vacation.file}
                      />
                    </div>

                    <div className="file-path-wrapper">
                      <input
                        className="file-path validate"
                        type="text"
                        placeholder="Upload file"
                        defaultValue={this.props.vacation.file}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <a
                    href="/#"
                    className="modal-close waves-effect waves-red btn-flat"
                  >
                    Disagree
                  </a>
                  <button className="modal-close waves-effect waves-green btn-flat">
                    Edit
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
          <ReactTooltip />
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delVacation: id => dispatch(delVacation(id)),
    editVac: (editVacation, data) => dispatch(editVac(editVacation, data))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Modal)
);
