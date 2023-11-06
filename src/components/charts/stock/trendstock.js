import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

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
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const Trendstock = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Saldo",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#619A3F",
        type: "line",
      },
      {
        label: "Max",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#FF9E1D",
        type: "line",
      },
      {
        label: "Buffer",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#D9E021",
        type: "line",
      },
      {
        label: "Treshold (Min)",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#06AAFF",
        type: "line",
      },
      {
        label: "Incoming Plan",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#87BD3D",
        type: "line",
      },
      {
        label: "Real Incoming",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#737373",
        type: "line",
      },
    ],
  };

  const selectJk1 = [
    { value: "semua", label: "SEMUA" },
    { value: "internal", label: "INTERNAL" },
    { value: "offline", label: "OFFLINE" },
    { value: "partner", label: "PARTNER" },
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
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-right row'>
          <div className='col-md-10'>
            <h3 className='card-title'>Trend Total Stock Bulan February</h3>
          </div>
          <div className='col-md-2'>
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

        {/* <div className="container row form-group">
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

        <div className='container form-group row'>
          <div className='col-md-9 d-flex align-items-end chart-container'>
            {dataChart == null && <Loading />}
            <Bar options={options} data={data} />
          </div>
          <div className='col-md-3 text-xs table-responsive'>
            <div className='col nama'>
              <h6 className='card-title'>
                Produk yang Stock nya Dibawah BUFFER
              </h6>
              <p>Aman/Tidak</p>
            </div>
            <table className='table table-bordered table-sm'>
              <thead className='bg-success'>
                <tr>
                  <th>Row Labels</th>
                  <th>Sum Of SALDO</th>
                  <th>Sum Of BUFFER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ETA01</td>
                  <td>26,564</td>
                  <td>1460,707</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trendstock;
