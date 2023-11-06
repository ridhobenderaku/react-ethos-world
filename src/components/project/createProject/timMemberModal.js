import React from "react";
import { useState } from "react";
import TimMemberForm from "./timMemberForm";
import ActionButton from "../../button/actionButton";
import ViewMember from "../viewMember";
import EditMember from "../editMember";

const optionsEditor = [
  { value: "editor", label: "Editor" },
  { value: "pelihat", label: "Pelihat" },
];

export default function TimMemberModal({ title, setForm, form, pemilik }) {
  const [openModal, setOpenModal] = useState(false);

  const handlerClose = () => {
    setOpenModal(false);
  };
  const handlerOpen = () => {
    setOpenModal(true);
  };

  const handleChangeSelectEditorTim = (item, index) => {
    let validDataTim = form.tim;
    validDataTim[index] = item;
    setForm((prevData) => ({
      ...prevData,
      ["tim"]: validDataTim,
    }));
  };

  const handleDeleteTim = (index) => {
    let validDataTim = form.tim.filter(
      (data) => data.id !== form.tim[index].id
    );
    setForm((prevData) => ({
      ...prevData,
      ["tim"]: validDataTim,
    }));
  };
  return (
    <>
      <ActionButton
        text=' Tambah'
        onClick={handlerOpen}
        icon='fas fa-plus'
        variant='success'
      />

      {openModal && (
        <div>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <p className='modal-title w-75'>Tim Member {title}</p>
                <button type='button' className='close' onClick={handlerClose}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <ViewMember
                  title='pemilik'
                  name={pemilik}
                  styles=' col-12 d-flex align-items-center '
                  styleContent='w-100 d-flex justify-content-between p-0 m-0 '
                />

                {form.tim.length > 0 &&
                  form.tim.map((item, index) => (
                    <EditMember
                      index={index}
                      user={item}
                      key={index}
                      stylesContent='w-100 d-flex justify-content-between p-0 m-0 '
                      styles='col-12 d-flex align-items-center mt-3'
                      handleChangeEditor={handleChangeSelectEditorTim}
                      optionsEditor={optionsEditor}
                      handleDelete={handleDeleteTim}
                    />
                  ))}

                <TimMemberForm
                  setForm={setForm}
                  form={form}
                  setOpenModal={setOpenModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
