import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";
// import { DateRangePicker } from "react-date-range";

const options = {
  maintainAspectRatio: false,
  stacked: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

const Sales = ({ dataChart, setUpdate }) => {
  const hasil = dataChart
    ? dataChart.sumomset.map((data, idx) => {
        return { x: data.x, y: data.y - dataChart.sumtarget[idx].y };
      })
    : null;
  const data = {
    datasets: [
      {
        label: "Kumulatif Target",
        data: dataChart ? dataChart.sumtarget : null,
        backgroundColor: "#BABABA",
        borderColor: "#BABABA",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Kumulatif Omset",
        data: dataChart ? dataChart.sumomset : null,
        backgroundColor: "#FFD59D",
        borderColor: "#FFD59D",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Selisih Kumulatif Target dan Omset",
        data: hasil,
        backgroundColor: "#B0CD9F",
        borderColor: "#B0CD9F",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Target",
        data: dataChart ? dataChart.target : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Omset",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
    ],
  };

  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-11'>
            <h3>Target Pencapaian Total Revenue Online Sales</h3>
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

export default Sales;
