import React, { useState, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import ItemPreview from "../../attachment/itemPreview";
import Attachment from "../../attachment/attachment";
import ActionButton from "../../button/actionButton";
import { uploadImage, deleteImage } from "../../../api/imageApi";
import {
  addBerbintangIde,
  arsipIde,
  deleteIde,
  removeBerbintangIde,
  ubahIde,
} from "../../../api/ideApi";
import Card from "../../pesan/detailPesan/card";
import BagikanIdeModal from "../bagikanIdeModal";

function EditDetailIde({ handleGoBack, type, user, dataIde }) {
  const navigate = useNavigate();
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [form, setForm] = useState(dataIde);
  const [uploadMessage, setsUploadMessage] = useState("");
  const [isBerbintang, setIsBerbintang] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleOnEditorStateChange = (editorState) => {
    setDescription(editorState);
    setForm((prevData) => ({
      ...prevData,
      isinya: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const handleCreateMessage = (item) => (event) => {
    event.preventDefault();
    setForm({ ...form, [item]: event.target.value });
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = form.filenya ? form.filenya : [];
        nd.push({ link: data.filename, namafile: data.namafile });
        setForm((prevData) => ({
          ...prevData,
          filenya: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(form.filenya[index].link);
    if (data) {
      setForm((prevData) => ({
        ...prevData,
        filenya: form.filenya.filter((data) => data !== form.filenya[index]),
      }));
    }
  };

  const handleUpdateIde = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const resp = await ubahIde(
      user.id,
      form.idnyaide,
      user.fullname,
      form.judul,
      form.isinya,
      form.filenya,
      form.tim
    );
    setIsSubmiting(false);
    if (resp && resp.data.code === 200) navigate(`/ide/ruangide`);
  };

  const deleteIdenya = async () => {
    const res = await deleteIde([{ id: form.idnyaide, authId: user.id }]);
    if (res && res.data.code === 200) {
      navigate(-1);
    }
  };

  const handleDeleteIde = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus ide! ",
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
        deleteIdenya();
      }
    });
  };

  const handleIdeBerbintang = async (isBerbintang, idIde) => {
    let resp;
    if (isBerbintang) {
      resp = await removeBerbintangIde(user.id, user.fullname, idIde);
    } else {
      resp = await addBerbintangIde(user.id, user.fullname, idIde);
    }
  };

  const handleArsipIde = async (e) => {
    e.preventDefault();
    const res = await arsipIde(user.id, user.fullname, form.idnyaide);
    if (res && res.data.code === 200) {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (dataIde) {
      if (dataIde.berbintang) {
        dataIde.berbintang.forEach((element) => {
          if (Number(element.id) === user.id) setIsBerbintang(true);
        });
      }
      setDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(dataIde.isinya))
        )
      );
    }
  }, [dataIde]);

  return (
    <Card
      title={
        <div
          style={{ gap: "1rem" }}
          className="d-flex flex-column-reverse  flex-sm-row align-items-sm-center justify-content-sm-between "
        >
          <div style={{ gap: "0.5rem" }} className="d-flex">
            <i
              style={{ cursor: "pointer" }}
              onClick={handleGoBack}
              className="fas fa-arrow-left nama"
            />
            <i className="fas fa-edit nama"> Edit Ide</i>
          </div>

          <div style={{ gap: "0.3rem", marginLeft: "auto" }} className="d-flex">
            {type === "arsip" && <p>Diarsipkan</p>}
            <div>
              <button className="btn btn-default btn-sm">
                <i
                  className={`fas fa-star ${
                    isBerbintang ? "text-warning" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleIdeBerbintang(isBerbintang, form.idnyaide);
                    setIsBerbintang(!isBerbintang);
                  }}
                />
              </button>
            </div>
            {type !== "arsip" && (
              <div>
                <button
                  onClick={handleArsipIde}
                  className="btn btn-default btn-sm"
                >
                  <i className="fas fa-archive" />
                </button>
              </div>
            )}

            <div>
              <button
                onClick={handleDeleteIde}
                className="btn btn-default btn-sm mr-1"
              >
                <i className="fas fa-trash-alt" />
              </button>
            </div>
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
      }
      body={
        <>
          <BagikanIdeModal dataIde={form} type="edit" setDataIde={setForm} />
          <div className="row">
            <div className="form-group col-md-12">
              <input
                className="form-control"
                placeholder="Judul:"
                value={form.judul}
                onChange={handleCreateMessage("judul")}
              />
            </div>
          </div>
          <div className="card card-light">
            <div className="card-header">
              <h3 className="card-title nama">Isi Ide</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleOnEditorStateChange}
                />
              </div>
            </div>
          </div>

          <ItemPreview
            data={form.filenya}
            handleDeleteImage={handleDeleteImage}
          />

          <Attachment
            isUploading={uploadMessage === "" ? false : true}
            handleUploadImage={handleUploadImage}
          />
        </>
      }
      footer={
        <>
          {type !== "arsip" && type !== "sampah" && (
            <div style={{ gap: "15px" }} className="float-right d-flex">
              <ActionButton
                disabled={
                  form.judul !== "" && form.isinya !== "" ? false : true
                }
                type="submit"
                dataToggle="modal"
                dataTarget="#bagikanIdeModal"
                icon="fas fa-users"
                text=" Bagikan"
              />
              <ActionButton
                disabled={
                  form.judul !== "" && form.isinya !== ""
                    ? false
                    : true && !isSubmiting
                }
                type="submit"
                onClick={handleUpdateIde}
                variant="success"
                icon="far fa-envelope"
                text=" Simpan"
              />
            </div>
          )}

          {type === "sampah" && (
            <div style={{ gap: "5px" }} className="float-right d-flex">
              <ActionButton
                type="submit"
                icon="fas fa-file-upload"
                text=" Pulihkan"
                variant="success"
              />
              <ActionButton
                type="submit"
                icon="fas fa-trash-alt"
                text=" Hapus Selamanya"
                variant="danger"
              />
            </div>
          )}
        </>
      }
    />
  );
}

export default EditDetailIde;
