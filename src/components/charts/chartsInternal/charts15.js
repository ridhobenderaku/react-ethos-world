import React, { useState, useEffect } from "react";
import getCharts from "../../../api/getCharts";
import { Bar } from "react-chartjs-2";
import Select from "react-select";
import Loading from "../loading";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      display: false,
    },
  },
};

const ChartsInternal6 = () => {
  const [dataChart, setChart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (sessionStorage.getItem("chart")) {
      // Restore the contents of the text field
      const data = JSON.parse(sessionStorage.getItem("chart"));
      setChart(data);
    } else {
      getCharts().then((data) => {
        setChart(data);
        // Save data to sessionStorage
        sessionStorage.setItem("chart", JSON.stringify(data));
      });
    }
    setIsLoading(false);
  }, []);

  const data = {
    datasets: [
      {
        label: "Akuisisi",
        data: dataChart,
        backgroundColor: "#619A3F",
        type: "bar",
      },
      {
        label: "CRM",
        data: dataChart,
        backgroundColor: "#D9E021",
        type: "bar",
      },
      {
        label: "Rasio",
        data: dataChart,
        backgroundColor: "#9C9C9C",
        borderColor: "#9C9C9C",
        type: "line",
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
        <div className='container form-group row'>
          <div className='col-md-6 text-center'>
            <h3>Pencapaian CRM Internal Berdasarkan Omset Akuisisi</h3>
            <i className='nama'>
              *Belum dikurangi return, sales April menggunakan sales tanggal
              terupdate
            </i>
          </div>
          <div className='col-md-6'>
            <h6 className='nama'>SKU</h6>
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
          <h1>URUNG BERES!!</h1>
          {isLoading && <Loading />}
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default ChartsInternal6;
