import React, { useEffect, useState, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import getCharts from "../../api/getCharts";
import { UserContext } from "../../context/AuthProvider";
import TabsHeader from "../../components/partnership/tabsheader";
import DailyOmset from "../../components/partnership/charts/omsetpartner";
import OmsetPerChannel from "../../components/partnership/charts/omsetchannel";
import SalesQuanSKU from "../../components/partnership/charts/salesbysku";
import DetailQtySku from "../../components/partnership/charts/detailqtysku";
import Manpower from "../../components/partnership/charts/manpower";
import ManpowerGroup from "../../components/partnership/charts/manpowergroup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const [updateData, setUpdate] = useState();
  const [dataChart, setChart] = useState("");
  const user = useContext(UserContext);
  const [isType, setType] = useState("Total");

  useEffect(() => {
    if (dataChart) {
    }
  }, [dataChart]);

  useEffect(() => {
    if (!sessionStorage.getItem("chart")) {
      // fetch Data ke sesion storage
      getCharts(user.id, 1, 0, "", "", isType).then((data) => {
        sessionStorage.setItem("chart", btoa(JSON.stringify(data)));
        setChart(data);
      });
    } else {
      // perbandingan server dan session storage untuk update data
      getCharts(user.id, 1, 0, "", "", isType).then((data) => {
        if (JSON.stringify(data) !== atob(sessionStorage.getItem("chart"))) {
          sessionStorage.setItem("chart", btoa(JSON.stringify(data)));
        }
        setChart(data);
      });
    }
  }, [isType]);

  useEffect(() => {
    if (updateData) {
      getCharts(user.id, 1, 0, "", "", isType).then((data) => {
        sessionStorage.setItem("chart", btoa(JSON.stringify(data)));
        setChart(data);
        setUpdate(false);
      });
    }
  }, [updateData]);
  return (
    <>
      <div className='content-wrapper'>
        <div className='content-header'></div>

        <div className='card container-fluid'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-md-6'>
                <h4 className='m-0 nama'>Dashboard Partner Monthly</h4>
                <p className='nama'>
                  Last Update: <b>333</b>
                </p>
              </div>
              <div className='col-md-6'></div>
              <TabsHeader
                titleCard1={"OMSET PARTNER SAMPAI TAHUN"}
                //   bodyCard1={dataChart ? dataChart.lastdata[0].toDay : null}
                titleCard2={"PERKIRAAN OMSET PARTNER AKHIR BULAN"}
                //   bodyCard2={
                //     dataChart ? dataChart.lastdata[0].Mounth : null
                //   }Selish Komulatif Target & Omset
                titleCard3={"SELISIH KUMULATIF TARGET & OMSET"}
                //   bodyCard3={
                //     dataChart ? dataChart.lastdata[0].Kumulatif : null
                //   }
                titleCard4={"KEKURANGAN TARGET PARTNER TAHUN"}
                //   bodyCard4={
                //     dataChart ? dataChart.lastdata[0].Kekurangan : null
                //   }
              />
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <DailyOmset dataChart={dataChart ? dataChart.sales : null} />
            <OmsetPerChannel dataChart={dataChart ? dataChart.sales : null} />
            <SalesQuanSKU
              dataChart={dataChart ? dataChart.salessku : null}
              setUpdate={setUpdate}
            />
            <DetailQtySku
              dataChart={dataChart ? dataChart.salessku : null}
              setUpdate={setUpdate}
            />
            <Manpower
              dataChart={dataChart ? dataChart.sales : null}
              setUpdate={setUpdate}
            />
            <ManpowerGroup
              Chart={dataChart ? dataChart.sales : null}
              setUpdate={setUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
