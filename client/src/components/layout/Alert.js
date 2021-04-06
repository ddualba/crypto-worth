import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// import './Alert.scss';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => {
    switch (alert.alertType) {
      case 'success':
        return <div key={alert.id}>{toast.success(alert.msg)}</div>;
      case 'danger':
        return <div key={alert.id}>{toast.error(alert.msg)}</div>;
      case 'warn':
        return <div key={alert.id}>{toast.warn(alert.msg)}</div>;
      case 'info':
        return <div key={alert.id}>{toast.info(alert.msg)}</div>;
      default:
        return <div key={alert.id}>{toast(alert.msg)}</div>;
    }
  });

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
