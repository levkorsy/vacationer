import authReducer from "./authReducer";
import vacReducer from "./vacReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  vac: vacReducer
});

export default rootReducer;
