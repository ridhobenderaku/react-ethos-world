import TabsHeader from "../tabsHeader";
import CrmInternal from "./crminternal";
import DetailRataQty from "./detailrataqty";
import KontribusiOmset from "./kontribusiomset";
import KontribusiSalesChanel from "./kontribusisales";
import OmsetAkusisi from "./omsetakusisi";
import OmsetAkusisiInternal from "./omsetakusisiinternal";
import OmsetchannelAkusisi from "./omsetchanelakusisi";
import OmsetCrmChannel from "./omsetcrmchannel";
import OmsetInternal from "./omsetinternal";
import OmsetMPperplatformInternal from "./omsetmpperplatform";
import PencapaianAkusisi from "./pencapaianakusisi";
import PencapaianCrm from "./pencapaiancrm";
import PencapaianMp from "./pencapaianmp";
import PencapaianMpAkusisi from "./pencapaianmpakusisi";
import SalesInternalBySku from "./salesinternalbysku";
import Totalrevenueinternal from "./totalrevenueinternal";

function InternalIndex({ dataChart, setUpdate }) {
  return (
    <div
      className='tab-pane fade'
      id='custom-tabs-four-internal'
      role='tabpanel'
      aria-labelledby='custom-tabs-four-internal-tab'>
      <TabsHeader
        titleCard1={"OMSET INTERNAL SAMPAI"}
        bodyCard1={dataChart ? dataChart.lastinternal[0].toDay : null}
        titleCard2={"PERKIRAAN OMSET INTERNAL AKHIR BULAN FEBRUARI"}
        bodyCard2={dataChart ? dataChart.lastinternal[0].Mounth : null}
        titleCard3={"SELISIH KUMULATIF TARGET & OMSET (JAN-MAR)"}
        bodyCard3={dataChart ? dataChart.lastinternal[0].Kumulatif : null}
        titleCard4={"KEKURANGAN TARGET INTERNAL TAHUN 2022"}
        bodyCard4={dataChart ? dataChart.lastinternal[0].Kekurangan : null}
      />
      <Totalrevenueinternal
        dataChart={dataChart ? dataChart.totalrevenue : null}
        setUpdate={setUpdate}
      />
      <OmsetInternal
        dataChart={dataChart ? dataChart.internalperchannel : null}
        setUpdate={setUpdate}
      />
      <KontribusiOmset
        dataChart={dataChart ? dataChart.kontribusiperchannel : null}
        setUpdate={setUpdate}
      />
      <PencapaianAkusisi
        dataChart={dataChart ? dataChart.akuisisiinternal : null}
        setUpdate={setUpdate}
      />
      <PencapaianCrm
        dataChart={dataChart ? dataChart.crminternalomset : null}
        setUpdate={setUpdate}
      />
      <CrmInternal
        dataChart={dataChart ? dataChart.crminternalakuisisi : null}
        setUpdate={setUpdate}
      />
      <PencapaianMp
        dataChart={dataChart ? dataChart.pencampaianmpomset : null}
        setUpdate={setUpdate}
      />
      <PencapaianMpAkusisi
        dataChart={dataChart ? dataChart.pencapaianmpakuisisi : null}
        setUpdate={setUpdate}
      />
      <SalesInternalBySku
        dataChart={dataChart ? dataChart.pencapaianmpomset : null}
        setUpdate={setUpdate}
      />
      <DetailRataQty
        dataChart={dataChart ? dataChart.salessku : null}
        setUpdate={setUpdate}
      />
      <OmsetAkusisi
        dataChart={dataChart ? dataChart.salessku : null}
        setUpdate={setUpdate}
      />
      <KontribusiSalesChanel
        dataChart={dataChart ? dataChart.produk : null}
        setUpdate={setUpdate}
      />
      <OmsetchannelAkusisi
        dataChart={dataChart ? dataChart.channelakuisisiproduk : null}
        setUp
        setUpdate={setUpdate}
      />
      <OmsetCrmChannel
        dataChart={dataChart ? dataChart.omsetcrmchannel : null}
        setUp
        setUpdate={setUpdate}
      />

      <OmsetAkusisiInternal
        dataChart={dataChart ? dataChart.salestotal : null}
        setUp
        setUpdate={setUpdate}
      />
      <OmsetMPperplatformInternal
        dataChart={dataChart ? dataChart.omsetmpplatform : null}
        setUp
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default InternalIndex;
