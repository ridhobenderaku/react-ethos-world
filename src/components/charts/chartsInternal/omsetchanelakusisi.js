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
const OmsetchannelAkusisi = ({ dataChart, setUpdate }) => {
  const d = dataChart?.tiktok.map((data) => {
    return { x: data.x, y: 1000000000 };
  });
  const data = {
    datasets: [
      {
        label: "FACEBOOK",
        data: dataChart ? dataChart.fb : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "GOOGLE",
        data: dataChart ? dataChart.google : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "SMO",
        data: dataChart ? dataChart.smo : null,
        backgroundColor: "#06AAFF",
      },
      {
        label: "TIKTOK",
        data: dataChart ? dataChart.tiktok : null,
        backgroundColor: "#D9E021",
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
              <h3 className='card-title'>Omset Channel Akuisisi By Produk</h3>
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
              *Belum dikurangi return, sales April menggunakan perkiraan sales
              akhir bulan
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

export default OmsetchannelAkusisi;
