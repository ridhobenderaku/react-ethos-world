import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
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
};

const JumlahOutlet = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Active Outlet",
        data: dataChart ? dataChart.activeoutlet : null,
        backgroundColor: "#9C9C9C",
        borderColor: "#9C9C9C",
        type: "line",
      },
      {
        label: "Outlet Register",
        data: dataChart ? dataChart.outletregister : null,
        backgroundColor: "#D9E021 ",
        borderColor: "#D9E021",
        type: "line",
      },
      {
        label: "Kualitatif Outlet",
        data: dataChart ? dataChart.komulatifoutlet : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Outlet Transaction",
        data: dataChart ? dataChart.outlettransaction : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
    ],
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center'>
          <h3>Jumlah Outlet</h3>
        </div>

        <div className='container form-group row'>
          {/* {isLoading && <Loading />} */}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default JumlahOutlet;
