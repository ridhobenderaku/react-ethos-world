import React from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";

const options = {
  maintainAspectRatio: false,
  staccked: true,
  plugins: {
    legend: {
      position: "right",
      display: false,
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
      type: "linear",
      display: true,
      position: "left",
      stacked: true,
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

const ProduktivitasOffline = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "RASIO ALL Manpower",
        data: dataChart ? dataChart.rasio : null,
        backgroundColor: "#D9E021",
        borderColor: "#D9E021",
        type: "line",
      },
      {
        label: "Omset",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#619A3F",
        type: "bar",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>Produktivitas Manpower Offline </h3>
            <p>*tidak termasuk mannager ke atas</p>
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

        <div className='container form-group row'>
          <div className='col-md-12 chart-container'>
            {dataChart == null && <Loading />}
            <Bar options={options} data={data} />
          </div>
          {/* <div className='row'>
            <div className='col-md-8'>
              <div className='text-xs col-md-12 table-responsive'>
                <table className='table table-bordered table-sm'>
                  <thead className='bg-success'>
                    <tr>
                      <th>Row Labels</th>
                      <th>JML ALL Manpower</th>
                      <th>JML CS</th>
                      <th>JML ADV</th>
                      <th>% penambahan Manpower</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-md-4'>
              <i className='nama'> *Jumlah manpower dari supervisor ke bawah</i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProduktivitasOffline;
