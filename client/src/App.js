import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Header from 'components/layout/Header';
import Landing from 'components/layout/Landing';
// import Home from 'components/Home';
import Routes from 'components/routes/Routes';

import { connect } from 'react-redux';
import { loadUser } from 'actions/auth';
import setAuthToken from 'utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className='container'>
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

export default connect(null, { loadUser })(App);
