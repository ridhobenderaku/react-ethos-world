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
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
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

const AveragePartner = ({ dataChart, setUpdate }) => {
  const hasil = dataChart
    ? dataChart.komulatifomset.map((data, idx) => {
        return { x: data.x, y: data.y - dataChart.komulatiftarget[idx].y };
      })
    : null;

  const data = {
    datasets: [
      {
        label: "Selisih Target dan Omset",
        data: hasil,
        backgroundColor: "#FB9A99",
        borderColor: "#FB9A99",
        type: "line",
        yAxisID: "y1",
      },

      {
        label: "Kumulatif Target",
        data: dataChart ? dataChart.komulatiftarget : null,
        backgroundColor: "#5EEAD1",
        borderColor: "#5EEAD1",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Kumulatif Omset",
        data: dataChart ? dataChart.komulatifomset : null,
        backgroundColor: "#8C63B8",
        borderColor: "#8C63B8",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Daily Average Omset",
        data: dataChart ? dataChart.averagepartner : null,
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
        type: "bar",
      },

      {
        label: "Omset",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
    ],
  };
  return (
    // <div className='card'>
    //   <div className='card-body d-flex flex-column align-items-center'>
    //     <div className='container form-group text-center'>
    //       <h3>Average Daily Omset Partner</h3>
    //       <i className='nama'>
    //         *Sales April menggunakan proyeksi total sales akhir bulan
    //       </i>
    //     </div>

    //     <div className='container form-group row'>
    //       {/* {isLoading && <Loading />} */}
    //       <Bar options={options} data={data} />
    //     </div>
    //   </div>
    // </div>
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>Average Daily Omset Partner</h3>
          </div>
          {/* <div className='col-md-1'> */}
          {/* <select className="form-control">
            <option>By Omset</option>
            <option>By Quantity</option>
          </select> */}
          {/* </div> */}
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

        <div className='container chart-container form-group'>
          {dataChart == null && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default AveragePartner;
