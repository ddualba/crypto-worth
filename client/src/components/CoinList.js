import React from 'react';

const CoinList = () => {
  const coins = [
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'VET', name: 'VeChain' }
  ];

  return (
    <div>
      {coins.map(coin => (
        <p key={coin.symbol}>
          {coin.symbol} - {coin.name}
        </p>
      ))}
    </div>
  );
};

export default CoinList;
