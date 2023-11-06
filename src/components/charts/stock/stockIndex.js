import React from "react";
import Trendstock from "./trendstock";

function StockIndex({ dataChart, setUpdate }) {
  return (
    <div
      className='tab-pane fade'
      id='custom-tabs-four-stock'
      role='tabpanel'
      aria-labelledby='custom-tabs-four-stock-tab'>
      <Trendstock
        dataChart={dataChart ? dataChart.salestotal : null}
        setUpdate={setUpdate}
      />
      <Trendstock
        dataChart={dataChart ? dataChart.salestotal : null}
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default StockIndex;
