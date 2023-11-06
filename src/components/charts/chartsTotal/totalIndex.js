import React from "react";

import Sales from "./sales";
import SalIntVsPart from "./salIntVsPart";
import KontByOm from "./kontByOm";
import SalesQuanSKU from "./salesQuanSKU";
import PersenSalesSKUQuan from "./persenSalesSKUQuan";
import SalesTotal from "./salesTotal";
import TabsHeader from "../tabsHeader";
import Kontribusiomsetonline from "./kontribusiomset";
import KontByQty from "./kontribusiomsetbyqty";
import Presentasereturn from "./presebtasereturn";

function TotalIndex({ dataChart, setUpdate }) {
  return (
    <div
      className='tab-pane fade show active'
      id='custom-tabs-four-total'
      role='tabpanel'
      aria-labelledby='custom-tabs-four-total-tab'>
      <TabsHeader
        titleCard1={"OMSET SAMPAI LAST UPDATE"}
        bodyCard1={dataChart ? dataChart.lastdata[0].toDay : null}
        titleCard2={"PERKIRAAN OMSET AKHIR BULAN"}
        bodyCard2={dataChart ? dataChart.lastdata[0].Mounth : null}
        titleCard3={"SELISIH KUMULATIF TARGET & OMSET"}
        bodyCard3={dataChart ? dataChart.lastdata[0].Kumulatif : null}
        titleCard4={"KEKURANGAN TARGET "}
        bodyCard4={dataChart ? dataChart.lastdata[0].Kekurangan : null}
      />
      <SalesTotal
        dataChart={dataChart ? dataChart.salestotal : null}
        setUpdate={setUpdate}
      />
      <Kontribusiomsetonline
        dataChart={dataChart ? dataChart.kontribusiomsetonline : null}
        setUpdate={setUpdate}
      />
      <Sales
        dataChart={dataChart ? dataChart.sales : null}
        setUpdate={setUpdate}
      />
      <SalIntVsPart
        dataChart={dataChart ? dataChart.revenueonlinesales : null}
        setUpdate={setUpdate}
      />
      <KontByOm
        dataChart={dataChart ? dataChart.kontribusi : null}
        setUpdate={setUpdate}
      />
      <KontByQty
        dataChart={dataChart ? dataChart.kontribusiqty : null}
        setUpdate={setUpdate}
      />
      <SalesQuanSKU
        dataChart={dataChart ? dataChart.salessku : null}
        setUpdate={setUpdate}
      />
      <PersenSalesSKUQuan
        dataChart={dataChart ? dataChart.produk : null}
        setUpdate={setUpdate}
      />
      <Presentasereturn
        dataChart={dataChart ? dataChart.presentasereturn : null}
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default TotalIndex;
