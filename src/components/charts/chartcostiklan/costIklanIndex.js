import React from "react";
import ConstIklan from "./constiklan";
import BiayaInternal from "./biaya";
import PerbandinganBiaya from "./perbandinganbiaya";

function CostIklanIndex({ dataChart, setUpdate }) {
  return (
    <div
      className='tab-pane fade'
      id='custom-tabs-four-costiklan'
      role='tabpanel'
      aria-labelledby='custom-tabs-four-costiklan-tab'>
      <ConstIklan
        dataChart={dataChart ? dataChart.sales : null}
        setUpdate={setUpdate}
      />
      <BiayaInternal
        dataChart={dataChart ? dataChart.sales : null}
        setUpdate={setUpdate}
      />
      <PerbandinganBiaya
        dataChart={dataChart ? dataChart.sales : null}
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default CostIklanIndex;
