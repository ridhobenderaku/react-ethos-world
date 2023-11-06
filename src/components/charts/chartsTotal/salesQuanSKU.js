import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Bar, Pie } from "react-chartjs-2";
import Loading from "../loading";
import { NumericFormat } from "react-number-format";

const options = {
  maintainAspectRatio: false,
  staccked: true,
  plugins: {
    legend: {
      position: "right",
      display: false,
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
const SalesQuanSKU = ({ dataChart, setUpdate }) => {
  const label = dataChart
    ? dataChart.listwarna.map((data) => data.label)
    : null;

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
          label: "ETA01",
          data: null,
          backgroundColor: "#619A3F",
          type: "bar",
        },
      ];
  // console.log(hasilnya);
  const data = {
    // labels: ["Internal"],
    // datasets: [
    //   {
    //     label: "Internal",
    //     data: [{ x: "Oct-21", y: 229 }],
    //     backgroundColor: "#619A3F",
    //     type: "bar",
    //   },
    // ],
    // labels: ["ETA01"],
    datasets: hasilnya,
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
        <div className='container form-group  row'>
          <div className='col-md-10'>
            <h3>Sales Total By Quantity SKU</h3>
            <i className='nama'>
              *Belum dikurangi return, sales bulan berjalan menggunakan
              perkiraan sales akhir bulan
            </i>
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
          <div className='col-md-8 d-flex align-items-end chart-container'>
            {dataChart == null && <Loading />}
            <Bar options={options} data={data} />{" "}
          </div>
          {/* <Bar options={options} data={data} /> */}

          <div className='col-md-2 text-xs table-responsive'>
            <table className='table table-bordered table-sm'>
              <thead className='bg-success'>
                <tr>
                  <th>SKU</th>
                  <th>Warna</th>
                </tr>
              </thead>
              <tbody>
                {dataChart?.listwarna?.map((data, idx) => (
                  <tr key={idx}>
                    <>
                      <td> {data.label} </td>
                      <td
                        style={{
                          backgroundColor: data.backgroundColor,
                          width: "20px",
                          height: "10px",
                        }}></td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-md-2 text-xs table-responsive'>
            <div className='col nama'>
              <h6>Sales Bulan April</h6>
            </div>
            <table className='table table-bordered table-sm'>
              <thead className='bg-success'>
                <tr>
                  <th>SKU</th>
                  <th>QTY</th>
                </tr>
              </thead>
              <tbody>
                {/* {dataChart &&
                  dataChart.list.map((data, idx) => (
                    <tr key={idx}>
                      <>
                        <td> {data.label} </td>
                        <td>
                          <NumericFormat
                            displayType='text'
                            thousandSeparator=','
                            value={data.y}
                          />
                        </td>
                      </>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesQuanSKU;
