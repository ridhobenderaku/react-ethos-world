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
      formatter: function (value, context) {
        return `${value.persen}%`;
      },
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

const Kontribusiofflinesellin = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Farmasi",
        data: dataChart ? dataChart.farmasi : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "Herbal/Tradisional",
        data: dataChart ? dataChart.herbal : null,
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
            <h3>Kontribusi Volume Channel Offline Sell In</h3>
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

export default Kontribusiofflinesellin;
