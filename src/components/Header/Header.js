import {
  AppBar,
  ThemeProvider,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
} from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

function Header() {
  const [currency, setCurrency] = useState('');
  const handleChange = (e) => {
    setCurrency(e.target.value);
  };
  const classes = useStyles();

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
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Link className={classes.nav} to="/">
              <Typography className={classes.title}>Crypto Uptrendy</Typography>
            </Link>
            <Select
              variant="outlined"
              value={currency}
              onChange={handleChange}
              displayEmpty
              className={classes.selectItem}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled selected={true}>
                Currency
              </MenuItem>
              <MenuItem value="VND">VND</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
