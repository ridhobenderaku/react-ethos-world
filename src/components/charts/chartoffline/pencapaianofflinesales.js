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

const Pencapaianofflinesales = ({ dataChart, setUpdate }) => {
  const hasil = dataChart
    ? dataChart.kumulatifomset.map((data, idx) => {
        return { x: data.x, y: data.y - dataChart.kumulatiftarget[idx].y };
      })
    : null;
  const data = {
    datasets: [
      {
        label: "Kumulatif Target",
        data: dataChart ? dataChart.kumulatiftarget : null,
        backgroundColor: "#BABABA",
        borderColor: "#BABABA",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Kumulatif Omset",
        data: dataChart ? dataChart.kumulatifomset : null,
        backgroundColor: "#FFD59D",
        borderColor: "#FFD59D",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Selisih Kumulatif Target dan Omset",
        data: hasil,
        backgroundColor: "#B0CD9F",
        borderColor: "#B0CD9F",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Target",
        data: dataChart ? dataChart.target : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "Omset Sell In",
        data: dataChart ? dataChart.omssetsellin : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
    ],
  };
  return (
    // <div className='card'>
    //   <div className='card-body d-flex flex-column align-items-center'>
    //     <div className='container form-group text-center'>
    //       <h3>Perbandingan Sell In & Sell Out Offline By Quantity</h3>
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
            <h3>Target Pencapaian Offline Sales</h3>
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

export default Pencapaianofflinesales;
