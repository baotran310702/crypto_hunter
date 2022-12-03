import { useEffect, useState } from 'react';
import { TrendingCoins } from '../../apis/apis';
import { useStyles } from '../Carousel/styles';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Carousel() {
  const classes = useStyles();
  const [coins, setCoins] = useState();
  const fetchTredingCoins = async () => {
    const data = await TrendingCoins('usd');
    setCoins(data.data);
  };

  useEffect(() => {
    fetchTredingCoins();
  }, []);
  const handleDragStart = (e) => e.preventDefault();

  const responsive = {
    0: { items: 4 },
    568: { items: 6 },
    1024: { items: 8 },
  };

  //console.log(coins);

  const items =
    typeof coins == 'object'
      ? coins.map((coin) => {
          let profit = coin?.price_change_percentage_24h >= 0;
          return (
            <Link className={classes.item} to={`/coin/id=${coin.id}`}>
              <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
                onDragStart={handleDragStart}
              ></img>
              <span>
                {coin?.symbol}
                &nbsp;
                <span
                  style={{
                    color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                    fontWeight: 500,
                  }}
                >
                  {profit && '+'}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </span>
              <span style={{ fontSize: 22, fontWeight: 500 }}>
                {coin.symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
              </span>
            </Link>
          );
        })
      : [];

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1}
        animationDuration={500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      ></AliceCarousel>
    </div>
  );
}

export default Carousel;
