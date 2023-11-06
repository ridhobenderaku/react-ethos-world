import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Pie } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
    },
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        if (value && ctx) {
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(1) + "%";
          return percentage;
        } else {
          return "";
        }
      },
    },
  },
};

const PersenSalesSKUQuan = ({ dataChart, setUpdate }) => {
  const data = {
    labels: dataChart
      ? dataChart.sku.map((data) => {
          return data.x;
        })
      : null,
    datasets: [
      {
        data: dataChart
          ? dataChart.sku.map((data) => {
              return data.y;
            })
          : null,
        backgroundColor: dataChart
          ? dataChart.sku.map((data) => {
              return data.z;
            })
          : null,
      },
    ],
  };

  const selectTahun = [
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
  ];
  const selectBulan = [
    { value: "januari", label: "Januari" },
    { value: "februari", label: "Februari" },
    { value: "maret", label: "Maret" },
    { value: "april", label: "April" },
    { value: "mei", label: "Mei" },
    { value: "juni", label: "Juni" },
    { value: "juli", label: "Juli" },
    { value: "agustus", label: "Agustus" },
    { value: "september", label: "September" },
    { value: "oktober", label: "Oktober" },
    { value: "november", label: "November" },
    { value: "desember", label: "Desember" },
  ];
  const selectJk1 = [
    { value: "semua", label: "SEMUA" },
    { value: "internal", label: "INTERNAL" },
    { value: "offline", label: "OFFLINE" },
    { value: "partner", label: "PARTNER" },
  ];
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>Persentase Kontribusi Sales Per SKU Berdasarkan Quantity</h3>
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
          {dataChart == null ? (
            <Loading />
          ) : (
            <Pie options={options} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersenSalesSKUQuan;
