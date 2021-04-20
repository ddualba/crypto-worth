import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from 'components/layout/Landing';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from 'components/Dashboard';
import SupportedCoins from 'components/SupportedCoins';
import AddCoin from 'components/coins/CoinForm';
import EditCoin from 'components/coins/CoinEdit';

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
        <Route exact path='/coins' component={SupportedCoins} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/add-coin' component={AddCoin} />
        <PrivateRoute exact path='/edit-coin/:coinId' component={EditCoin} />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </main>
  );
};

export default Routes;
