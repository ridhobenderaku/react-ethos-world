import React, { useState, useEffect } from "react";
// import getCharts from '../../../api/getCharts'
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  responsive: true,
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

const OmsetInternal = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "AK-FB&G",
        data: dataChart ? dataChart.fbg : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "AK-TIKTOK",
        data: dataChart ? dataChart.tiktok : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "CRM-REPEAT",
        data: dataChart ? dataChart.crmrepeat : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "CRM-RESELER",
        data: dataChart ? dataChart.crmreseler : null,
        backgroundColor: "#87BD3D",
        type: "bar",
      },
      {
        label: "MP",
        data: dataChart ? dataChart.mpinternal : null,
        backgroundColor: "#4472C4",
        type: "bar",
      },
      {
        label: "AGEN",
        data: dataChart ? dataChart.agen : null,
        backgroundColor: "#06AAFF",
        type: "bar",
      },
    ],
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-right'>
          <div className='row'>
            <div className='col-md-5'>
              <h3 className='card-title'> Omset Internal Per Channel</h3>
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

export default OmsetInternal;
