import React, {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import Loading from '../loading';


const options = {
    maintainAspectRatio : false,
    staccked: true,
    plugins: {
      legend: {
        position: 'bottom',
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

  const Charts2 = ({dataChart,setUpdate}) => {

      const data = {
        datasets: [
          {
            label: 'Internal',
            data: dataChart? dataChart.target : null,
            backgroundColor: "#619A3F",
            type: "bar"
          },
          {
            label: 'Partner',
            data: dataChart? dataChart.omset : null,
            backgroundColor: "#FF9E1D",
            type: "bar"
          },
          {
            label: 'Target',
            data: dataChart ? dataChart.total : null,
            backgroundColor: "#BABABA",
            borderColor: "#BABABA",
            type: "line",
          },
        ],
      };

      const selectOptions = [
        { value: 'mkahfi', label: 'M. Kahfi' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>Revenue Online Sales Internal vs Partner</h3>
            <i className='nama'>*Sales April menggunakan proyeksi total sales akhir bulan</i>
          </div>
          <div className='col-md-1'>
            <button className='btn'>
              <i className="fas fa-history" onClick={(e)=>{e.preventDefault();setUpdate(true);}} />
            </button>
          </div>
        </div>

        <div className='container form-group chart-container'>
          {dataChart == null && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Charts2
