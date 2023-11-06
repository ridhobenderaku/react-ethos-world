import React from "react";
import { Link } from "react-router-dom";

function index() {
  const productions = [
    { img: "/img/partner/bumiWijaya.png", title: "BUMI WIJAYA INDOJAMU" },
    { img: "/img/partner/tresnoJamu.svg", title: "PT. TRESNO JAMU INDONESIA" },
    { img: "/img/partner/wijayaFood.svg", title: "CV. WIJAYA FOOD" },

    //online distributor
  ];
  const online = [
    { img: "/img/partner/eblie.svg", title: "EBLIETHOS INDONESIA" },
    { img: "/img/partner/erdigma.svg", title: "ERHANESIA DIGIMA MUKTITAMA" },
    { img: "/img/partner/sigma.svg", title: "SIGMA DIGITAL NUSANTARA" },
    { img: "/img/partner/barareca.svg", title: "BARA RECA NIGORA" },
    { img: "/img/partner/purwokerto.svg", title: "POWERKERTO" },
    { img: "/img/partner/genah.svg", title: "GAWE BECIK NADHAH ANUGRAH" },
    { img: "/img/partner/migunani.svg", title: "MIGUNANI" },
    { img: "/img/partner/drimhouse.svg", title: "DRIMHOUSE" },
    { img: "/img/partner/aksara.svg", title: "AKSARA KREATIF INDONESIA" },
    { img: "/img/partner/albanna.svg", title: "ALBANNA DIGITAL" },
    { img: "/img/partner/uzhma.svg", title: "UZHMA WIPALA MAHASINUHU" },
    { img: "/img/partner/diagram.svg", title: "DIGITAL AKSA GENERASI MUDA" },
    { img: "/img/partner/digiherba.svg", title: "DIGI HERBA NUSANTARA" },
    { img: "/img/partner/namaperusahaan.svg", title: "NAMA PERUSAHAAN" },
    // { img: "/img/partner/albanna.svg", title: "ALBANNA DIGITAL" },
  ];

  const offline = [
    { img: "/img/partner/serayu.svg", title: "SERAYU Sumber Rejeki" },
  ];

  const logistics = [
    { img: "/img/partner/ethix.svg", title: "ETHIX.ID" },
    { img: "/img/partner/dethix.svg", title: "DETHIX" },
  ];

  const technology = [
    { img: "/img/partner/w.svg", title: "WAIZLY TECHNOLOGY" },
    { img: "/img/partner/bbs.svg", title: "BENDERAKU BERKIBAR SELALU" },
  ];

  return (
    <div className='content-wrapper'>
      <div className='container-fluid mt-2'>
        <div className='card '>
          <div className='card-body d-flex flex-column'>
            <h1 className='nama text-center'>Ruang Partner</h1>
            <h3 className='nama'>Production:</h3>
            <div style={{ gap: "1rem" }} className='row mb-2'>
              {productions.map((data, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: "#D8E6CF" }}
                  className='col-md-2  col-sm-5 rounded p-2'>
                  <Link to=''>
                    <div
                      style={{ gap: "0.5rem" }}
                      className=' d-flex flex-column align-items-center'>
                      <img
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "104px",
                        }}
                        src={data.img}
                      />
                      <div style={{ color: "#000000" }} className='text-center'>
                        <h5>{data.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <h3 className='nama'>Online Distributor:</h3>
            <div
              style={{ gap: "1rem", width: "fit-content" }}
              className='row mb-2 '>
              {online.map((data, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: "#D8E6CF" }}
                  className='col-md-2 col-sm-5 rounded p-2'>
                  <Link to=''>
                    <div
                      style={{ gap: "0.5rem" }}
                      className=' d-flex flex-column align-items-center '>
                      <img
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "104px",
                        }}
                        src={data.img}
                      />
                      <div style={{ color: "#000000" }} className='text-center'>
                        <h5>{data.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <h3 className='nama'>Offline Distributor:</h3>
            <div style={{ gap: "1rem" }} className='row mb-2'>
              {offline.map((data, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: "#D8E6CF" }}
                  className='col-md-2 col-sm-5 rounded p-2'>
                  <Link to=''>
                    <div
                      style={{ gap: "0.5rem" }}
                      className=' d-flex flex-column align-items-center'>
                      <img
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "104px",
                        }}
                        src={data.img}
                      />
                      <div style={{ color: "#000000" }} className='text-center'>
                        <h5>{data.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <h3 className='nama'>Logistics:</h3>
            <div style={{ gap: "1rem" }} className='row mb-2'>
              {logistics.map((data, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: "#D8E6CF" }}
                  className='col-md-2 col-sm-5 rounded p-2'>
                  <Link to=''>
                    <div
                      style={{ gap: "0.5rem" }}
                      className=' d-flex flex-column align-items-center'>
                      <img
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "104px",
                        }}
                        src={data.img}
                      />
                      <div style={{ color: "#000000" }} className='text-center'>
                        <h5>{data.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <h3 className='nama'>Technology Solution:</h3>
            <div style={{ gap: "1rem" }} className='row mb-2'>
              {technology.map((data, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: "#D8E6CF" }}
                  className='col-md-2 col-sm-5 rounded p-2'>
                  <Link to=''>
                    <div
                      style={{ gap: "0.5rem" }}
                      className=' d-flex flex-column align-items-center'>
                      <img
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "104px",
                        }}
                        src={data.img}
                      />
                      <div style={{ color: "#000000" }} className='text-center'>
                        <h5>{data.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
