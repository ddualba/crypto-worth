import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCoin } from '../../actions/coin';

import './CoinForm.scss';

const CoinFormUpdate = () => {
  return (
    <Fragment>
      <h1>Update coin</h1>
    </Fragment>
  );
};

export default CoinFormUpdate;
