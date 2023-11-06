import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import { Bar } from "react-chartjs-2";
import Select from "react-select";
import Loading from "../loading";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      formatter: function (value, context) {
        if (context.dataset.label === "Rasio") return `${value.y}%`;
        else return ``;
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

const PencapaianMpAkusisi = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Akuisisi",
        data: dataChart ? dataChart.akuisisimp : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "CRM",
        data: dataChart ? dataChart.crmmp : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "Rasio",
        data: dataChart ? dataChart.rasiomp : null,
        backgroundColor: "#9C9C9C",
        borderColor: "#9C9C9C",
        type: "line",
        yAxisID: "y1",
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
        <div className='container form-group text-right'>
          <div className='row'>
            <h3 className='card-title'>
              Pencapaian MP Internal Berdasarkan Omset Akuisisi
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
          <i className='nama'>
            *Belum dikurangi return, sales April menggunakan sales tanggal
            terupdate
          </i>
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
  );
};

export default PencapaianMpAkusisi;
