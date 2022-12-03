import { makeStyles } from '@material-ui/core';
import banner from '../../assets/banner2.jpg';

export const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: `url(${banner})`,
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));
