import React, { useState, useEffect, useContext } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";

import getCharts from "../api/getCharts";
import TabsHeader from "../components/charts/tabsHeader";
import { ReactContext } from "../context/AuthProvider";
import PerbandinganSellIn from "../components/charts/chartoffline/perbandingansell";
import JumlahOutlet from "../components/charts/chartoffline/jumlahoutlet";
import ConstIklan from "../components/charts/chartcostiklan/constiklan";
import BiayaInternal from "../components/charts/chartcostiklan/biaya";
import PerbandinganBiaya from "../components/charts/chartcostiklan/perbandinganbiaya";
import Produktifitas from "../components/charts/manpower/prokduktifitas";
import ProduktivitasInternal from "../components/charts/manpower/produktivitasinternal";
import SliderBanner from "../components/slider/sliderBanner";
import Trendstock from "../components/charts/stock/trendstock";
import ProduktivitasOffline from "../components/charts/manpower/produktivitasOffline";
import Pencapaianofflinesales from "../components/charts/chartoffline/pencapaianofflinesales";
import Kontribusiofflinesellin from "../components/charts/chartoffline/kontribusiofflinesellin";
import TotalIndex from "../components/charts/chartsTotal/totalIndex";
import InternalIndex from "../components/charts/chartsInternal/internalIndex";
import PartnerIndex from "../components/charts/chartsPartner/partnerIndex";
import OfflineIndex from "../components/charts/chartoffline/offlineIndex";
import CostIklanIndex from "../components/charts/chartcostiklan/costIklanIndex";
import ManpowerIndex from "../components/charts/manpower/manpowerIndex";
import StockIndex from "../components/charts/stock/stockIndex";
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
  Legend,
  ChartDataLabels
);

