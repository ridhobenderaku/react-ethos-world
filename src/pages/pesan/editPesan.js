import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import { useParams } from "react-router-dom";

import {
  getPesanById,
  tambahPesan,
  tambahPesanDraft,
  tambahPesanDraftToSend,
} from "../../api/pesanApi";
import { getUsers } from "../../api/pesanApi";
import { ReactContext } from "../../context/AuthProvider";
import { deleteImage, uploadImage } from "../../api/imageApi";
import ItemPreview from "../../components/attachment/itemPreview";
import Attachment from "../../components/attachment/attachment";
import ActionButton from "../../components/button/actionButton";

export default function EditPesan() {
  const { id } = useParams();
  const { user } = useContext(ReactContext);
  const navigate = useNavigate();
  const [uploadMessage, setsUploadMessage] = useState("");
  const [dataOptionUsers, setDataOptionUsers] = useState(null);
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [dataPesan, setDataPesan] = useState({
    filenya: [],
    id: "",
    idkepada: 0,
    idpengirim: 0,
    isi: "",
    kepada: [],
    pengirim: "",
    statusnya: "",
    subjek: "",
    tgl: "",
  });
  const [isSubmiting, setisSubmiting] = useState(false);

  const getData = async () => {
    const res = await getPesanById(id);
    if (res) {
      if (res[0].kepada) {
        res[0].kepada = res[0].kepada.map((item) => {
          return { value: item.id, label: item.username };
        });
      } else res[0].kepada = [];

      setDataPesan(res[0]);
      if (res[0].isi)
        setDescription(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(res[0].isi))
          )
        );
    }
  };

  const checkisValidDraft = () => {
    let count = 0;
    if (!dataPesan.kepada || dataPesan.kepada.length === 0) count++;
    if (dataPesan.isi === "") count++;
    if (dataPesan.subjek === "") count++;
    return count < 3 ? true : false;
  };

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
    setDataPesan((prevData) => ({
      ...prevData,
      isi: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();

    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = dataPesan.filenya ? dataPesan.filenya : [];
        nd.push({ link: data.filename, namafile: data.namafile });
        setDataPesan((prevData) => ({
          ...prevData,
          filenya: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max filenya size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(dataPesan.filenya[index].link);
    if (data) {
      setDataPesan((prevData) => ({
        ...prevData,
        filenya: dataPesan.filenya.filter(
          (data) => data !== dataPesan.filenya[index]
        ),
      }));
    }
  };

  const handleCreateMessage = (item) => (event) => {
    setDataPesan({ ...dataPesan, [item]: event.target.value });
  };
  const handleChangeSelect = (selectedOptions, type) => {
    setDataPesan((prevData) => ({
      ...prevData,
      [type]: selectedOptions,
    }));
  };

  const handleSendPesan = async (e) => {
    setisSubmiting(true);

    const resp = await tambahPesanDraftToSend(
      dataPesan.idpesan,
      user.id,
      user.fullname,
      dataPesan.kepada.map((item) => {
        return { id: item.value, username: item.label, read: "false" };
      }),
      dataPesan.subjek,
      dataPesan.filenya,
      dataPesan.isi,
      0
    );
    setisSubmiting(false);

    if (resp && resp.data.code === 200) {
      navigate("/pesan/terkirim");
    }
  };

  const handleDraftPesan = async (e) => {
    e.preventDefault();
    const resp = await tambahPesanDraft(
      dataPesan.idpesan,
      user.id,
      user.fullname,
      dataPesan.kepada.map((item) => {
        return { id: item.value, username: item.label, read: "false" };
      }),
      dataPesan.subjek,
      dataPesan.file,
      dataPesan.isi,
      1
    );
    if (resp && resp.data.code === 200) {
      navigate("/pesan/draft");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res) {
        setDataOptionUsers(
          JSON.parse(atob(sessionStorage.getItem("dataUsers")))
            .map((user) => ({
              value: user.id,
              label: user.nama,
            }))
            .filter((data) => {
              return data.value !== user.id;
            })
        );
      }
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className='col-md-9'>
        {dataPesan && (
          <div className='card card-outline'>
            <div className='card-header'>
              <h3
                style={{ gap: "10px" }}
                className='card-title d-flex align-items-center'>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleBack}
                  className='fas fa-arrow-left'
                />
                <i className='fas fa-filenya-alt'> Draft Pesan</i>
              </h3>
            </div>

            <form>
              <div className='card-body'>
                <div className='row'>
                  <div className='form-group col-md-12'>
                    <Select
                      options={dataOptionUsers}
                      placeholder='Kepada:'
                      isMulti
                      name='colors'
                      value={dataPesan.kepada}
                      className='basic-multi-select'
                      classNamePrefix='select'
                      onChange={(selectedOptions) =>
                        handleChangeSelect(selectedOptions, "kepada")
                      }
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group col-md-12'>
                    <input
                      className='form-control'
                      placeholder='Subjek:'
                      maxLength='20'
                      value={dataPesan.subjek}
                      onChange={handleCreateMessage("subjek")}
                    />
                  </div>
                </div>
                <div className='card card-light'>
                  <div className='card-header'>
                    <h3 className='card-title nama'>Isi Pesan</h3>
                  </div>
                  <div className='card-body'>
                    <div className='form-group'>
                      <Editor
                        editorState={description}
                        toolbarClassName='toolbarClassName'
                        wrapperClassName='wrapperClassName'
                        editorClassName='editorClassName'
                        onEditorStateChange={onEditorStateChange}
                      />
                    </div>
                  </div>
                </div>
                <ItemPreview
                  data={dataPesan.filenya}
                  handleDeleteImage={handleDeleteImage}
                />
                <Attachment
                  isUploading={uploadMessage === "" ? false : true}
                  handleUploadImage={handleUploadImage}
                />
              </div>
            </form>

            <div className='card-footer'>
              <div style={{ gap: "15px" }} className='float-right d-flex'>
                <ActionButton
                  disabled={checkisValidDraft() ? false : true}
                  type='button'
                  onClick={handleDraftPesan}
                  icon='fas fa-file-alt'
                  text=' Draft'
                />
                <ActionButton
                  disabled={
                    !isSubmiting &&
                    dataPesan.kepada &&
                    dataPesan.isi !== "" &&
                    dataPesan.isi !== undefined &&
                    dataPesan.subjek !== ""
                      ? false
                      : true
                  }
                  variant='success'
                  type='submit'
                  onClick={handleSendPesan}
                  icon='fas fa-paper-plane'
                  text=' Kirim'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
