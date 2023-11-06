import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import Select from "react-select";
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
    },
  },
};

const OmsetMPperplatformInternal = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "JD.ID",
        data: dataChart ? dataChart.jdid : null,
        backgroundColor: "#C3DE9E",
        type: "bar",
      },
      {
        label: "Lainnya",
        data: dataChart ? dataChart.lainnnya : null,
        backgroundColor: "#FF7F00",
        type: "bar",
      },
      {
        label: "Tokopedia",
        data: dataChart ? dataChart.tokpeda : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "SOSCOM",
        data: dataChart ? dataChart.soscom : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "TRANSFER",
        data: dataChart ? dataChart.tf : null,
        backgroundColor: "#87BD3D",
        type: "bar",
      },
      {
        label: "Blibli",
        data: dataChart ? dataChart.blibli : null,
        backgroundColor: "#FDBF6F",
        type: "bar",
      },
      {
        label: "Bukalapak",
        data: dataChart ? dataChart.bukalapak : null,
        backgroundColor: "#FB9A99",
        type: "bar",
      },
      {
        label: "Akulaku",
        data: dataChart ? dataChart.akulaku : null,
        backgroundColor: "#E31A1C",
        type: "bar",
      },
      {
        label: "Tiktok shop",
        data: dataChart ? dataChart.tiktokshop : null,
        backgroundColor: "#06AAFF",
        type: "bar",
      },
      {
        label: "Tokopedia",
        data: dataChart ? dataChart.tokped : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "Lazada",
        data: dataChart ? dataChart.lazada : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "shopee",
        data: dataChart ? dataChart.shopee : null,
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
              <h3 className='card-title'>Omset MP Per Platform</h3>
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

export default OmsetMPperplatformInternal;
