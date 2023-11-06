import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  responsive: true,
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

const BiayaIklanAkusisi = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "RASIO",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#9C9C9C",
        borderColor: "#9C9C9C",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "OMSET",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "BIAYA IKLAN",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#D9E021",
        borderColor: "#D9E021",
        type: "bar",
      },
    ],
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>
              Biaya Iklan Akuisisi Internal terhadap Omset Masing-masing Channel
              Internal
            </h3>
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

        <div className='container form-group row'>
          {dataChart == null && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default BiayaIklanAkusisi;
