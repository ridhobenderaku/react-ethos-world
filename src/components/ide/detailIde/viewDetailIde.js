import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Card from "../../pesan/detailPesan/card";
import Lampiran from "../../lampiran";
import ActionButton from "../../button/actionButton";
import {
  addBerbintangIde,
  arsipIde,
  deleteIde,
  deletePermanenIde,
  pulihkanArsipIde,
  pulihkanDeleteIde,
  removeBerbintangIde,
} from "../../../api/ideApi";

function ViewDetailIde({
  user,
  type,
  idIde,
  judulIde,
  isiIde,
  file,
  editor,
  berbintang,
  namaPembuat,
  handleGoBack,
}) {
  const navigate = useNavigate();
  const [isBerbintang, setIsBerbintang] = useState(false);

  const handlePulihkanArsipIde = async (e) => {
    e.preventDefault();
    const res = await pulihkanArsipIde(user.id, idIde, user.fullname);
    if (res && res.data.code === 200) {
      navigate(-1);
    }
  };

  const handlePulihkanHapusIde = async (e) => {
    e.preventDefault();
    const res = await pulihkanDeleteIde(user.id, idIde, user.fullname);
    if (res && res.data.code === 200) {
      navigate(-1);
    }
  };

  const handleArsipIde = async (e) => {
    e.preventDefault();
    const res = await arsipIde(user.id, user.fullname, idIde);
    if (res && res.data.code === 200) {
      navigate(-1);
    }
  };

  const handleIdeBerbintang = async (isBerbintang, idIde) => {
    let resp;
    if (isBerbintang) {
      resp = await removeBerbintangIde(user.id, user.fullname, idIde);
    } else {
      resp = await addBerbintangIde(user.id, user.fullname, idIde);
    }
  };

  const deleteIde = async () => {
    const res = await deletePermanenIde([{ id: idIde, authId: user.id }]);
    if (res && res.data.code === 200) {
      navigate(-1);
    }
  };

  const handleDeletePermanenIde = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus ide selamanya",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus Selamanya!",
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
        deleteIde();
      }
    });
  };

  useEffect(() => {
    if (berbintang) {
      berbintang.forEach((element) => {
        if (Number(element.id) === user.id) setIsBerbintang(true);
      });
    }
  }, []);
  return (
    <Card
      title={
        <div
          style={{ gap: "1rem" }}
          className='d-flex flex-column-reverse  flex-sm-row align-items-sm-center justify-content-sm-between '>
          <div style={{ gap: "0.5rem" }} className='d-flex align-items-center'>
            <i
              style={{ cursor: "pointer" }}
              onClick={handleGoBack}
              className='fas fa-arrow-left nama'
            />
            <h4 className='nama'> Isi Ide</h4>
          </div>

          {type !== "sampah" && (
            <div
              style={{ gap: "0.3rem", marginLeft: "auto" }}
              className='d-flex'>
              {type === "arsip" && <p>Diarsipkan</p>}
              <div>
                <button className='btn btn-default btn-sm'>
                  <i
                    className={`fas fa-star ${
                      isBerbintang ? "text-warning" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleIdeBerbintang(isBerbintang, idIde);
                      setIsBerbintang(!isBerbintang);
                    }}
                  />
                </button>
              </div>
              {type !== "arsip" && editor === "pemilik" && (
                <div>
                  <button
                    onClick={handleArsipIde}
                    className='btn btn-default btn-sm'>
                    <i className='fas fa-archive' />
                  </button>
                </div>
              )}

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
          )}
        </div>
      }
      body={
        <div style={{ gap: "1rem" }} className='d-flex flex-column'>
          <h4 className='nama m-0'>{judulIde}</h4>
          <p style={{ fontSize: "15px", fontWeight: "normal" }} className=''>
            {`Pemilik: ${namaPembuat}`}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: isiIde,
            }}
          />
          <Lampiran data={file} />
        </div>
      }
      footer={
        <>
          {type === "arsip" && editor === "pemilik" && (
            <div style={{ gap: "15px" }} className='float-right d-flex'>
              <ActionButton
                type='submit'
                onClick={handlePulihkanArsipIde}
                icon='fas fa-file-upload'
                text=' Pulihkan'
                variant='success'
              />
            </div>
          )}
          {type === "sampah" && editor === "pemilik" && (
            <div style={{ gap: "15px" }} className='float-right d-flex'>
              <ActionButton
                type='submit'
                onClick={handlePulihkanHapusIde}
                icon='fas fa-file-upload'
                text=' Pulihkan'
                variant='success'
              />
              <ActionButton
                variant='danger'
                type='submit'
                onClick={handleDeletePermanenIde}
                icon='fas fa-trash-alt'
                text=' Hapus Selamanya'
              />
            </div>
          )}
        </>
      }
    />
  );
}

export default ViewDetailIde;
