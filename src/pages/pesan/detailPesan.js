import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { ReactContext } from "../../context/AuthProvider";

import {
  arsipPesan,
  deletePesan,
  getPesanById,
  pulihkanPesan,
  hapusPesanBerbintang,
  setPesanBerbintang,
  pulihkanPesanSampah,
  deletePesanSelamanya,
} from "../../api/pesanApi";

import Lampiran from "../../components/lampiran";

import ActionButton from "../../components/button/actionButton";
import ReplyMessageCard from "../../components/pesan/detailPesan/replyMessageCard";
import Card from "../../components/pesan/detailPesan/card";
import { convertToDateTimeWithName } from "../../utils/dateConversion";
import ReplyForm from "../../components/pesan/detailPesan/replyForm";

export default function DetailPesan({ type }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(ReactContext);
  const [dataPesan, setDataPesan] = useState(null);
  const [isBerbintang, setisBerbintang] = useState(
    type === "berbintang" ? true : false
  );
  const [showBalas, setShowBalas] = useState(false);

  const statusField = () => {
    if (type === "arsip" || type === "sampah")
      return (
        <p
          style={{
            backgroundColor: "#BABABA",
            color: "#ffffff",
          }}
          className='p-1 rounded m-0 '>
          {type === "arsip" ? "diarsipkan" : "dihapus"}
        </p>
      );
  };

  const balasField = () => {
    if (
      (!dataPesan.komentar && type === "kontakmasuk") ||
      (!dataPesan.komentar && type === "terkirim") ||
      (!dataPesan.komentar && type === "berbintang") ||
      (dataPesan.komentar &&
        dataPesan.komentar.length === 0 &&
        type === "kontakmasuk") ||
      (dataPesan.komentar &&
        dataPesan.komentar.length === 0 &&
        type === "terkirim") ||
      (dataPesan.komentar &&
        dataPesan.komentar.length === 0 &&
        type === "berbintang")
    )
      return (
        <div className='float-right'>
          <button
            type='button'
            className='btn btn-primary mr-2'
            onClick={(e) => {
              e.preventDefault();
              setShowBalas(true);
            }}>
            <i className='fas fa-reply' /> Balas
          </button>
          {/* <button type='submit' className='btn btn-primary'>
      <i className='fas fa-share' />
      Teruskan
    </button> */}
        </div>
      );
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getData = async () => {
    const data = await getPesanById(id);

    if (data) {
      if (data[0].berbintang)
        data[0].berbintang.forEach((element) => {
          if (Number(element.id) === user.id) setisBerbintang(true);
        });
      setDataPesan(data[0]);
    }
  };
  const handleArsipPesan = async (e) => {
    e.preventDefault();
    const resp = await arsipPesan(id, user.id, user.fullname);
    if (resp && resp.data.code === 200) navigate(-1);
  };
  const handlePesanBerbintang = async (e) => {
    e.preventDefault();
    let resp;
    if (isBerbintang) {
      resp = await hapusPesanBerbintang(id, user.id, user.fullname);
    } else {
      resp = await setPesanBerbintang(id, user.id, user.fullname);
    }
    if (resp && resp.code === 200) setisBerbintang(!isBerbintang);
  };
  const handlePulihkanPesan = async (e) => {
    e.preventDefault();
    if (type === "sampah") {
      const resp = await pulihkanPesanSampah(id, user.id);
      if (resp && resp.code === 200) navigate("/pesan/sampah");
    } else {
      const resp = await pulihkanPesan(id, user.id);
      if (resp && resp.code === 200) navigate(-1);
    }
  };

  const hapusPermanenPesan = async () => {
    const resp = await deletePesanSelamanya([
      {
        id: id,
        authId: user.id.toString(),
        username: user.fullname,
      },
    ]);
    if (resp && resp.code === 200) handleBack();
  };

  const hapusPesan = async () => {
    const resp = await deletePesan([
      {
        id: id,
        authId: user.id.toString(),
        username: user.fullname,
      },
    ]);
    if (resp && resp.code === 200) handleBack();
  };
  const handleDeletePesan = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus pesan! ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "popup-alert-small",
        icon: "icon",
        title: "title",
        htmlContainer: "htmlContainer",
        confirmButton: "btn-delete",
        denyButton: "btn-cancel",
        cancelButton: "btn-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        hapusPesan();
      }
    });
  };
  const handleDeletePermanenPesan = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus pesan selamanya! ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus Selamanya!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "popup-alert-small",
        icon: "icon",
        title: "title",
        htmlContainer: "htmlContainer",
        confirmButton: "btn-delete",
        denyButton: "btn-cancel",
        cancelButton: "btn-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        hapusPermanenPesan();
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {dataPesan && (
        <div className='col-md-9'>
          <Card
            title={
              <div style={{ gap: "5px" }} className='d-flex align-items-center'>
                <i
                  style={{ cursor: "pointer" }}
                  className='fas fa-arrow-left mr-2 nama'
                  onClick={handleBack}
                />
                <i className='far fa-comments nama' />
                <span className='nama'>Baca Pesan</span>
              </div>
            }
            tools={
              <>
                <div className='btn-group'>
                  <button type='button' className='btn btn-default btn-sm'>
                    <i className='fas fa-chevron-left' />
                  </button>
                  <button type='button' className='btn btn-default btn-sm'>
                    <i className='fas fa-chevron-right' />
                  </button>
                </div>
              </>
            }
            body={
              <>
                <div
                  style={{ gap: "1rem" }}
                  className='row d-flex flex-column-reverse flex-sm-row'>
                  <div className='col d-flex justify-content-start flex-column'>
                    <h6 style={{ fontSize: "21px", fontWeight: "bold" }}>
                      {dataPesan.subjek}
                    </h6>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}>{`Dari : ${
                      dataPesan.pemilik[0].id === user.id ? " saya, " : ""
                    } ${dataPesan.pemilik[0].nama}`}</h4>
                    <p
                      style={{ fontSize: "12px", fontWeight: "normal" }}
                      className='text'>
                      {`Kepada: ${dataPesan.kepada.map(
                        (item) => item.username + ", "
                      )}`}
                    </p>
                  </div>
                  <div className='col d-flex justify-content-end'>
                    <div className='d-flex flex-column'>
                      <div className='text mb-2 align-self-end'>
                        {convertToDateTimeWithName(new Date(dataPesan.tgl))}
                      </div>
                      <div
                        style={{ gap: "0.5rem" }}
                        className='d-flex align-items-center justify-content-end'>
                        {type !== "sampah" && type !== "arsip" && (
                          <div>
                            <button
                              onClick={handlePesanBerbintang}
                              className='btn btn-default btn-xs text-center'>
                              <i
                                className={`fas fa-star text-sm ${
                                  isBerbintang ? "text-warning" : ""
                                }`}
                              />
                            </button>
                          </div>
                        )}
                        {type !== "arsip" && type !== "sampah" && (
                          <>
                            {/* <button className=' btn btn-default btn-xs text-center'>
                              <i className='fas fa-reply text-sm ' />
                            </button>
                            <button className=' btn btn-default btn-xs text-center'>
                              <i className='fas fa-reply-all text-sm ' />
                            </button>
                            <button className=' btn btn-default btn-xs text-center'>
                              <i className='fas fa-share text-sm ' />
                            </button> */}
                            <button
                              onClick={handleArsipPesan}
                              className=' btn btn-default btn-xs text-center'>
                              <i className='fas fa-archive text-sm ' />
                            </button>
                          </>
                        )}
                        {type !== "sampah" && (
                          <div>
                            <button
                              onClick={handleDeletePesan}
                              className='btn btn-default btn-xs text-center'>
                              <i className='fa fa-trash-alt text-sm ' />
                            </button>
                          </div>
                        )}
                        {statusField()}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: dataPesan?.isi }} />
                <Lampiran data={dataPesan.filenya ? dataPesan.filenya : null} />
              </>
            }
            footer={
              <>
                {balasField()}
                {type === "arsip" && (
                  <div className='float-right'>
                    <ActionButton
                      variant='primary'
                      type='submit'
                      onClick={handlePulihkanPesan}
                      icon='fas fa-file'
                      text=' Pulihkan'
                    />
                  </div>
                )}
                {type === "sampah" && (
                  <div style={{ gap: "1rem" }} className='float-right d-flex'>
                    <ActionButton
                      variant='primary'
                      type='submit'
                      onClick={handlePulihkanPesan}
                      icon='fas fa-file'
                      text=' Pulihkan'
                    />
                    <ActionButton
                      variant='danger'
                      type='submit'
                      onClick={handleDeletePermanenPesan}
                      icon='fas fa-trash-alt'
                      text=' Hapus Selamanya'
                    />
                  </div>
                )}
              </>
            }
          />
          {dataPesan.komentar &&
            dataPesan.komentar.map((data, index) => (
              <div key={index}>
                <ReplyMessageCard
                  pengirim={data.nama}
                  tgl={data.tgl}
                  isi={data.isi}
                  berbintang={data.berbintang}
                  file={data.filenya}
                  kepada={data.kepada}
                  isUser={data.idpengirim === user.id ? true : false}
                  footer={
                    index === dataPesan.komentar.length - 1 &&
                    type !== "arsip" &&
                    type !== "draft" &&
                    type !== "sampah" && (
                      <div className='align-self-end'>
                        <button
                          type='button'
                          className='btn btn-primary mr-2'
                          onClick={(e) => {
                            e.preventDefault();
                            setShowBalas(true);
                          }}>
                          <i className='fas fa-reply' /> Balas
                        </button>
                        {/* <button type='submit' className='btn btn-primary'>
                        <i className='fas fa-share' />
                        Teruskan
                      </button> */}
                      </div>
                    )
                  }
                />
              </div>
            ))}
          {showBalas && dataPesan && (
            <ReplyForm
              dataPesan={dataPesan}
              user={user}
              setShowBalas={setShowBalas}
              handleRefresh={getData}
            />
          )}
        </div>
      )}
    </>
  );
}
