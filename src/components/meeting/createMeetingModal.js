import React, { useState, useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import Select from "react-select";
import { ReactContext } from "../../context/AuthProvider";
import { useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import DateRangePicker from "react-bootstrap-daterangepicker";

import { uploadImage, deleteImage } from "../../api/imageApi";
import { tambahMeeting } from "../../api/meetingApi";
import { getUsers } from "../../api/pesanApi";
import ItemPreview from "../attachment/itemPreview";
import Attachment from "../attachment/attachment";
import ActionButton from "../button/actionButton";
import { convertToLocalISOString } from "../../utils/dateConversion";

function CreateMeetingModal({ handleRefresh }) {
  const { user } = useContext(ReactContext);
  const defaultForm = {
    judul: "",
    anggota: [],
    jenis: "online",
    alamat: "",
    deskripsi: "",
    lampiran: null,
    authId: user.id,
    tglAwal: null,
    tglAkhir: null,
  };

  const [dataUsers, setDataUsers] = useState([]);
  const [uploadMessage, setsUploadMessage] = useState("");
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [form, setDataForm] = useState(defaultForm);
  const [error, setEror] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const optionsUser = dataUsers
    ?.map((item) => ({
      value: item.id,
      label: item.nama,
    }))
    .filter((data) => data.value !== user?.id);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
    setDataForm((prevData) => ({
      ...prevData,
      deskripsi: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const isValidDate = (start, end) => {
    const currentDate = new Date().getTime();
    const startDate = start.getTime() + 100;
    const endDate = end.getTime() + 100;
    if (startDate < currentDate || endDate < currentDate) {
      setEror("mohon isi tanggal dengan value minimal tanggal sekarang");
      return false;
    } else {
      setEror("");

      return true;
    }
  };
  const handleCreateMeeting = (item, value) => {
    setDataForm({ ...form, [item]: value });
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = form.lampiran ? form.lampiran : [];
        nd.push({ link: data.filename, namafile: data.namafile });
        setDataForm((prevData) => ({
          ...prevData,
          lampiran: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();
    const data = await deleteImage(form.lampiran[index].link);
    if (data) {
      setDataForm((prevData) => ({
        ...prevData,
        lampiran: form.lampiran.filter((data) => data !== form.lampiran[index]),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const validAnggota = form.anggota.map((data) => {
      return { id: data.value.toString(), nama: data.label, editor: "member" };
    });
    const data = await tambahMeeting(
      form.authId,
      form.judul,
      `${convertToLocalISOString(form.tglAwal)}/${convertToLocalISOString(
        form.tglAkhir
      )}`,
      validAnggota,
      form.jenis,
      form.alamat,
      form.deskripsi,
      form.lampiran
    );
    setIsSubmiting(false);
    if (data && data.status === 200) {
      setDataForm(defaultForm);
      setDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(""))
        )
      );

      handleRefresh();
    }
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    setDataForm(defaultForm);
    setDescription(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(""))
      )
    );
  };
  useEffect(() => {
    if (sessionStorage.getItem("dataUsers")) {
      setDataUsers(JSON.parse(atob(sessionStorage.getItem("dataUsers"))));
    } else {
      getUsers().then((res) => {
        if (res) {
          sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
          setDataUsers(res);
        }
      });
    }
  }, []);
  useEffect(() => {
    window.$("#createMeetingModal").on("shown.bs.modal", function (e) {
      setDataForm({ ...form, tglAwal: new Date(), tglAkhir: new Date() });
    });

    window.$("#createMeetingModal").on("hidden.bs.modal", function (e) {
      setDataForm({ ...form, tglAwal: new Date(), tglAkhir: new Date() });
    });
  }, []);

  return (
    <div className='modal fade' id='createMeetingModal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h3 className='modal-title' id='createMeetingModal'>
              Meeting baru
            </h3>

            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label className='nama'>Judul Meeting</label>
              <input
                type='text'
                placeholder='judul'
                className='form-control'
                value={form.judul}
                maxLength={100}
                onChange={(e) => {
                  handleCreateMeeting("judul", e.target.value);
                }}
              />
            </div>
            <div className='form-group d-flex flex-column'>
              <label className='nama'>Jadwal Meeting</label>
              {error !== "" && <span style={{ color: "red" }}>{error}</span>}

              {form.tglAwal && (
                <div className='form-group'>
                  <DateRangePicker
                    initialSettings={{
                      locale: {
                        format: "DD/M/YY hh:mm A",
                      },
                      startDate: new Date(form.tglAwal),
                      endDate: new Date(form.tglAkhir),
                      timePicker: true,
                    }}
                    onApply={(event, picker) => {
                      isValidDate(
                        new Date(picker.startDate),
                        new Date(picker.endDate)
                      );
                      setDataForm({
                        ...form,
                        tglAwal: new Date(picker.startDate),
                        tglAkhir: new Date(picker.endDate),
                      });
                    }}>
                    <input className='form-control' type='text' />
                  </DateRangePicker>
                </div>
              )}
            </div>

            <div className='form-group'>
              <label className='nama'>Anggota Meeting</label>
              <Select
                options={optionsUser}
                placeholder='Kepada:'
                isMulti
                name='colors'
                className='basic-multi-select'
                classNamePrefix='select'
                value={form.anggota}
                onChange={(selectedOptions) =>
                  handleCreateMeeting("anggota", selectedOptions)
                }
              />
            </div>
            <div className='col d-flex flex-column mt-2 mb-4'>
              <h5 style={{ color: "#619A3F" }}>Jenis Meeting</h5>
              <div
                style={{ color: "#619A3F" }}
                className='d-flex align-items-center'>
                <div className='form-check form-check-inline'>
                  <input
                    onChange={(e) => {
                      handleCreateMeeting("jenis", e.target.value);
                    }}
                    className='form-check-input'
                    type='radio'
                    name='inlineRadioOptions'
                    id='offline'
                    checked={form.jenis === "offline"}
                    value='offline'
                  />
                  <label className='form-check-label' htmlFor='inlineRadio1'>
                    Offline
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    onChange={(e) => {
                      handleCreateMeeting("jenis", e.target.value);
                    }}
                    className='form-check-input'
                    type='radio'
                    name='inlineRadioOptions'
                    id='online'
                    checked={form.jenis === "online"}
                    value='online'
                  />
                  <label className='form-check-label' htmlFor='inlineRadio2'>
                    Online
                  </label>
                </div>
              </div>
            </div>
            {form.jenis !== "" && (
              <div className='form-group'>
                <label className='nama'>
                  {form.jenis === "online" ? "Link" : "Alamat"} Meeting
                </label>
                <input
                  type='text'
                  placeholder={form.jenis === "online" ? "link" : "alamat"}
                  className='form-control'
                  value={form.alamat}
                  onChange={(e) => {
                    handleCreateMeeting("alamat", e.target.value);
                  }}
                />
              </div>
            )}

            <div className='form-group'>
              <Editor
                editorState={description}
                toolbarClassName='toolbarClassName'
                wrapperClassName='wrapperClassName'
                editorClassName='editorClassName'
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <ItemPreview
              data={form.lampiran}
              handleDeleteImage={handleDeleteImage}
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
              className='w-25 pull-right'
            />
            <ActionButton
              text=' Buat'
              icon='fas fa-file'
              className='w-25'
              dataDismis='modal'
              onClick={handleSubmit}
              disabled={
                form.judul === "" ||
                form.alamat === "" ||
                form.deskripsi === "" ||
                form.tglAwal === "" ||
                form.tglAkhir === "" ||
                form.anggota.length === 0 ||
                error !== "" ||
                isSubmiting
                  ? true
                  : false
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMeetingModal;
