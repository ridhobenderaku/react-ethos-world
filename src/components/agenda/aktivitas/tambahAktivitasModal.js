import React, { useState, useContext, useEffect, useRef } from "react";

import { ReactContext } from "../../../context/AuthProvider";
import { tambahAktifitas } from "../../../api/agendaApi";
import { uploadImage, deleteImage } from "../../../api/imageApi";
import ItemPreview from "../../attachment/itemPreview";
import Attachment from "../../attachment/attachment";
import ActionButton from "../../button/actionButton";

export default function TambahAktivitasModal({ handleRefresh }) {
  const { user } = useContext(ReactContext);
  const [uploadMessage, setsUploadMessage] = useState("");
  const defaultForm = {
    authId: user.id,
    id: "",
    nama: "",
    deskripsi: "",
    filenya: [],
  };
  const [dataAktifitas, setDataAktifitas] = useState(defaultForm);

  const handleCreateAktifitas = (item) => (event) => {
    setDataAktifitas({ ...dataAktifitas, [item]: event.target.value });
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = dataAktifitas.filenya;
        nd.push({ link: data.filename, namafile: data.namafile });
        setDataAktifitas((prevData) => ({
          ...prevData,
          filenya: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();
    const data = await deleteImage(dataAktifitas.filenya[index].link);
    if (data) {
      setDataAktifitas((prevData) => ({
        ...prevData,
        filenya: dataAktifitas.filenya.filter(
          (data) => data !== dataAktifitas.filenya[index]
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await tambahAktifitas(
      user.id,
      dataAktifitas.nama,
      new Date().toLocaleString(),
      dataAktifitas.deskripsi,
      dataAktifitas.filenya
    );
    if (resp.data.code === 200) {
      setDataAktifitas(defaultForm);
      handleRefresh();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setDataAktifitas(defaultForm);
  };

  return (
    <>
      <div className='modal fade' id='modal-tambah-aktivitas'>
        <div className='modal-dialog'>
          {dataAktifitas && (
            <div className='modal-content'>
              <div className='modal-header'>
                <h3 className='modal-title'>Buat Aktivitas Hari Ini</h3>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label className='nama'>Nama Aktivitas</label>
                  <input
                    maxLength={50}
                    className='form-control'
                    value={dataAktifitas.nama}
                    placeholder='nama aktivitas ...'
                    onChange={handleCreateAktifitas("nama")}
                  />
                </div>
                <div className='form-group'>
                  <label className='nama'>Deskripsi Aktivitas</label>
                  <textarea
                    id='compose-textarea'
                    className='form-control'
                    placeholder='deskripsi aktivitas ...'
                    value={dataAktifitas.deskripsi}
                    onChange={handleCreateAktifitas("deskripsi")}
                  />
                </div>
                <ItemPreview
                  handleDeleteImage={handleDeleteImage}
                  data={dataAktifitas.filenya ? dataAktifitas.filenya : null}
                />
                <Attachment
                  isUploading={uploadMessage === "" ? false : true}
                  handleUploadImage={handleUploadImage}
                />
              </div>
              <div className='modal-footer'>
                <ActionButton
                  text=' Batal'
                  icon='fas fa-times'
                  dataDismis='modal'
                  variant='danger'
                  onClick={handleCancel}
                />
                <ActionButton
                  text=' Buat'
                  icon='fas fa-file'
                  dataDismis='modal'
                  onClick={handleSubmit}
                  disabled={
                    dataAktifitas.nama === "" || dataAktifitas.deskripsi === ""
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
