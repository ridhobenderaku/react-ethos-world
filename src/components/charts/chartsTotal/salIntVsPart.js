import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

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
    x: {
      stacked: true,
    },
    y: {
      display: true,
      position: "left",
      stacked: true,
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

const SalIntVsPart = ({ dataChart, setUpdate }) => {
  // console.log(dataChart.internal);
  const data = {
    datasets: [
      {
        label: "Target",
        data: dataChart ? dataChart.target : null,
        backgroundColor: "#BABABA",
        borderColor: "#BABABA",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Internal",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Partner",
        data: dataChart ? dataChart.partner : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "Distributor",
        data: dataChart ? dataChart.distibutor : null,
        backgroundColor: "#B0CD9F",
        type: "bar",
      },
    ],
  };

  const selectOptions = [
    { value: "mkahfi", label: "M. Kahfi" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>Revenue Online Sales Internal, Partner, Distributor</h3>
          </div>
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

export default SalIntVsPart;
