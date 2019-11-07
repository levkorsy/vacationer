import axios from "axios";
import { getToken } from "../../services/token";

export const addVacation = (vacation, data) => {
  return (dispatch, getState) => {
    axios({
      method: "post",
      url: "/vacations/new",
      params: vacation,
      data: data,
      headers: {
        Authorization: getToken(),

        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      json: true
    })
      .then(() => {
        dispatch({ type: "ADD_VACATION", vacation });
      })
      .catch(error => {
        dispatch({ type: "ADD_VACATION_ERROR", error });
      });
  };
};

export const getAllVacations = () => {
  return (dispatch, getState) => {
    axios
      .get("/vacations", {
        headers: { Authorization: getToken() }
      })
      .then(response => {
        // Separate folowed and unfollowed
        let follow_vac_id = response.data.rowsFoll.map(a => a.vacation_id);
        var followVacations = [];
        var allVacations = response.data.rows;
        for (let i = 0; i < follow_vac_id.length; i++) {
          for (let j = 0; j < allVacations.length; j++) {
            if (follow_vac_id[i] === allVacations[j].id) {
              followVacations.push(allVacations[j]);
              allVacations.splice(j, 1);
            }
          }
        }
        dispatch({ type: "GET_ALL_VACATIONS", allVacations, followVacations });
      })
      .catch(error => {
        dispatch({ type: "GET_ALL_VACATIONS_ERROR", error });
      });
  };
};

export const delVacation = id => {
  return (dispatch, getState) => {
    axios
      .delete(`/vacations/${id}`, {
        headers: { Authorization: getToken() },

        body: { id: id }
      })
      .then(() => {
        dispatch({ type: "DEL_VACATION" });
      })
      .catch(error => {
        dispatch({ type: "DEL_VACATION_ERROR", error });
      });
  };
};

export const editVac = (editVacation, data) => {
  return (dispatch, getState) => {
    axios({
      method: "put",
      url: "/vacations/edit",
      params: editVacation,
      data: data,
      headers: {
        Authorization: getToken(),

        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      json: true
    })
      .then(() => {
        dispatch({ type: "EDIT_VACATION", editVacation });
      })
      .catch(error => {
        dispatch({ type: "EDIT_VACATION_ERROR", error });
      });
  };
};

export const followVacation = followObj => {
  return (dispatch, getState) => {
    axios({
      method: "put",
      url: "/vacations/follow",
      params: followObj,
      headers: {
        Authorization: getToken(),

        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
      },
      json: true
    })
      .then(() => {
        dispatch({ type: "FOLLOW_VACATION" });
      })
      .catch(error => {
        dispatch({ type: "FOLLOW_VACATION_ERROR", error });
      });
  };
};

export const getChartData = () => {
  return (dispatch, getState) => {
    axios
      .get("/vacations/chart/", {
        headers: { Authorization: getToken() }
      })
      .then(response => {
        let labels = [];
        let data = [];
        response.data.result.map(item => {
          // Separate data and labels
          return labels.push(item.destination);
        });
        response.data.result.map(item => {
          return data.push(item.followers);
        });

        dispatch({ type: "GET_CHART_DATA", labels, data });
      })
      .catch(error => {
        // handle error
        dispatch({ type: "GET_CHART_DATA", error });
      });
  };
};
