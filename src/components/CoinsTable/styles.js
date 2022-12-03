import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: 'Montserrat',
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'gold',
    },
  },
  button: {
    backgroundColor: '#6877e3',
    height: 56,
    width: '10%',
    marginLeft: '16px',
  },
  input: {
    marginLeft: '16px',
  },
}));
