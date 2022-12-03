import {
  Container,
  createTheme,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  Button,
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from 'react';
import { CoinList } from '../../apis/apis';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { GetHigherMACoins } from '../../utils/handleData';
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [symbol, setSymbol] = useState('$');
  const classes = useStyles();

  const navigate = useNavigate();
  const fetchCoins = async () => {
    setLoading(true);
    const data = await CoinList('usd');
    setCoins(data.data);
    setLoading(false);
  };

  const handleSearch = () => {
    //console.log(coins);
    return coins.filter(
      (coin) => coin.name.toLowerCase().includes(searchInput) || coin.symbol.toLowerCase().includes(searchInput),
    );
  };
  let newListCoins = [];
  const handleMA = () => {
    console.log(coins);
    const higherMACoin = GetHigherMACoins(coins);

    for (let i = 0; i < higherMACoin.length; i++) {
      newListCoins.push(coins[higherMACoin[i]]);
    }
    setCoins(newListCoins);
    console.log(newListCoins);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Crytocurrency Prices by Coingecko
        </Typography>
        <TextField
          label="Search for a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: '50%' }}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Type MA values..."
          variant="outlined"
          type="number"
          style={{ marginBottom: 20, width: '18%' }}
        />
        <TextField
          className={classes.input}
          label="Type MA values..."
          variant="outlined"
          type="number"
          style={{ marginBottom: 20, width: '18%' }}
        />
        <Button variant="contained" className={classes.button} onClick={handleMA}>
          Search
        </Button>

        <TableContainer comnponent={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'MarketCap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow onClick={() => navigate(`/coin/id=${row.id}`)} className={classes.row} key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/*pagination to have next page... ... */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        ></Pagination>
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
