import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from 'components/layout/Landing';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from 'components/Dashboard';
import Coins from 'components/SupportedCoins';

// import NotFound from '../layout/NotFound';
import PrivateRoute from 'components/routes/PrivateRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Routes = () => {
  return (
    <main>
      <Alert />
      <ToastContainer position='top-center' style={{ fontSize: '2rem' }} />
      <Switch>
        <Route exact path='/landing' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/coins' component={Coins} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </main>
  );
};

export default Routes;
