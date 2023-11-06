import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../../loading";

const options = {
  maintainAspectRatio: false,
  staccked: true,
  plugins: {
    legend: {
      position: "right",
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

const ManpowerGroup = ({ dataChart, setUpdate }) => {
  const data = {
    datasets: [
      {
        label: "Rasio",
        data: dataChart ? dataChart.sumtarget : null,
        // data : 30000,
        backgroundColor: "#D9E021",
        borderColor: "#D9E021",
        type: "line",
      },
      {
        label: "Omset",
        data: dataChart ? dataChart.sumtarget : null,
        // data : 400000,
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
    <div className="card">
      <div className="card-body d-flex flex-column align-items-center">
        <div className="container form-group text-center row">
          <div className="col-md-1"></div>
          <div className="text-right">
            <h3>Produktivitas Manpower Internal By Group</h3>
          </div>
          <div className="col-md-1">
            <button className="btn">
              <i
                className="fas fa-history"
                onClick={(e) => {
                  e.preventDefault();
                  setUpdate(true);
                }}
              />
            </button>
          </div>
        </div>

        <div className="container form-group row">
          <div className="col-md-12 chart-container">
            {/* {dataChart == null && <Loading />} */}
            <Bar options={options} data={data} />
          </div>
          <div className="text-xs col-md-12 table-responsive">
            {dataChart && (
              <table className="table table-bordered table-sm">
                <thead className="bg-success">
                  <tr>
                    <th></th>
                    {/* {dataChart.internal.map((menuItem, idx) => (
                      <td key={idx}>{menuItem.x}</td>
                    ))} */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* {dataChart.internal.map((menuItem, idx) => (
                      <td key={idx}>{menuItem.y}</td>
                    ))} */}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManpowerGroup;
