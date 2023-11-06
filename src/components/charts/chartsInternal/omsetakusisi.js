import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  barValueSpacing: 20,
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    datalabels: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  },
};

const OmsetAkusisi = ({ dataChart, setUpdate }) => {
  const label = dataChart
    ? dataChart.listwarna.map((data) => {
        return {
          label: data.label,
          backgroundColor: data.backgroundColor,
        };
      })
    : [
        {
          // label: "ETA01",
          data: null,
          backgroundColor: "#619A3F",
        },
      ];
  const hasilnya = dataChart
    ? dataChart.datasets.map((data) => {
        return {
          label: data.label,
          data: [{ x: data.x, y: data.y }],
          backgroundColor: data.backgroundColor,
          type: "bar",
        };
      })
    : [
        {
          // label: "ETA01",
          data: null,
          backgroundColor: "#619A3F",
          type: "bar",
        },
      ];
  const data = {
    labels: [],
    datasets: hasilnya,
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-right'>
          <div className='row'>
            <div className='col-md-7'>
              <h3 className='card-title'>Omset Akuisisi Per Channel</h3>
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
        </div>
        {/* <div className="container row form-group">
<div className="col-md-4">
<h6 className="nama">Tahun</h6>
<Select
options={selectTahun}
placeholder="Pilih Jenis Tahun"
name="colors"
className="basic-multi-select"
classNamePrefix="select"
/>
</div>
<div className="col-md-4">
<h6 className="nama">Bulan</h6>
<Select
options={selectBulan}
placeholder="Pilih Jenis Bulan"
name="colors"
className="basic-multi-select"
classNamePrefix="select"
/>
</div>
<div className="col-md-4">
<h6 className="nama">JK1</h6>
<Select
options={selectJk1}
placeholder="Pilih Jenis JK1"
name="colors"
className="basic-multi-select"
classNamePrefix="select"
/>
</div>
</div> */}
        <div className='chart-container container form-group'>
          {dataChart == null && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default OmsetAkusisi;
