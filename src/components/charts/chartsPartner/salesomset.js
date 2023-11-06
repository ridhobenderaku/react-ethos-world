import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import Select from "react-select";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
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

const SalesOmset = ({ dataChart }) => {
  const data = {
    datasets: [
      {
        label: "ETA01",
        // data: dataChart,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "LIN01",
        // data: dataChart,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      // {
      //   label: 'FRE01',
      //   data: dataChart,
      //   backgroundColor: "#D9E021",
      //   type: "bar"
      // },
      // {
      //   label: 'NUT01',
      //   data: dataChart,
      //   backgroundColor: "#06AAFF",
      //   type: "bar"
      // },
      // {
      //   label: 'WEH01',
      //   data: dataChart,
      //   backgroundColor: "#FB9A99",
      //   type: "bar"
      // },
      // {
      //   label: 'GIZ01',
      //   data: dataChart,
      //   backgroundColor: "#E31A1C",
      //   type: "bar"
      // },
      // {
      //   label: 'ZYM01',
      //   data: dataChart,
      //   backgroundColor: "#FDBF6F",
      //   type: "bar"
      // },
      // {
      //   label: 'BIO02',
      //   data: dataChart,
      //   backgroundColor: "#FF7F00",
      //   type: "bar"
      // },
      // {
      //   label: 'RUB01',
      //   data: dataChart,
      //   backgroundColor: "#CAB2D6",
      //   type: "bar"
      // },
      // {
      //   label: 'VIS01',
      //   data: dataChart,
      //   backgroundColor: "#6A3D9A",
      //   type: "bar"
      // },
      // {
      //   label: 'Lainnya',
      //   data: dataChart,
      //   backgroundColor: "#FFFF99",
      //   type: "bar"
      // },
      // {
      //   label: 'GEN01',
      //   data: dataChart,
      //   backgroundColor: "#B15928",
      //   type: "bar"
      // },
      // {
      //   label: 'BRI01',
      //   data: dataChart,
      //   backgroundColor: "#A6CEE3",
      //   type: "bar"
      // },
      // {
      //   label: 'KUT01',
      //   data: dataChart,
      //   backgroundColor: "#1F78B4",
      //   type: "bar"
      // },
      // {
      //   label: 'OPT01',
      //   data: dataChart,
      //   backgroundColor: "#C3DE9E",
      //   type: "bar"
      // },
      // {
      //   label: 'ROY03',
      //   data: dataChart,
      //   backgroundColor: "#87BD3D",
      //   type: "bar"
      // },
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
        <div className='container row form-group'>
          <div className='col-md-2'></div>
          <div className='col-md-8 text-center'>
            <h3>Sales Partner By Omset</h3>
            <i className='nama'>
              *Sales bulan April menggunakan perkiraan sales akhir bulan
            </i>
          </div>
          <div className='col-md-2'>
            {/* <select className="form-control">
                    <option>By Omset</option>
                    <option>option 2</option>
                    <option>option 3</option>
                    <option>option 4</option>
                    <option>option 5</option>
                </select> */}
          </div>
        </div>

        <div className='container row form-group'>
          <div className='col-md-6'>
            {/* <h6 className='nama'>TEAM</h6>
                <Select options={selectOptions} placeholder="Kepada:" 
                    isMulti
                    name="colors"
                    className="basic-multi-select"
                    classNamePrefix="select" 
                /> */}
          </div>
          <div className='col-md-6'>
            {/* <h6 className='nama'>SKU</h6>
                <Select options={selectOptions} placeholder="Kepada:" 
                    isMulti
                    name="colors"
                    className="basic-multi-select"
                    classNamePrefix="select" 
                /> */}
          </div>
        </div>

        <div className='container form-group row'>
          <div className='col-md-12'>
            {!dataChart && <Loading />}
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOmset;
