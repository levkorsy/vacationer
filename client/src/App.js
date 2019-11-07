import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/vacations/Dashboard";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import AddVacation from "./components/vacations/addVacation";
import Chart from "./components/layout/chart";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/addnew" component={AddVacation} />
          <Route path="/chart" component={Chart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
