import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../../apis/apis';
import { useStyles } from './styles';
import ReactHtmlParser from 'react-html-parser';
import CoinInfor from '../../components/CoinInfor/CoinInfor';

function numberWithCommas(x) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
}

let symbol = '$';
let currency = 'usd';

function Coin() {
  const { id } = useParams();

  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);

  //fetch API coin
  const fetchCoin = async () => {
    const data = await SingleCoin(id);
    setCoin(data.data);
  };

  //fetch coin API when mount component
  useEffect(() => {
    setLoading(true);
    fetchCoin();
    setLoading(false);
  }, []);

  //import styles from styles file
  const classes = useStyles();

  console.log(coin);

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {numberWithCommas(coin?.coingecko_rank)}
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
            </Typography>
          </span>
        </div>
      </div>
      <div className={classes.chart}>
        <CoinInfor idChart={coin ? `${coin.symbol}usdt` : 'btcusdt'} />
      </div>
    </div>
  );
}

export default Coin;
