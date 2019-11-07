import React, { Component } from "react";
import AllVacations from "./allVacations";
import { connect } from "react-redux";
import { getAllVacations } from "../../store/actions/vacationActions";
import { getChartData } from "../../store/actions/vacationActions";

import { Redirect } from "react-router-dom";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getAllVacations();
    if (this.props.auth.currentUser !== null) {
      if (this.props.auth.currentUser.role === 1) {
        this.props.getChartData(); // Getting data for chart
      }
    }
  }
  render() {
    const { vacations, auth, followVacations } = this.props;
    const isChecked = true;
    const notChecked = false;

    if (!auth.isLoggedIn) return <Redirect to="/login" />;

    return (
      <div className="dashboard container">
        {auth.currentUser.role === 2 && (
          <div className="row">
            <h6 className="sectionHeader">YOUR FAVORITE VACATIONS</h6>
            <AllVacations vacations={followVacations} checked={isChecked} />
          </div>
        )}
        <div className="row">
          <h6 className="sectionHeader">ALL VACATIONS</h6>
          <AllVacations vacations={vacations} checked={notChecked} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacations: state.vac.vacations,
    followVacations: state.vac.followVacations,
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllVacations: () => dispatch(getAllVacations()),
    getChartData: () => dispatch(getChartData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
