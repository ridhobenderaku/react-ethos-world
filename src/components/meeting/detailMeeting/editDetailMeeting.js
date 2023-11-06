import React, { useState, useContext, useEffect } from "react";
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
import DateRangePicker from "react-bootstrap-daterangepicker";

import { deleteImage, uploadImage } from "../../../api/imageApi";
import { getUsers } from "../../../api/pesanApi";
import Table from "./table";
import ActionButton from "../../button/actionButton";
import ItemPreview from "../../attachment/itemPreview";
import Attachment from "../../attachment/attachment";
import { updateMeeting } from "../../../api/meetingApi";
import { EditMember } from "./EditMember";
import { ViewMember } from "./ViewMember";
import { convertToLocalISOString } from "../../../utils/dateConversion";

function EditDetailMeeting({
  idMeeting,
  user,
  handleBack,
  handleCancelEdit,
  dataMeeting,
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState(dataMeeting);
  const [dataOptionAnggota, setDataOptionAnggota] = useState([]);
  const [dataAnggota, setdataAnggota] = useState([]);
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [uploadMessage, setsUploadMessage] = useState("");
  const [error, setEror] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const data = await updateMeeting(
      user.id,
      user.fullname,
      form.id,
      form.judul,
      `${convertToLocalISOString(
        new Date(form.tglAwal)
      )}/${convertToLocalISOString(new Date(form.tglAkhir))}`,
      form.anggota
        .filter((data) => data.editor !== "hapusMember")
        .map((item) => {
          return {
            id: item.id.toString(),
            nama: item.label,
            editor: item.editor,
            read: item.read,
            arsip: item.arsip,
            delete: item.delete,
          };
        }),
      form.jenis,
      form.alamat,
      form.isinya,
      form.filenya
    );
    setIsSubmiting(false);
    if (data && data.code === 200) {
      navigate(-1);
    }
  };

  const handleChangeSelect = (selectedOptions, type) => {
    setdataAnggota(selectedOptions);
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
    } else setsUploadMessage("max filenya size 6 mb");
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

  const handlerCreateMeeting = (item) => (event) => {
    setForm({ ...form, [item]: event.target.value });
  };

  const handleOnAddAnggota = (e) => {
    e.preventDefault();
    setForm((prevData) => ({
      ...prevData,
      ["anggota"]: form.anggota.concat(
        dataAnggota.map((data) => {
          return {
            id: data.value,
            label: data.label,
            editor: "member",
            read: "false",
            arsip: "false",
            delete: "0",
          };
        })
      ),
    }));
    setdataAnggota([]);
  };

  const handleChangeSelectEditorAnggota = (item, index) => {
    let validDataAnggota = form.anggota;
    validDataAnggota[index] = item;
    setForm((prevData) => ({
      ...prevData,
      ["anggota"]: validDataAnggota,
    }));
  };

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
    setForm((prevData) => ({
      ...prevData,
      isinya: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  useEffect(() => {
    let validOptionAnggota;
    if (sessionStorage.getItem("dataUsers")) {
      validOptionAnggota = JSON.parse(atob(sessionStorage.getItem("dataUsers")))
        .map((user) => ({
          value: user.id,
          label: user.nama,
        }))
        .filter((data) => {
          return data.value !== user.id;
        });
    } else {
      getUsers().then((res) => {
        if (res) {
          sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
          validOptionAnggota = JSON.parse(
            atob(sessionStorage.getItem("dataUsers"))
          )
            .map((user) => ({
              value: user.id,
              label: user.nama,
            }))
            .filter((data) => {
              return data.value !== user.id;
            });
        }
      });
    }

    if (form.anggota.length > 0) {
      form.anggota.forEach((element) => {
        validOptionAnggota = validOptionAnggota.filter(
          (option) => option.value !== Number(element.id)
        );
      });
    }
    setDataOptionAnggota(validOptionAnggota);
  }, []);

  useEffect(() => {
    if (dataMeeting && dataMeeting.isinya) {
      setDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(dataMeeting.isinya))
        )
      );
    }
  }, []);

  useEffect(() => {
    if (dataOptionAnggota.length > 0 && form && form.anggota.length > 0) {
      let validOptionAnggota = dataOptionAnggota;
      form.anggota.forEach((element) => {
        validOptionAnggota = validOptionAnggota.filter(
          (option) => option.value !== element.id
        );

        setDataOptionAnggota(validOptionAnggota);
      });
    }
  }, [form]);
  return (
    <>
      {form && (
        <section className='pl-3 pr-3 pb-3'>
          <Table
            Content={
              <>
                <div className='py-3 px-2 d-flex flex-column flex-sm-row'>
                  <div className='border-right col-12 col-sm-6 '>
                    <div className='col d-flex flex-column mt-2 mb-4'>
                      <h5 style={{ color: "#619A3F" }}>
                        Tanggal dan Waktu Meeting
                      </h5>
                      {error !== "" && (
                        <span style={{ color: "red" }}>{error}</span>
                      )}

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
                          setForm({
                            ...form,
                            tglAwal: new Date(picker.startDate),
                            tglAkhir: new Date(picker.endDate),
                          });
                        }}>
                        <input className='form-control' type='text' />
                      </DateRangePicker>
                    </div>

                    <div className='col d-flex flex-column mt-2 mb-4'>
                      <h5 style={{ color: "#619A3F" }}>Jenis Meeting</h5>
                      <div
                        style={{ color: "#619A3F" }}
                        className='d-flex align-items-center'>
                        <div className='form-check form-check-inline'>
                          <input
                            onChange={handlerCreateMeeting("jenis")}
                            className='form-check-input'
                            type='radio'
                            name='inlineRadioOptions'
                            id='offline'
                            checked={form.jenis === "offline"}
                            value='offline'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='inlineRadio1'>
                            Offline
                          </label>
                        </div>
                        <div className='form-check form-check-inline'>
                          <input
                            onChange={handlerCreateMeeting("jenis")}
                            className='form-check-input'
                            type='radio'
                            name='inlineRadioOptions'
                            id='online'
                            checked={form.jenis === "online"}
                            value='online'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='inlineRadio2'>
                            Online
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='col d-flex flex-column mt-2 mb-4'>
                      <h5 style={{ color: "#619A3F" }}>Alamat/Link Meeting</h5>
                      <input
                        required
                        type='text'
                        className='form-control'
                        placeholder='Alamat:'
                        value={form.alamat}
                        onChange={handlerCreateMeeting("alamat")}
                      />
                    </div>
                    <div className='col d-flex flex-column mt-2 mb-4'>
                      <h5 style={{ color: "#619A3F" }}>Deskripsi Meeting</h5>

                      <Editor
                        editorState={description}
                        toolbarClassName='toolbarClassName'
                        wrapperClassName='wrapperClassName'
                        editorClassName='editorClassName'
                        onEditorStateChange={onEditorStateChange}
                      />
                    </div>
                  </div>
                  <div className='col-12 col-sm-6'>
                    <div className='col d-flex flex-column mt-2 mb-2'>
                      <h5 style={{ color: "#619A3F" }}>Tambah Anggota</h5>

                      <div className='form-group row'>
                        <Select
                          options={dataOptionAnggota}
                          placeholder='anggota:'
                          isMulti
                          name='colors'
                          className='basic-multi-select col 9'
                          classNamePrefix='select'
                          value={dataAnggota}
                          onChange={(selectedOptions) =>
                            handleChangeSelect(selectedOptions, "anggota")
                          }
                        />
                        <ActionButton
                          type='submit'
                          variant='default'
                          icon='fas fa-plus'
                          text=' Tambah'
                          onClick={handleOnAddAnggota}
                        />
                      </div>
                    </div>
                    <div className='col d-flex flex-column mt-2 mb-4'>
                      <h5 style={{ color: "#619A3F" }}> Anggota Meeting</h5>
                      <div className='row'>
                        <ViewMember title='pemilik' name={form.namapembuat} />

                        {form.anggota.length > 0 &&
                          form.anggota.map((data, index) => (
                            <EditMember
                              key={index}
                              user={data}
                              index={index}
                              isAuthor={
                                dataMeeting.namapembuat === data.label
                                  ? true
                                  : false
                              }
                              handleChangeEditor={
                                handleChangeSelectEditorAnggota
                              }
                            />
                          ))}
                      </div>
                    </div>
                    <div className='col d-flex flex-column mt-2 mb-2'>
                      <h5 style={{ color: "#619A3F" }}>Lampiran</h5>
                      <ItemPreview
                        data={form ? form.filenya : null}
                        handleDeleteImage={handleDeleteImage}
                      />
                      <Attachment
                        isUploading={uploadMessage === "" ? false : true}
                        handleUploadImage={handleUploadImage}
                      />
                    </div>
                  </div>
                </div>
              </>
            }
            Footer={
              <>
                <div
                  style={{ gap: "5px" }}
                  className=' d-flex p-3 justify-content-end'>
                  <ActionButton
                    onClick={handleCancelEdit}
                    type='submit'
                    variant='danger'
                    icon='fas fa-times'
                    text=' Batal'
                  />
                  <ActionButton
                    onClick={handleSubmit}
                    type='submit'
                    variant='primary'
                    icon='fas fa-print'
                    text=' Simpan'
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
              </>
            }
          />
        </section>
      )}
    </>
  );
}

export default EditDetailMeeting;
