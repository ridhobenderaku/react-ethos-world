import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import Select from "react-select";
import { Pie } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    datalabels: {
      display: false,
    },
  },
};

const KontribusiSalesChanel = ({ dataChart, setUpdate }) => {
  const data = {
    labels: ["Facebook", "Tiktok", "Google", "SMO"],
    datasets: [
      {
        data: dataChart
          ? dataChart.sku.map((data) => {
              return data.y;
            })
          : null,
        backgroundColor: ["#619A3F", "#FF9E1D", "#D9E021", "#06AAFF"],
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
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3 className='card-title'>
              Kontribusi Sales Channel Akuisisi By Omset
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
          <Pie options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default KontribusiSalesChanel;
