import { HistoricalChart } from '../apis/apis';

export const GetHigherMACoins = (listCoins, MA20 = 20, MA100 = 100) => {
  const fetchHistoryCoins = () => {
    //console.log('fetching data...');
    let marketPrice = [];
    const getHistoryCoins = async () => {
      const d = new Date();
      let thisTime = d.getDate();
      if (!JSON.parse(localStorage.getItem('dateUpdate'))) {
        //console.log('condittion1 ');
        if (JSON.parse(localStorage.getItem('dateUpdate') != thisTime)) {
          clearLocal();
          //console.log('condittion2 ');

          for (let i = 0; i < 100; i++) {
            setTimeout(async () => {
              const price = await HistoricalChart(listCoins[i].id, 365, 'usd');
              localStorage.setItem(listCoins[i].id, JSON.stringify(price.data));
              marketPrice.push(price.data);
            }, 2000);
          }
          localStorage.setItem('dateUpdate', thisTime);
        }
      } else {
        //console.log('condittion3 ');
        marketPrice = getLocalStorage();
      }
    };

    getHistoryCoins();
    //console.log('after loop data:', marketPrice);
    return marketPrice;
  };

  const showHistoryCoins = () => {
    //console.log('passs');
  };

  const fetchCoinsMA = () => {
    const dataLocal = fetchHistoryCoins();
    //console.log(dataLocal[0]);
    let resultData = [];
    for (let i = 0; i < 100; i++) {
      //console.log(dataLocal[i]);
      if (CalculateMA(dataLocal[i], MA20) && CalculateMA(dataLocal[i], MA100)) {
        resultData.push(i);
      }
    }
    //console.log(resultData);
    return resultData;
  };

  const CalculateMA = (historyPrice, MA) => {
    try {
      let sum = 0;
      if (MA > historyPrice.prices.length) {
        MA = historyPrice.prices.length;
      }
      //console.log(i);
      //console.log(historyPrice.prices[historyPrice.prices.length - 1][1]);
      for (let i = 1; i <= MA; i++) {
        sum += historyPrice.prices[historyPrice.prices.length - i][1];
      }
      console.log('AVG: ', parseFloat(sum / MA).toFixed(3));
      console.log('Last price', historyPrice.prices[historyPrice.prices.length - 1][1]);
      return parseFloat(sum / MA).toFixed(3) < historyPrice.prices[historyPrice.prices.length - 1][1];
    } catch (error) {
      console.log(error);
    }
  };

  function clearLocal() {
    localStorage.clear();
    //alert('Data cleared');
    getLocalStorage();
  }

  const getLocalStorage = () => {
    let marketLocal = [];
    for (let i = 0; i < 100; i++) {
      const data = JSON.parse(localStorage.getItem(listCoins[i].id));

      marketLocal.push(data);
    }

    //console.log('data local:', marketLocal);
    return marketLocal;
  };

  fetchCoinsMA();
  ////console.log(listCoins);
  return fetchCoinsMA();
};
