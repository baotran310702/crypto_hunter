import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    width: '150px',
    textAlign: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    margin: 'auto',
    overflow: 'hidden',
    objectFit: 'cover',
  },
}));
