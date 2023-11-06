import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import Loading from "../../loading";

const options = {
  maintainAspectRatio: false,
  staccked: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const OmsetPerChannel = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Akuisisi",
        data: dataChart ? dataChart.sumtarget : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "CRM",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "MP",
        data: dataChart ? dataChart.sumtarget : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "Offline",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#06AAFF",
        type: "bar",
      },
    ],
  };

  const selectJk1 = [
    { value: "semua", label: "SEMUA" },
    { value: "internal", label: "INTERNAL" },
    { value: "offline", label: "OFFLINE" },
    { value: "partner", label: "PARTNER" },
  ];
  const selectGroup1 = [
    { value: "semua", label: "SEMUA" },
    { value: "agen", label: "AGEN" },
    { value: "akuisisi", label: "AKUISISI" },
    { value: "crm", label: "CRM" },
    { value: "mp", label: "MP" },
    { value: "offline", label: "OFFLINE" },
  ];
  const selectTeam = [
    { value: "semua", label: "SEMUA" },
    { value: "adanu", label: "Adanu" },
    { value: "aksara", label: "Aksara" },
    { value: "bayu", label: "Bayu" },
    { value: "diagram", label: "Diagram" },
    { value: "digi", label: "Digi" },
  ];
  const selectSku = [
    { value: "semua", label: "SEMUA" },
    { value: "bio02", label: "BIO02" },
    { value: "bri01", label: "BRI01" },
    { value: "eta01", label: "ETA01" },
    { value: "fre01", label: "FRE01" },
    { value: "gen01", label: "GEN01" },
  ];
  return (
    <div className="card">
      <div className="card-body d-flex flex-column align-items-center">
        <div className="container row form-group">
          <div className="form-group text-left">
            <h3>Omset Partner Per Channel</h3>
            <i className="nama">
            *Sales April menggunakan proyeksi total sales akhir bulan
            </i>
          </div>
          <div className="form-group text-right">
            {/* <select className="form-control">
              <option>By Omset</option>
              <option>By Quantity</option>
            </select> */}
          </div>
          <div className="col-md-1">
            {/* <button className="btn">
              <i
                className="fas fa-history"
                onClick={(e) => {
                  e.preventDefault();
                  setUpdate(true);
                }}
              />
            </button> */}
          </div>
        </div>
        {/* 
        <div className="container row form-group">
          <div className="col-md-6">
            <h6 className="nama">JK1</h6>
            <Select
              options={selectJk1}
              placeholder="Pilih Jenis JK1"
              isMulti
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="col-md-6">
            <h6 className="nama">GROUP 1</h6>
            <Select
              options={selectGroup1}
              placeholder="Pilih Jenis GROUP1"
              isMulti
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>

        <div className="container row form-group">
          <div className="col-md-6">
            <h6 className="nama">TEAM</h6>
            <Select
              options={selectTeam}
              placeholder="Pilih Jenis TEAM"
              isMulti
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="col-md-6">
            <h6 className="nama">SKU</h6>
            <Select
              options={selectSku}
              placeholder="Pilih Jenis SKU"
              isMulti
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div> */}

        <div className="container chart-container form-group">
          {dataChart == null && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default OmsetPerChannel;
