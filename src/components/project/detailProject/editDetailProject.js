import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";

import { deleteImage, uploadImage } from "../../../api/imageApi";
import { getUsers } from "../../../api/pesanApi";
import Table from "./table";
import Attachment from "../../attachment/attachment";
import ActionButton from "../../button/actionButton";
import ItemPreview from "../../attachment/itemPreview";
import { updateProject } from "../../../api/projectApi";
import EditMember from "../editMember";
import ViewMember from "../viewMember";
import { convertToLocalISOString } from "../../../utils/dateConversion";

const optionsEditor = [
  { value: "editor", label: "Editor" },
  { value: "pelihat", label: "Pelihat" },
  { value: "hapusMember", label: "Hapus Member" },
];

function EditDetailProject({
  projectId,
  user,
  dataProject,
  handleBack,
  handleCancelEdit,
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState(dataProject);
  const [dataTim, setdataTim] = useState([]);
  const [uploadMessage, setsUploadMessage] = useState("");
  const [dataOptionAnggota, setDataOptionAnggota] = useState([]);
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const data = await updateProject(
      projectId,
      user.id,
      user.fullname,
      form.judul,
      form.isi,
      convertToLocalISOString(new Date(form.tglawal)),
      convertToLocalISOString(new Date(form.tglakhir)),
      form.anggota.filter((data) => data.editor !== "hapusMember"),
      form.filenya ? form.filenya : [],
      form.sts,
      form.progres
    );
    setIsSubmiting(false);
    if (data && data.data.code === 200) navigate(-1);
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

  const handleOnAddTim = (e) => {
    e.preventDefault();

    setForm((prevData) => ({
      ...prevData,
      ["anggota"]: form.anggota.concat(
        dataTim.map((data) => {
          return { id: data.value, label: data.label, editor: "editor" };
        })
      ),
    }));
    setdataTim([]);
  };

  const handleChangeSelectEditorTim = (item, index) => {
    let validDataTim = form.anggota;
    validDataTim[index] = item;
    setForm((prevData) => ({
      ...prevData,
      ["anggota"]: validDataTim,
    }));
  };
  const handleChangeSelect = (selectedOptions, type) => {
    setdataTim(selectedOptions);
  };

  const handleCreateProject = (item) => (event) => {
    if (item === "progres") {
      if (event.target.value === "100")
        setForm({ ...form, [item]: event.target.value, sts: "selesai" });
      else setForm({ ...form, [item]: event.target.value, sts: "ditugaskan" });
    } else if (item === "sts") {
      if (event.target.value === "selesai")
        setForm({ ...form, [item]: event.target.value, progres: 100 });
      else setForm({ ...form, [item]: event.target.value });
    } else setForm({ ...form, [item]: event.target.value });
  };

  const isValidDate = (start, end) => {
    const currentDate = new Date().getTime();
    const startDate = start.getTime() + 100;
    const endDate = end.getTime() + 100;
    if (startDate < currentDate || endDate < currentDate) {
      setError("mohon isi tanggal dengan value minimal tanggal sekarang");
      return false;
    } else {
      setError("");

      return true;
    }
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
          validOptionAnggota = res
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
        if (validOptionAnggota)
          validOptionAnggota = validOptionAnggota.filter(
            (option) => option.value !== Number(element.id)
          );
      });
    }
    setDataOptionAnggota(
      validOptionAnggota.filter((item) => item.label !== form.pemilik)
    );
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
        <section className='p-3'>
          <Table
            name='detail project'
            Header={
              <>
                <ul className='nav nav-tabs card-header p-0'>
                  <li className='nav-item'>
                    <a
                      style={{ gap: "5px" }}
                      className='nav-link active d-flex align-items-center'
                      id='detailProject'
                      data-toggle='pill'
                      href='#detailProject'
                      role='tab'
                      aria-controls='detailProject'
                      aria-selected='true'>
                      <h5 className='p-0 m-0'>Ikhtisar</h5>
                    </a>
                  </li>
                </ul>
              </>
            }
            Content={
              <>
                <div className='py-3 px-2 d-flex flex-column flex-md-row'>
                  <div className='border-right col-12 col-md-6'>
                    <div className='col d-flex flex-column mt-2 mb-2'>
                      <h5 style={{ color: "#619A3F" }}>Judul Project</h5>
                      <input
                        required
                        type='text'
                        value={form.judul}
                        maxLength={100}
                        className='form-control'
                        placeholder='Deskripsi '
                        onChange={handleCreateProject("judul")}
                      />
                    </div>
                    <div className='col d-flex flex-column mt-2 mb-2'>
                      <h5 style={{ color: "#619A3F" }}>Deskripsi Project</h5>
                      <input
                        required
                        type='text'
                        value={form.isi}
                        className='form-control'
                        placeholder='Deskripsi '
                        onChange={handleCreateProject("isi")}
                      />
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
                  <div className='d-flex flex-column col-12 col-md-6'>
                    <div className='border-bottom '>
                      <div
                        style={{ color: "#619A3F" }}
                        className='col d-flex flex-column mt-2 mb-2'>
                        <h5>Progess Project</h5>
                        <input
                          type='range'
                          id='vol'
                          name='vol'
                          value={Number(form.progres)}
                          onChange={handleCreateProject("progres")}
                          min='0'
                          max='100'
                        />
                        <p>{`${form.progres}% Selesai`}</p>
                      </div>
                      <div className='col d-flex justify-content-md-between p-0  mt-2 mb-2'>
                        <div className='col d-flex flex-column '>
                          <h5 style={{ color: "#619A3F" }}>Status Project</h5>
                          <div className='form-group'>
                            <select
                              value={form.sts}
                              onChange={handleCreateProject("sts")}>
                              <option value='revisi' key='revisi'>
                                Revisi
                              </option>
                              <option value='ditugaskan' key='ditugaskan'>
                                Ditugaskan
                              </option>
                              <option value='dikerjakan' key='dikerjakan'>
                                Dikerjakan
                              </option>
                              <option value='selesai' key='selesai'>
                                Selesai
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className='col d-flex flex-column'>
                          <h5 style={{ color: "#619A3F" }}>Timeline Project</h5>
                          {error !== "" && (
                            <span style={{ color: "red" }}>{error}</span>
                          )}

                          <div className='form-group'>
                            <DateRangePicker
                              initialSettings={{
                                locale: {
                                  format: "DD/M/YY hh:mm A",
                                },
                                startDate: new Date(form.tglawal),
                                endDate: new Date(form.tglakhir),
                                timePicker: true,
                              }}
                              onApply={(event, picker) => {
                                isValidDate(
                                  new Date(picker.startDate),
                                  new Date(picker.endDate)
                                );
                                setForm({
                                  ...form,
                                  tglawal: convertToLocalISOString(
                                    new Date(picker.startDate)
                                  ),
                                  tglakhir: convertToLocalISOString(
                                    new Date(picker.endDate)
                                  ),
                                });
                              }}>
                              <input className='form-control' type='text' />
                            </DateRangePicker>
                          </div>
                        </div>
                      </div>
                      <div className='col d-flex flex-column mt-2 mb-2'>
                        <h5 style={{ color: "#619A3F" }}>Tambah Anggota</h5>
                        <div className='form-group row'>
                          <Select
                            options={dataOptionAnggota}
                            placeholder='anggota:'
                            isMulti
                            name='colors'
                            value={dataTim}
                            className='basic-multi-select col 9'
                            classNamePrefix='select'
                            onChange={(selectedOptions) =>
                              handleChangeSelect(selectedOptions)
                            }
                          />
                          <ActionButton
                            type='submit'
                            variant='default'
                            icon='fas fa-plus'
                            text=' Tambah'
                            onClick={handleOnAddTim}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='d-flex flex-column mt-2 mb-4 mx-2'>
                        <h5 style={{ color: "#619A3F" }}> Anggota Project</h5>
                        <div className='row'>
                          <ViewMember
                            title='pemilik'
                            name={form.pemilik}
                            styleContent='d-flex flex-column p-0 m-0 '
                            styles='col-12 col-md-6 d-flex align-items-center mt-3'
                          />
                          {form.anggota.length > 0 &&
                            form.anggota.map((item, index) => (
                              <EditMember
                                key={index}
                                index={index}
                                user={item}
                                stylesContent='d-flex flex-column p-0 m-0 '
                                styles='col-12 col-sm-6 d-flex align-items-center mt-3'
                                handleChangeEditor={handleChangeSelectEditorTim}
                                optionsEditor={optionsEditor}
                              />
                            ))}
                        </div>
                      </div>
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
                    disabled={isSubmiting}
                    onClick={handleSubmit}
                    type='submit'
                    variant='primary'
                    icon='fas fa-print'
                    text=' Simpan'
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

export default EditDetailProject;
