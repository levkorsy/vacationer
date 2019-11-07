const initState = {
  vacations: [],
  followVacations: [],
  chartData: {
    labels: [],
    datasets: [
      {
        label: "Vacation followers",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ]
      }
    ]
  }
};

const vacReducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "ADD_VACATION":
      return state;
    case "ADD_VACATION_ERROR":
      return state;
    case "GET_ALL_VACATIONS":
      newState.vacations = action.allVacations;
      newState.followVacations = action.followVacations;

      return newState;
    case "DEL_VACATION":
      return newState;
    case "DEL_VACATION_ERROR":
      return state;
    case "EDIT_VACATION":
      return state;
    case "EDIT_VACATION_ERROR":
      return state;
    case "FOLLOW_VACATION":
      return newState;
    case "FOLLOW_VACATION_ERROR":
      return state;
    case "GET_CHART_DATA":
      newState.chartData.labels = action.labels;
      newState.chartData.datasets[0].data = action.data;

      return newState;
    case "GET_CHART_DATA_ERROR":
      return state;
    default:
      return state;
  }
};

export default vacReducer;
