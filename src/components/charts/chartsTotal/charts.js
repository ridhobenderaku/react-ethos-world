import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const Charts = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
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
      // {
      //   label: 'Kumulatif Target',
      //   data: dataChart,
      //   backgroundColor: "#BABABA",
      //   borderColor: "#BABABA",
      //   type: "line",
      // },
      // {
      //   label: 'Kumulatif Omset',
      //   data: dataChart,
      //   backgroundColor: "#FFD59D",
      //   borderColor: "#FFD59D",
      //   type: "line",
      // },
      // {
      //   label: 'Selisih Kumulatif Target dan Omset',
      //   data: dataChart,
      //   backgroundColor: "#B0CD9F",
      //   borderColor: "#B0CD9F",
      //   type: "line",
      // },
    ],
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>Target Pencapaian Total Revenue Online Sales</h3>
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

export default Charts;
