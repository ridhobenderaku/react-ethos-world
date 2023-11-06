import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  responsive: true,
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: false,
    },
    datalabels: {
      display: false,
    },
  },
};

const ChartsPartner = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        // label: "Akuisisi",
        data: dataChart
          ? dataChart.toppartner.map((data) => {
              return { x: data.y, y: data.z };
            })
          : null,
        backgroundColor: "#619A3F",
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
        <div className='container form-group row'>
          <div className='col-md-6'>
            <h3>Top 5 Partner</h3>
            <i className='nama'>*Rentang waktu pilih di samping</i>
          </div>
          <div className='col-md-6'>
            {/* <h6 className='nama'>Bulan</h6>
                <Select options={selectOptions} placeholder="Kepada:" 
                    isMulti
                    name="colors"
                    className="basic-multi-select"
                    classNamePrefix="select" 
                /> */}
          </div>
        </div>

        <div className='container row form-group'>
          {!dataChart && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default ChartsPartner;
