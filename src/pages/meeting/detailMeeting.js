import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ReactContext } from "../../context/AuthProvider";
import { getDataMeetingById } from "../../api/meetingApi";
import { convertToDateTimeLocalString } from "../../utils/dateConversion";
import EditDetailMeeting from "../../components/meeting/detailMeeting/editDetailMeeting";
import ViewDetailMeeting from "../../components/meeting/detailMeeting/viewDetailMeeting";
import ActionButton from "../../components/button/actionButton";

function DetailMeeting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setNotifikasi } = useContext(ReactContext);
  const [dataMeeting, setDataMeeting] = useState(null);
  const [isEditMode, setisEditMode] = useState(false);

  const getData = async () => {
    const resp = await getDataMeetingById(user.id, id);
    if (resp && resp.read && resp.read === 200) {
      setNotifikasi((prev) => {
        return {
          ...prev,
          meeting: prev.meeting === 1 ? 0 : prev.meeting - 1,
        };
      });
    }
    if (resp.data) {
      resp.data.tglAwal = convertToDateTimeLocalString(
        new Date(resp.data.tglAwal)
      );
      resp.data.tglAkhir = convertToDateTimeLocalString(
        new Date(resp.data.tglAkhir)
      );
      resp.data.anggota = resp.data.Penerima.map((item) => {
        return {
          id: item.id,
          label: item.nama,
          editor: item.editor,
          read: item.read,
          arsip: item.arsip,
          delete: item.delete,
        };
      });
      resp.data.alamat = resp.data.atribut[0].alamat;
      resp.data.jenis = resp.data.atribut[0].jenis;
      setDataMeeting(resp.data);
    }
  };

  const validasiMeetingByTgl = (tglAwal, tglAkhir) => {
    let dateAwalMeeting = new Date(tglAwal).getTime();
    let dateAkhirMeeting = new Date(tglAkhir).getTime();
    let currentDate = new Date().getTime();

    if (dateAwalMeeting < currentDate) {
      if (dateAkhirMeeting < currentDate) return "Selesai";
      else return "Berlangsung";
    } else return "Akan datang";
  };

  const handleBack = (e) => {
    e.preventDefault();

    navigate(-1);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    getData();
    setisEditMode(false);
  };

  const isUserAuthor = () => {
    let validasi = false;
    if (dataMeeting) {
      if (user.fullname === dataMeeting.namapembuat) validasi = true;
      else {
        dataMeeting.anggota.forEach((element) => {
          if (user.fullname === element.label) {
            if (element.editor === "editor") validasi = true;
          }
        });
      }
    }

    return validasi;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {dataMeeting && (
        <div className='wrapper'>
          <div className='content-wrapper'>
            <section className='content-header pl-3 pr-3'>
              <div className='container-fluid'>
                <div
                  style={{ gap: "15px" }}
                  className='row mb-2 d-flex flex-sm-row flex-column-reverse justify-content-between align-items-sm-center'>
                  <div
                    style={{ gap: "5px" }}
                    className='d-flex align-items-center'>
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={handleBack}
                      className='fas fa-arrow-left mr-2 nama'
                    />
                    <h1
                      style={{ color: "#619A3F" }}
                      className='judul-menu text-break w-100'>
                      {dataMeeting.judul}
                    </h1>
                  </div>
                  <div
                    style={{ gap: "5px", marginLeft: "auto" }}
                    className='d-flex align-items-center'>
                    {validasiMeetingByTgl(
                      dataMeeting.tglAwal,
                      dataMeeting.tglAkhir
                    ) === "Akan datang" && (
                      <p
                        style={{
                          backgroundColor: "#D9E021",
                          textAlign: "center",
                        }}
                        className='p-2 m-0 rounded'>
                        Akan datang
                      </p>
                    )}
                    {validasiMeetingByTgl(
                      dataMeeting.tglAwal,
                      dataMeeting.tglAkhir
                    ) === "Berlangsung" && (
                      <p
                        style={{
                          color: "#ffffff",
                          backgroundColor: "rgb(97, 154, 63)",
                          textAlign: "center",
                        }}
                        className='p-2 m-0 rounded'>
                        Berlangsung
                      </p>
                    )}
                    {validasiMeetingByTgl(
                      dataMeeting.tglAwal,
                      dataMeeting.tglAkhir
                    ) === "Selesai" && (
                      <>
                        <p
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#619a3f",
                            textAlign: "center",
                          }}
                          className='p-2 m-0 rounded'>
                          Selesai
                        </p>
                        {/* <div>
                          <button className='btn btn-default btn-sm'>
                            <i className='fas fa-archive' />
                          </button>
                        </div> */}
                      </>
                    )}
                    {isUserAuthor() && (
                      <div>
                        <ActionButton
                          onClick={(e) => {
                            e.preventDefault();
                            setisEditMode(true);
                          }}
                          type='submit'
                          variant='primary'
                          icon='fas fa-edit'
                          text=' Edit'
                        />
                      </div>
                    )}

                    {/* <div>
                <button className='btn btn-default btn-sm'>
                  <i className='fas fa-chevron-left' />
                </button>
              </div>
              <div>
                <button className='btn btn-default btn-sm'>
                  <i className='fas fa-chevron-right' />
                </button>
              </div> */}
                  </div>
                </div>
              </div>
            </section>
            {isEditMode ? (
              <EditDetailMeeting
                idMeeting={id}
                user={user}
                handleBack={handleBack}
                dataMeeting={dataMeeting}
                handleCancelEdit={handleCancelEdit}
              />
            ) : (
              <ViewDetailMeeting
                handleBack={handleBack}
                dataMeeting={dataMeeting}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DetailMeeting;
