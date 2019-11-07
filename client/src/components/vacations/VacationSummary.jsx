import React, { Component } from "react";
import Modal from "../layout/Modal";
import { followVacation } from "../../store/actions/vacationActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

class VacationSummary extends Component {
  handleFollow = e => {
    let followObj = {
      id: e.target.value,
      follow: e.target.checked,
      user_id: this.props.auth.currentUser.id
    };
    this.props.followVacation(followObj);
    this.props.history.push("/login");
  };
  render() {
    const { auth } = this.props;

    return (
      <div className="col s12 m6 l4">
        <div className="card z-depth-0 vacSummary z-depth-2">
          <div className="card-content grey-text text-darken-3">
            <div className="row">
              <div className="col s12 m6 l3">
                <span className="card-title myTitle">
                  {this.props.vacation.destination}
                </span>
              </div>
              <div className="col s12 m4 offset-m2">
                {auth.currentUser.role === 1 && (
                  <div className="row">
                    <div className="col s12 m6 l3" id="modal-heaed-div">
                      <div className="col-content modalDiv ">
                        <Modal
                          modalType="edit"
                          vacation={this.props.vacation}
                        />
                      </div>
                      <div className="col-content modalDiv "></div>
                      <Modal
                        modalType="delete"
                        vacation={this.props.vacation}
                      />
                    </div>
                  </div>
                )}
                {auth.currentUser.role === 2 && (
                  <div className="col s12 m1 offset-m5">
                    {this.props.checked ? (
                      <div className="switch mySwitch">
                        <label>
                          Follow
                          <input
                            type="checkbox"
                            value={this.props.vacation.id}
                            onChange={this.handleFollow}
                            checked
                          />
                          <span
                            className="lever"
                            data-tip="Click here to unfollow"
                            data-place="right"
                            data-type="info"
                          ></span>
                          Unfollow
                        </label>
                      </div>
                    ) : (
                      <div className="switch mySwitch">
                        <label>
                          Follow
                          <input
                            type="checkbox"
                            value={this.props.vacation.id}
                            onChange={this.handleFollow}
                          />
                          <span
                            className="lever"
                            data-tip="Click here to follow"
                            data-place="right"
                            data-type="info"
                          ></span>
                          Unfollow
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="card-image">
              <img
                src={this.props.vacation.picture}
                data-caption="A picture"
                alt=""
              />
              <span className="card-title">
                {this.props.vacation.destination}
              </span>
            </div>
            <br />
            <p>{this.props.vacation.description}</p>

            <p className="myPrice">Price is: {this.props.vacation.price}</p>
            <p className="grey-text ">
              <span className="myDates">From: </span>
              {this.props.vacation.date_from}
            </p>
            <p className="grey-text ">
              <span className="myDates">To: </span>
              {this.props.vacation.date_to}
            </p>
            <p>
              Number of followers:{"                "}
              <span className="btn btn-floating light-blue darken-4 right-align myFollow z-depth-5">
                {this.props.vacation.followers}
              </span>
            </p>
          </div>
        </div>
        <ReactTooltip />
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
    followVacation: followObj => dispatch(followVacation(followObj))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VacationSummary)
);