export const Home = () => {
  const [updateData, setUpdate] = useState();
  const [dataChart, setChart] = useState("");
  const { user } = useContext(ReactContext);
  const [isType, setType] = useState("Total");
  const [Date, setDate] = useState("2023-2024");
  const splitDate = Date.split("-");

  const handleChangeDate = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

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
      getCharts(user.id, 1, 0, splitDate[0], splitDate[1], isType).then(
        (data) => {
          sessionStorage.setItem("chart", btoa(JSON.stringify(data)));
          setChart(data);
          setUpdate(false);
        }
      );
    }
  }, [updateData]);

  useEffect(() => {
    getCharts(user.id, 1, 0, splitDate[0], splitDate[1], isType).then(
      (data) => {
        sessionStorage.setItem("chart", btoa(JSON.stringify(data)));
        setChart(data);
        setUpdate(false);
      }
    );
  }, [Date]);

  return (
    <>
      <div className='content-wrapper pt-3'>
        <section className='content'>
          <div
            style={{
              padding: user.levele === "Admin" ? "0" : "50px ",
            }}
            className='container-fluid'>
            <div className='card'>
              <div
                style={{
                  height: user.levele === "Admin" ? "55vh" : "70vh",
                }}
                className='card-header p-0 '>
                <SliderBanner />
              </div>
            </div>
            {user && user.levele === "Admin" && (
              <div className='card'>
                <div className='card-header'>
                  <div
                    style={{ gap: "1rem" }}
                    className='w-100 d-flex flex-column flex-md-row justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <h4 className='m-0 nama'>Report Sales Monthly | </h4>
                      <p className='nama m-0 ml-1'>
                        Last Update: <b>{dataChart?.lastdate}</b>
                      </p>
                    </div>
                    <div
                      style={{ gap: "1rem" }}
                      className='align-self-end d-flex'>
                      {/* <select value={Date} onChange={handleChangeDate}>
                      <option value='2023-2024' key='2023-2024'>
                        2023-2024
                      </option>
                      <option value='2024-2025' key='2024-2025'>
                        2024-2025
                      </option>
                      <option value='2025-2026' key='2025-2026'>
                        2025-2026
                      </option>
                    </select> */}
                      <ul
                        className='nav'
                        role='tablist'
                        id='custom-tabs-four-tab'>
                        <li className='nav-item'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setType("Total");
                            }}
                            className='btn bg-light btn-xs active'
                            id='custom-tabs-four-total-tab'
                            data-toggle='pill'
                            href='#custom-tabs-four-total'
                            role='tab'
                            aria-controls='custom-tabs-four-total'
                            aria-selected='true'>
                            <span style={{ fontSize: "1rem" }} className='nama'>
                              <b>Total</b>
                            </span>
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setType("Internal");
                            }}
                            className='btn bg-light btn-xs'
                            id='custom-tabs-four-internal-tab'
                            data-toggle='pill'
                            href='#custom-tabs-four-internal'
                            role='tab'
                            aria-controls='custom-tabs-four-internal'
                            aria-selected='false'>
                            <span style={{ fontSize: "1rem" }} className='nama'>
                              <b>Internal</b>
                            </span>
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setType("Partner");
                            }}
                            className='btn bg-light btn-xs'
                            id='custom-tabs-four-partner-tab'
                            data-toggle='pill'
                            href='#custom-tabs-four-partner'
                            role='tab'
                            aria-controls='custom-tabs-four-partner'
                            aria-selected='false'>
                            <span style={{ fontSize: "1rem" }} className='nama'>
                              <b>Partner</b>
                            </span>
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setType("Offline");
                            }}
                            className='btn bg-light btn-xs'
                            id='custom-tabs-four-offline-tab'
                            data-toggle='pill'
                            href='#custom-tabs-four-offline'
                            role='tab'
                            aria-controls='custom-tabs-four-offline'
                            aria-selected='false'>
                            <span style={{ fontSize: "1rem" }} className='nama'>
                              <b>Offline</b>
                            </span>
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setType("Total");
                            }}
                            className='btn bg-light btn-xs'
                            id='custom-tabs-four-costiklan-tab'
                            data-toggle='pill'
                            href='#custom-tabs-four-costiklan'
                            role='tab'
                            aria-controls='custom-tabs-four-costiklan'
                            aria-selected='false'>
                            <span style={{ fontSize: "1rem" }} className='nama'>
                              <b>Cost Iklan</b>
                            </span>
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setType("Manpower");
                            }}
                            className='btn bg-light btn-xs'
                            id='custom-tabs-four-manpower-tab'
                            data-toggle='pill'
                            href='#custom-tabs-four-manpower'
                            role='tab'
                            aria-controls='custom-tabs-four-manpower'
                            aria-selected='false'>
                            <span style={{ fontSize: "1rem" }} className='nama'>
                              <b>Manpower</b>
                            </span>
                          </button>
                        </li>
                        <li className='nav-item'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setType("Total");
                            }}
                            className='btn bg-light btn-xs'
                            id='custom-tabs-four-stock-tab'
                            data-toggle='pill'
                            href='#custom-tabs-four-stock'
                            role='tab'
                            aria-controls='custom-tabs-four-stock'
                            aria-selected='false'>
                            <span style={{ fontSize: "1rem" }} className='nama'>
                              <b>Stock</b>
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='card-body'>
                  <div className='tab-content' id='custom-tabs-four-tabContent'>
                    <TotalIndex dataChart={dataChart} setUpdate={setUpdate} />
                    <InternalIndex
                      dataChart={dataChart}
                      setUpdate={setUpdate}
                    />
                    <PartnerIndex dataChart={dataChart} setUpdate={setUpdate} />
                    <OfflineIndex dataChart={dataChart} setUpdate={setUpdate} />
                    <CostIklanIndex dataChart={null} setUpdate={setUpdate} />
                    <ManpowerIndex
                      dataChart={dataChart}
                      setUpdate={setUpdate}
                    />
                    <StockIndex dataChart={null} setUpdate={setUpdate} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* /.content */}
      </div>
    </>
  );
};
