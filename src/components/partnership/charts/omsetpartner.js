import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../../loading";
// import { DateRangePicker } from "react-date-range";

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const OmsetPartner = ({ dataChart,setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Omset",
        // data: dataChart ? dataChart.sumtarget : null,
        data: dataChart ? dataChart.sumtarget : null,
        backgroundColor: "#619A3F",
        borderColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Target Omset",
        // data: dataChart ? dataChart.sumomset : null,
        data: dataChart ? dataChart.sumtarget : null,
        backgroundColor: "#BABABA",
        borderColor: "#BABABA",
        type: "line",
      },
      {
        label: "Daily Average Omset",
        // data: dataChart ? dataChart.selisih : null,
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#FFD59D",
        borderColor: "#FFD59D",
        type: "line",
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body d-flex flex-column align-items-center">
        <div className="container form-group text-center row">
          <div className="form-group text-left">
            <h3>Average Daily Omset Partner</h3>
            <i className="nama">
              *Sales April menggunakan proyeksi total sales akhir bulan
            </i>
            {/* <button className="btn">
              <i
                className="fas fa-history"
                onClick={(e) => {
                  e.preventDefault();
                  setUpdate(true);
                }}
              />
            </button> */}
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
          <div className="text-right">
            {/* <button className="btn">
              <i
                className="fas fa-history"
                onClick={(e) => {
                  e.preventDefault();
                  setUpdate(true);
                }}
              />
            </button> */}
          </div>
        </div>

        <div className="container form-group chart-container">
          {/* {dataChart == null && <Loading />} */}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default OmsetPartner;
