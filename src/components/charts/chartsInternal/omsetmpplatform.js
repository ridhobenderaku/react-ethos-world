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
      position: "right",
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

const OmsetMpPlatform = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Shopee",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Lazada",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "Tokopedia",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "Tik Tok",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#06AAFF",
        type: "bar",
      },
      {
        label: "Bukalapak",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#FB9A99",
        type: "bar",
      },
      {
        label: "Akulaku",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#E31A1C",
        type: "bar",
      },
      {
        label: "Blibli",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#FDBF6F",
        type: "bar",
      },
      {
        label: "Lainnya",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#FF7F00",
        type: "bar",
      },
      {
        label: "COD",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#B15928",
        type: "bar",
      },
      {
        label: "JD.ID",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#C3DE9E",
        type: "bar",
      },
      {
        label: "Transfer",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#87BD3D",
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
        <div className='container form-group text-center'>
          <h3>Omset MP Per Platform</h3>
          <i className='nama'>
            *Belum dikurangi return, sales April menggunakan sales update
            terakhir
          </i>
        </div>

        <div className='container row form-group'>
          <div className='col-md-6'>
            <h6 className='nama'>PLATFORM</h6>
            <Select
              options={selectOptions}
              placeholder='Kepada:'
              isMulti
              name='colors'
              className='basic-multi-select'
              classNamePrefix='select'
            />
          </div>
          <div className='col-md-6'>
            <h6 className='nama'>SKU 1</h6>
            <Select
              options={selectOptions}
              placeholder='Kepada:'
              isMulti
              name='colors'
              className='basic-multi-select'
              classNamePrefix='select'
            />
          </div>
        </div>

        <div className='container form-group row'>
          {dataChart == null && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default OmsetMpPlatform;
