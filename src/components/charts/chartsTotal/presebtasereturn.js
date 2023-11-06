import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";
const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      formatter: function (value, context) {
        if (context.dataset.label === "% Return") return `${value.y}%`;
        else return `${value.y}`;
      },
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          return value + "%";
        },
      },
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

const Presentasereturn = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "% Return",
        data: dataChart
          ? dataChart.presentase.map((data) => {
              return { x: data.x, y: Number(data.y) };
            })
          : null,
        backgroundColor: "#BABABA",
        borderColor: "#BABABA",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Jml paket",
        data: dataChart ? dataChart.jmlpaket : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Jml Paket Return",
        data: dataChart ? dataChart.jmlpaketreturn : null,
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
            <h3>Presentase Return</h3>
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

export default Presentasereturn;
