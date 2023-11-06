import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";

import { ReactContext } from "../../../context/AuthProvider";
import {
  editAktifitas,
  getDataAktivitas,
  getDataAktivitasById,
} from "../../../api/agendaApi";
import { uploadImage, deleteImage } from "../../../api/imageApi";
import ItemPreview from "../../attachment/itemPreview";
import Attachment from "../../attachment/attachment";
import ActionButton from "../../button/actionButton";

export default function EditAktivitasModal({
  selectedId,
  setToggleEditModal,
  handleRefresh,
}) {
  const { user } = useContext(ReactContext);
  const [uploadMessage, setsUploadMessage] = useState("");
  const [dataAktifitas, setDataAktifitas] = useState({
    authId: user.id,
    id: "",
    nama: "",
    deskripsi: "",
    filenya: [],
  });

  const getData = async () => {
    const data = await getDataAktivitasById(selectedId);
    if (data) setDataAktifitas(data.data[0]);
  };

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
        const nd = dataAktifitas.filenya ? dataAktifitas.filenya : [];
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

  const handleSubmit = async () => {
    setToggleEditModal(false);
    const resp = await editAktifitas(
      dataAktifitas.id,
      dataAktifitas.nama,
      new Date().toLocaleString(),
      dataAktifitas.deskripsi,
      dataAktifitas.filenya
    );

    handleRefresh();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='modal fade' id='modal-edit-aktivitas'>
        <div className='modal-dialog'>
          {dataAktifitas && (
            <div className='modal-content'>
              <div className='modal-header'>
                <h3 className='modal-title'>Edit Aktivitas</h3>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <input
                    maxLength={50}
                    className='form-control'
                    value={dataAktifitas.nama}
                    placeholder='nama aktifitas'
                    onChange={handleCreateAktifitas("nama")}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    id='compose-textarea'
                    className='form-control'
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
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleEditModal(false);
                  }}
                />
                <ActionButton
                  text=' Edit'
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
