import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../loading";
import { NumericFormat } from "react-number-format";

const options = {
  maintainAspectRatio: false,
  staccked: true,
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

const SalesTotal = ({ dataChart, setUpdate }) => {
  const hasil = dataChart
    ? dataChart.omset.map((data, idx) => {
        return { x: data.x, y: data.y - dataChart.target[idx].y };
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
        data: dataChart ? dataChart.target : null,
        backgroundColor: "#5EEAD1",
        borderColor: "#5EEAD1",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Kumulatif Omset",
        data: dataChart ? dataChart.omset : null,
        backgroundColor: "#8C63B8",
        borderColor: "#8C63B8",
        type: "line",
        yAxisID: "y1",
      },
      {
        label: "Internal",
        data: dataChart ? dataChart.internal : null,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "Partner",
        data: dataChart ? dataChart.partner : null,
        backgroundColor: "#FF9E1D",
        type: "bar",
      },
      {
        label: "Offline",
        data: dataChart ? dataChart.offline : null,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "Distributor",
        data: dataChart ? dataChart.distribusi : null,
        backgroundColor: "#06AAFF",
        type: "bar",
      },
    ],
  };

  return (
    <div className='card'>
      <div className='card-body d-flex flex-column align-items-center'>
        <div className='container form-group text-center row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h3>Sales Total (Internal, Partner, Offline, Distributor)</h3>
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
          <div className='text-xs col-md-12 table-responsive'>
            {dataChart && (
              <table className='table table-bordered table-sm'>
                <thead className='bg-success'>
                  <tr>
                    <th></th>
                    {dataChart.internal.map((menuItem, idx) => (
                      <td key={idx}>{menuItem.x}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <button
                        className='btn btn-xs'
                        style={{ backgroundColor: "#619A3F" }}
                      />
                      INTERNAL
                    </td>
                    {dataChart.internal.map((menuItem, idx) => (
                      <td className='text-right' key={idx}>
                        <NumericFormat
                          displayType='text'
                          thousandSeparator=','
                          value={menuItem.y}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>
                      <button
                        className='btn btn-xs'
                        style={{ backgroundColor: "#FF9E1D" }}
                      />
                      PARTNER
                    </td>
                    {dataChart.partner.map((menuItem, idx) => (
                      <td className='text-right' key={idx}>
                        <NumericFormat
                          displayType='text'
                          thousandSeparator=','
                          value={menuItem.y}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>
                      <button
                        className='btn btn-xs'
                        style={{ backgroundColor: "#D9E021" }}
                      />
                      OFFLINE
                    </td>
                    {dataChart.offline.map((menuItem, idx) => (
                      <td className='text-right' key={idx}>
                        <NumericFormat
                          displayType='text'
                          thousandSeparator=','
                          value={menuItem.y}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>
                      <button
                        className='btn btn-xs'
                        style={{ backgroundColor: "#06AAFF" }}
                      />
                      DISTRIBUTOR
                    </td>
                    {dataChart.distribusi.map((menuItem, idx) => (
                      <td className='text-right' key={idx}>
                        <NumericFormat
                          displayType='text'
                          thousandSeparator=','
                          value={menuItem.y}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>
                      <button
                        className='btn btn-xs'
                        style={{ backgroundColor: "#5EEAD1" }}
                      />
                      Kumulatif Target
                    </td>
                    {dataChart.target.map((menuItem, idx) => (
                      <td className='text-right' key={idx}>
                        <NumericFormat
                          displayType='text'
                          thousandSeparator=','
                          value={menuItem.y}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>
                      <button
                        className='btn btn-xs'
                        style={{ backgroundColor: "#8C63B8" }}
                      />
                      Kumuatif Omset
                    </td>
                    {dataChart.omset.map((menuItem, idx) => (
                      <td className='text-right' key={idx}>
                        <NumericFormat
                          displayType='text'
                          thousandSeparator=','
                          value={menuItem.y}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>
                      <button
                        className='btn btn-xs'
                        style={{ backgroundColor: "#FB9A99" }}
                      />
                      Selisih Target & Omset
                    </td>
                    {hasil.map((menuItem, idx) => (
                      <td className='text-right' key={idx}>
                        <NumericFormat
                          displayType='text'
                          thousandSeparator=','
                          value={menuItem.y}
                        />
                      </td>
                    ))}
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

export default SalesTotal;
