import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

const Routes: FC = () => {
  return (
    <Router>
        <Switch>
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/auth/signup">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}

export default Routes;
