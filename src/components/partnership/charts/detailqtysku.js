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

const DetailQtySku = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "ETA01",
        data: dataChart ? dataChart.ETA01 : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "LIN01",
        data: dataChart ? dataChart.LIN01 : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "FRE01",
        data: dataChart ? dataChart.FRE01 : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "NUT01",
        // data: dataChart ? dataChart.NUT01 : null,
        backgroundColor: "#06AAFF",
        type: "bar",
      },
      {
        label: "WEH01",
        // data: dataChart ? dataChart.WEH01 : null,
        backgroundColor: "#FB9A99",
        type: "bar",
      },
      {
        label: "GIZ01",
        // data: dataChart ? dataChart.GIZ01 : null,
        backgroundColor: "#E31A1C",
        type: "bar",
      },
      {
        label: "ZYM01",
        // data: dataChart ? dataChart.ZYM01 : null,
        backgroundColor: "#FDBF6F",
        type: "bar",
      },
      {
        label: "BIO02",
        // data: dataChart ? dataChart.BIO02 : null,
        backgroundColor: "#FF7F00",
        type: "bar",
      },
      {
        label: "RUB01",
        // data: dataChart ? dataChart.RUB01 : null,
        backgroundColor: "#CAB2D6",
        type: "bar",
      },
      {
        label: "VIS01",
        // data: dataChart ? dataChart.VIS01 : null,
        backgroundColor: "#6A3D9A",
        type: "bar",
      },
      {
        label: "Lainnya",
        // data: dataChart ? dataChart.Lainnya : null,
        backgroundColor: "#FFFF99",
        type: "bar",
      },
      {
        label: "GEN01",
        // data: dataChart ? dataChart.GEN01 : null,
        backgroundColor: "#B15928",
        type: "bar",
      },
      {
        label: "BRI01",
        // data: dataChart ? dataChart.BRI01 : null,
        backgroundColor: "#A6CEE3",
        type: "bar",
      },
      {
        label: "KUT01",
        // data: dataChart ? dataChart.KUT01 : null,
        backgroundColor: "#1F78B4",
        type: "bar",
      },
      {
        label: "OPT01",
        // data: dataChart ? dataChart.OPT01 : null,
        backgroundColor: "#C3DE9E",
        type: "bar",
      },
      {
        label: "ROY03",
        // data: dataChart ? dataChart.ROY03 : null,
        backgroundColor: "#87BD3D",
        type: "bar",
      },

      //   labels: dataChart
      //   ? dataChart.sale.map((data) => {
      //       return data.x;
      //     })
      //   : null,
      // datasets: [
      //   {
      //     label: dataChart
      //       ? dataChart.sale.map((data) => {
      //           return data.z;
      //         })
      //       : null,
      //     data: dataChart
      //       ? dataChart.sale.map((data) => {
      //           return data.y;
      //           // console.log(data.y);
      //         })
      //       : null,
      //     // data: dataChart ? dataChart.sale : null,
      //     backgroundColor: dataChart
      //       ? dataChart.sale.map((data) => {
      //           return data.w;
      //         })
      //       : null,
      //     // backgroundColor: "#619A3F",
      //     type: "bar",
      //   },
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
    <div className="card">
      <div className="card-body d-flex flex-column align-items-center">
        <div className="container form-group text-center row">
          <div className="col-md-11">
            <h3>Detail Rata-rata Harian Partner By SKU (Per Channel)</h3>
          </div>
          <div className="col-md-1">
            <button className="btn">
              <i
                className="fas fa-history"
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

        <div className="container form-group row">
          <div className="col-md-10 d-flex align-items-end chart-container">
            {dataChart == null && <Loading />}
            <Bar options={options} data={data} />
          </div>
          <div className="col-md-2 text-xs table-responsive">
            <div className="col nama">
              <h6>Sales Bulan April</h6>
              <p>Update: 29/04/2023</p>
            </div>
            <table className="table table-bordered table-sm">
              <thead className="bg-success">
                <tr>
                  <th>SKU</th>
                  <th>QTY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ETA01</td>
                  <td>1600</td>
                </tr>
                <tr>
                  <td>LIN01</td>
                  <td>1500</td>
                </tr>
                <tr>
                  <td>FRE01</td>
                  <td>1400</td>
                </tr>
                <tr>
                  <td>NUT01</td>
                  <td>1300</td>
                </tr>
                <tr>
                  <td>WEH01</td>
                  <td>1200</td>
                </tr>
                <tr>
                  <td>GIZ01</td>
                  <td>1100</td>
                </tr>
                <tr>
                  <td>ZYM01</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>BIO02</td>
                  <td>900</td>
                </tr>
                <tr>
                  <td>RUB01</td>
                  <td>800</td>
                </tr>
                <tr>
                  <td>VIS01</td>
                  <td>700</td>
                </tr>
                <tr>
                  <td>Lainnya</td>
                  <td>600</td>
                </tr>
                <tr>
                  <td>GEN01</td>
                  <td>500</td>
                </tr>
                <tr>
                  <td>BRI01</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>KUT01</td>
                  <td>300</td>
                </tr>
                <tr>
                  <td>OPT01</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>ROY03</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailQtySku;
