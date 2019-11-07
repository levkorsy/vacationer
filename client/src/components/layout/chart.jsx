import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { getChartData } from "../../store/actions/vacationActions";
import { Redirect } from "react-router-dom";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  }

  componentDidMount() {
    this.props.getChartData(); // Getting data for chart
  }

  render() {
    const { auth, chartData } = this.props;

    if (!auth.isLoggedIn) return <Redirect to="/login" />;

    return (
      <div className="container mt-3">
        <Bar data={chartData} options={this.state.options} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    chartData: state.vac.chartData,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChartData: () => dispatch(getChartData())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
