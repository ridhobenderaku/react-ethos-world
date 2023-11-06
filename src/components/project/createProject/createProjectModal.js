import React, { useState, useContext, useEffect } from "react";

import CreateProjectForm from "./createProjectForm";
import { ReactContext } from "../../../context/AuthProvider";
import { tambahProject } from "../../../api/projectApi";
import ActionButton from "../../button/actionButton";
import { convertToLocalISOString } from "../../../utils/dateConversion";

export default function CreateProjectModal({ handleRefresh }) {
  const { user } = useContext(ReactContext);
  const defaultForm = {
    nama: "",
    deskripsi: "",
    authId: user.id,
    file: null,
    tim: [],
    tglAwal: null,
    tglAkhir: null,
  };
  const [form, setForm] = useState(defaultForm);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const resp = await tambahProject(
      form.nama,
      form.deskripsi,
      convertToLocalISOString(form.tglAwal),
      convertToLocalISOString(form.tglAkhir),
      form.authId,
      form.tim.map((data) => {
        return {
          ...data,
          id: data.id.toString(),
          read: "false",
          arsip: "false",
          delete: "0",
        };
      }),
      form.file
    );
    setIsSubmiting(false);
    if (resp && resp.status === 200) {
      setForm(defaultForm);
      handleRefresh();
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setForm(defaultForm);
  };

  useEffect(() => {
    window.$("#modal-create-project").on("shown.bs.modal", function (e) {
      setForm({
        ...defaultForm,
        tglAwal: new Date(),
        tglAkhir: new Date(),
      });
    });

    window.$("#modal-create-project").on("hidden.bs.modal", function (e) {
      setForm({
        ...defaultForm,
        tglAwal: null,
        tglAkhir: null,
      });
    });
  }, []);
  return (
    <>
      <div className='modal fade' id='modal-create-project'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title'>Project Baru</h3>
            </div>
            <div className='modal-body'>
              <CreateProjectForm form={form} setForm={setForm} user={user} />
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
                onClick={handleSubmitProject}
                disabled={
                  form.nama === "" ||
                  form.deskripsi === "" ||
                  form.tim.length === 0 ||
                  isSubmiting
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
