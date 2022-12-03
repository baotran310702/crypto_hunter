//API from coin gecko
import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.coingecko.com/api/v3/' });

export const CoinList = (currency) =>
  API.get(`coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);

export const SingleCoin = (id) => API.get(`coins/${id}`);

export const HistoricalChart = (id, days = 365, currency) =>
  API.get(`coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);

export const TrendingCoins = (currency) =>
  API.get(
    `coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
  );
