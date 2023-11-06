import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      stacked: true,
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      stacked: true,
      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

const PencapaianMp = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Daily Average Omset",
        data: dataChart ? dataChart.averageomset : null,
        backgroundColor: "#FF9E1D",
        borderColor: "#FF9E1D",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Target Omset",
        data: dataChart ? dataChart.targetomset : null,
        backgroundColor: "#9C9C9C",
        borderColor: "#9C9C9C",
        type: "line",
      },

      {
        label: "Omset",
        data: dataChart ? dataChart.omsetmp : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
    ],
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-right'>
          <div className='row'>
            <div className='col-md-7'>
              <h3 className='card-title'>Pencapaian MP Internal By Omset</h3>
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
              *Sales April menggunakan proyeksi total sales akhir bulan
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

export default PencapaianMp;
