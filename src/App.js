import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  // state
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // api using axios and then promise
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      )
      .then(response => {
        setCoins(response.data);
        console.log(response.data);
      }) 
      // error catch
      .catch(error => console.log(error));
  }, []);

  // search
  const handleChange = e => {
    setSearch(e.target.value);
  };

  // to filter coin based on search and convert it to lower case
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Cryptocurrency Tracker</h1>
        <div className="coin-content" >
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search a currency'
          />
        </form>
      </div>
       </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
