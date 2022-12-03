import { TradingViewStockChartWidget } from 'react-tradingview-components';

function CoinInfor({ idChart }) {
  console.log(idChart);
  return (
    <div className="wrapper">
      <TradingViewStockChartWidget symbol={idChart} theme="Dark" range="60m" style={1}></TradingViewStockChartWidget>
    </div>
  );
}

export default CoinInfor;
