import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";
// import { DateRangePicker } from "react-date-range";

const options = {
  maintainAspectRatio: false,
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

const Totalrevenueinternal = ({ dataChart, setUpdate }) => {
  const hasil = dataChart
    ? dataChart.kumulatifomset.map((data, idx) => {
        return { x: data.x, y: data.y - dataChart.kumulatiftarget[idx].y };
      })
    : null;
  const data = {
    datasets: [
      {
        label: "Kumulatif Target",
        data: dataChart ? dataChart.kumulatiftarget : null,
        backgroundColor: "#BABABA",
        borderColor: "#BABABA",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Kumulatif Omset",
        data: dataChart ? dataChart.kumulatifomset : null,
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
        label: "Daily Average Omset",
        data: dataChart ? dataChart.averageOmset : null,
        backgroundColor: "#FF66CC",
        borderColor: "#FF66CC",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Omset",
        data: dataChart ? dataChart.omsetinternal : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Target Omset",
        data: dataChart ? dataChart.targetomset : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
    ],
  };

  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-5'>
            <h3 className='card-title'>
              Target Pencapaian Total Revenue Online Internal
            </h3>
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

export default Totalrevenueinternal;
