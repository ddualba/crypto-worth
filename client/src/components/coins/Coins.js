import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCoins, deleteCoin, updateCoin } from '../../actions/coin';
import { connect } from 'react-redux';
import CoinItem from './CoinItem';
// import Spinner from '../layout/Spinner';
import './Coins.scss';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Coins = ({
  getCoins,
  deleteCoin,
  updateCoin,
  coin: { coins, loading }
}) => {
  useEffect(() => {
    getCoins();
  }, [getCoins]);

  const [deleteItem, setDeleteItem] = useState('');
  const [updateItem, setUpdateItem] = useState({});
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => {
    setDeleteItem('');
    setDeleteModal(false);
  };

  const openUpdateModal = () => setUpdateModal(true);
  const closeUpdateModal = () => {
    setUpdateItem('');
    setUpdateModal(false);
  };

  function confirmDeletion() {
    deleteCoin(deleteItem);
    setDeleteItem('');
    closeDeleteModal();
  }

  function confirmUpdate() {
    alert('run update action creator');
    setUpdateItem('');
    closeUpdateModal();
  }

  function findEditInfo(editId) {
    const myEditCoin = coins.filter(coin => coin._id.toString() === editId);
    console.log(myEditCoin);

    if (myEditCoin.length > 0) {
      alert(
        `found coin: ${myEditCoin[0]._id}
        symbol: ${myEditCoin[0].symbol}
        name: ${myEditCoin[0].name}
        exchange: ${myEditCoin[0].exchange}
        quantity: ${myEditCoin[0].quantity}
        `
      );
    } else {
      alert('didnt find');
    }
    // alert('found coin:);
  }

  return (
    <Fragment>
      <Modal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={showDeleteModal}
        onHide={closeDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Confirm deletion</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure you want to delete? This cannot be undone!</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant='danger' onClick={e => confirmDeletion()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={showUpdateModal}
        onHide={closeUpdateModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Update Coin</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>input fields for update</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='info' onClick={closeUpdateModal}>
            Cancel
          </Button>
          <Button variant='primary' onClick={e => confirmUpdate()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <table className='coin-table'>
        <thead>
          <tr>
            <th>Delete</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Exchange</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <CoinItem
              key={coin._id}
              id={coin._id}
              coin={coin}
              openDeleteModal={openDeleteModal}
              openUpdateModal={openUpdateModal}
              setDeleteItem={setDeleteItem}
              setUpdateItem={setUpdateItem}
              findEditInfo={findEditInfo}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

Coins.propTypes = {
  getCoins: PropTypes.func.isRequired,
  deleteCoin: PropTypes.func.isRequired,
  updateCoin: PropTypes.func.isRequired,
  coin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coin: state.coin
});

export default connect(mapStateToProps, { getCoins, deleteCoin, updateCoin })(
  Coins
);
