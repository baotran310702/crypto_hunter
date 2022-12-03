import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  selectItem: {
    cursor: 'pointer',
    width: 115,
    height: 40,
    marginLeft: 15,
    marginTop: theme.spacing(0),
  },
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '24px',
  },
  nav: {
    flex: 1,
  },
}));
