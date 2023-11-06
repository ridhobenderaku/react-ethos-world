import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  responsive: true,
  staccked: true,
  plugins: {
    legend: {
      position: false,
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

const OmsetAkusisiInternal = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Akuisisi",
        data: dataChart ? dataChart.omset : null,
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
        <div className='container form-group text-right'>
          <div className='row'>
            <div className='col-md-7'>
              <h3 className='card-title'>Omset Akuisisi Internal</h3>
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
              *Belum dikurangi return, sales April sesuai dengan tanggal update
              terakhir
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
    </div>
  );
};

export default OmsetAkusisiInternal;
