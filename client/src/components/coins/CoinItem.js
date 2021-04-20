import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { setCurrentCoin } from '../../actions/coin';

const CoinItem = ({
  id,
  coin: { symbol, name, exchange, quantity },
  openDeleteModal,
  setDeleteItem,
  openUpdateModal,
  setUpdateItem,
  setCurrentCoin,
  findEditInfo
}) => {
  const confirmDelete = () => {
    setDeleteItem(id);
    openDeleteModal();
  };

  const testEdit = () => {
    findEditInfo(id);
  };

  const confirmEdit = () => {
    // setUpdateItem(currentCoin);
    // console.log('id present before call: ' + _id);
    // navigate to edit-form
    // setCurrentCoin(_id);
    // openUpdateModal();
  };
  return (
    <tr key={id}>
      <td>
        <button className='btn btn-danger btn-small' onClick={confirmDelete}>
          Delete
        </button>
        {/* <button className='btn btn-primary btn-small' onClick={confirmEdit}> */}

        <button className='btn btn-primary btn-small' onClick={testEdit}>
          Test Edit
        </button>

        {/* <Link to={`/edit-coin/${id}`}>
          <button className='btn btn-primary btn-small'>Edit</button>
        </Link> */}
      </td>
      <td>{symbol}</td>
      <td>{name}</td>
      <td>{exchange}</td>
      <td>{quantity}</td>
    </tr>
  );
};

// export default connect(null, { setCurrentCoin })(CoinItem);
export default CoinItem;
