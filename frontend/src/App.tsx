import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeesList from './components/EmployeesList';
import PayrollList from './components/PayrollList';
import AttendanceForm from './components/AttendanceForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/employees" component={EmployeesList} />
        <Route path="/payroll" component={PayrollList} />
        <Route path="/attendance" component={AttendanceForm} />
        <Route path="/" component={Login} /> {/* Default route */}
      </Switch>
    </Router>
  );
};

export default App;