import React from "react";
import TabsHeader from "../tabsHeader";
import ChartsPartner from "./chartspartner";
import AveragePartner from "./AveragePartner";
import OmsetPartner from "./omsetpartner";
import KontribusiPartner from "./kontribusipartner";
import KontribusiPartnerQty from "./kontribusipartnerqty";
import SalesOmset from "./salesomset";

export default function PartnerIndex({ dataChart, setUpdate }) {
  return (
    <div
      className='tab-pane fade'
      id='custom-tabs-four-partner'
      role='tabpanel'
      aria-labelledby='custom-tabs-four-partner-tab'>
      <TabsHeader
        titleCard1={"OMSET PARTNER SAMPAI"}
        bodyCard1={dataChart ? dataChart.lastpartner[0].toDay : null}
        titleCard2={"PERKIRAAN OMSET PARTNER AKHIR BULAN FEBRUARI"}
        bodyCard2={dataChart ? dataChart.lastpartner[0].Mounth : null}
        titleCard3={"SELISIH KUMULATIF TARGET & OMSET (JAN-DES)"}
        bodyCard3={dataChart ? dataChart.lastpartner[0].Kumulatif : null}
        titleCard4={"KEKURANGAN TARGET PARTNER TAHUN 2022"}
        bodyCard4={dataChart ? dataChart.lastpartner[0].Kekurangan : null}
      />
      <ChartsPartner
        dataChart={dataChart ? dataChart.toppartner : null}
        setUpdate={setUpdate}
      />
      <AveragePartner
        dataChart={dataChart ? dataChart.revenuepartner : null}
        setUpdate={setUpdate}
      />
      <OmsetPartner
        dataChart={dataChart ? dataChart.omsetchannelpartner : null}
        setUpdate={setUpdate}
      />
      <KontribusiPartner
        dataChart={dataChart ? dataChart.kontribusichannelpartner : null}
        setUpdate={setUpdate}
      />
      <KontribusiPartnerQty
        dataChart={dataChart ? dataChart.kontribusipartnerqty : null}
        setUpdate={setUpdate}
      />
      <SalesOmset dataChart={null} />
    </div>
  );
}
