import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";

import TimMemberModal from "./timMemberModal";
import { deleteImage, uploadImage } from "../../../api/imageApi";
import ItemPreview from "../../attachment/itemPreview";
import Attachment from "../../attachment/attachment";

export default function CreateProjectForm({ form, setForm, user }) {
  const [uploadMessage, setsUploadMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateForm = (item) => (event) => {
    setForm({
      ...form,
      [item]: event.target.value,
    });
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = form.file ? form.file : [];
        nd.push({ link: data.filename, namafile: data.namafile });
        setForm((prevData) => ({
          ...prevData,
          file: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(form.file[index].link);
    if (data) {
      setForm((prevData) => ({
        ...prevData,
        file: form.file.filter((data) => data !== form.file[index]),
      }));
    }
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

  return (
    <>
      <div>
        <div className='form-group'>
          <label className='nama' htmlFor='nama-project'>
            Nama Project
          </label>
          <input
            type='text'
            className='form-control form-control'
            id='nama-project'
            value={form.nama}
            placeholder='Masukan nama project'
            onChange={handleCreateForm("nama")}
            maxLength={50}
          />
        </div>
        <div className='form-group'>
          <label className='nama' htmlFor='deskripsi-area'>
            Deskripsi Project
          </label>
          <textarea
            className='form-control'
            rows={3}
            id='deskripsi-area'
            value={form.deskripsi}
            placeholder='Masukan deskripsi project'
            onChange={handleCreateForm("deskripsi")}
          />
        </div>
        {form.tglAwal && (
          <div className='d-flex flex-column'>
            <label className='nama' htmlFor='deskripsi-area'>
              Timeline Project
            </label>
            {error !== "" && <span style={{ color: "red" }}>{error}</span>}

            <div className='form-group'>
              <DateRangePicker
                initialSettings={{
                  locale: {
                    format: "DD/M/YY hh:mm A",
                  },
                  startDate: form.tglAwal,
                  endDate: form.tglAkhir,
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
          </div>
        )}

        <div className='form-group'>
          <label className='nama'> Tim Member</label>
        </div>
        <div className='form-group'>
          <TimMemberModal
            form={form}
            setForm={setForm}
            title={form.nama}
            pemilik={user.fullname}
          />
        </div>
        <div className='form-group'>
          <label className='nama'> Lampiran</label>
        </div>
        <ItemPreview data={form.file} handleDeleteImage={handleDeleteImage} />
        <Attachment
          isUploading={uploadMessage === "" ? false : true}
          handleUploadImage={handleUploadImage}
        />
      </div>
    </>
  );
}
