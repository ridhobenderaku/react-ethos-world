import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  responsive: true,
  staccked: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const OmsetPartner = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Akuisisi",
        data: dataChart ? dataChart.akuisisi : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "CRM",
        data: dataChart ? dataChart.crm : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "MP",
        data: dataChart ? dataChart.mp : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
    ],
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-11'>
            <h3>Omset Partner Per Channel</h3>
          </div>
          {/* <div className="col-md-3">
          <div className=" input-group">
            <button
              type="button"
              className="btn btn-default float-right"
              id="reservation"
            >
              <i className="far fa-calendar-alt" />
            </button>
            <button
              type="button"
              className="btn btn-default float-right"
              id="daterange-btn"
            >
              Date range
              <i className="fas fa-caret-down" />
            </button>
          </div>
        </div> */}
          <div className='col-md-1'>
            <button className='btn'>
              <i
                className='fas fa-history'
                onClick={(e) => {
                  e.preventDefault();
                  setUpdate(true);
                }}
              />
            </button>
          </div>
        </div>

        <div className='container form-group chart-container'>
          {dataChart == null && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default OmsetPartner;
