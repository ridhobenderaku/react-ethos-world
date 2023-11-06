import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import ActionButton from "../../button/actionButton";
import EditAktivitasModal from "./editAktivitasModal";
import Pagination from "../../pagination";
import Lampiran from "../../lampiran";
import { deleteDataAktivitas, getDataAktivitas } from "../../../api/agendaApi";
import SearchProject from "../../project/searchProject";
import { convertToDateTimeWithName } from "../../../utils/dateConversion";
import { base64ToBytes } from "../../../utils/encodeDecode";

export default function Aktifitas({ user, toggleRefresh }) {
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataAktifitas, setDataAktifitas] = useState(null);
  const [selectedId, setselectedId] = useState(null);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [search, setSearch] = useState("");

  const addDataSessionStorage = (data, page, totalPage) => {
    sessionStorage.setItem(
      "aktivitas",
      btoa(
        JSON.stringify({
          data: { data: data, page: page, totalPage: totalPage },
        })
      )
    );
  };

  const getDataAktivitasServer = async () => {
    const data = await getDataAktivitas(
      "all",
      currentPage,
      user.id,
      10,
      0,
      0,
      search
    );
    if (data) {
      setDataAktifitas(data.data);
      setTotalPages(data.totalPage);
      setCurrentPage(data.page);
      addDataSessionStorage(data.data, data.page, data.totalPage);
    }
  };

  const getData = async () => {
    if (!sessionStorage.getItem("aktivitas")) {
      getDataAktivitasServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(
          base64ToBytes(sessionStorage.getItem("aktivitas"))
        )
      );
      if (data) {
        if (currentPage === 0 || currentPage === data.data.page) {
          setDataAktifitas(data.data.data);
          setTotalPages(data.data.totalPage);
          setCurrentPage(data.data.page);
        } else getDataAktivitasServer();
      } else getDataAktivitasServer();
    }
  };

  const confirmDelete = (id) => (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus aktivitas",
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
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    const resp = await deleteDataAktivitas(id);
    if (resp && resp.data.code === 200) {
      getDataAktivitasServer();
    }
  };

  const handleRefresh = () => {
    getDataAktivitasServer();
  };
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleInputSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataAktivitasServer();
  };

  useEffect(() => {
    getDataAktivitasServer();
  }, [currentPage, toggleRefresh]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 card">
            <div className="card-header p-2 ">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center row-sm-12">
                <h4 className="judul-menu p-2 nama">Ruang Aktivitas</h4>
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-default btn-sm  mr-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRefresh();
                    }}
                  >
                    <i className="fas fa-sync-alt" />
                  </button>
                  <div>
                    <SearchProject
                      value={search}
                      onChange={handleInputSearch}
                      handleSearch={handleSearch}
                      placeholder="Search aktivitas"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {toggleEditModal && (
                <EditAktivitasModal
                  selectedId={selectedId}
                  toggleEditModal={toggleEditModal}
                  setToggleEditModal={setToggleEditModal}
                  handleRefresh={handleRefresh}
                />
              )}
              {dataAktifitas &&
                dataAktifitas?.map((data, i) => (
                  <div
                    className="post d-flex flex-sm-row flex-column justify-content-between"
                    key={i}
                  >
                    <div className="d-flex flex-column  col-sm-10 col-12">
                      <div className="user-block">
                        <img
                          className="img-circle img-bordered-sm"
                          src="https://adminlte.io/themes/v3/dist/img/user1-128x128.jpg"
                          alt="user image"
                        />
                        <span className="username">
                          <span className="nama">{data?.namapembuat}</span>
                        </span>
                        <span className="description">
                          {convertToDateTimeWithName(new Date(data.tglAwal))}
                        </span>
                      </div>

                      <strong>{data?.nama}</strong>
                      <p>{data?.deskripsi}</p>
                      <Lampiran data={data?.filenya} />
                    </div>
                    <div
                      style={{ gap: "1rem" }}
                      className="d-flex mt-4 mt-sm-0 align-self-end align-self-sm-start col-sm-2 col-12 justify-content-end"
                    >
                      <div>
                        <ActionButton
                          type="submit"
                          icon="fas fa-edit"
                          text=" Edit"
                          onClick={(e) => {
                            e.preventDefault();
                            setselectedId(data.id);
                            setToggleEditModal(true);
                          }}
                          dataToggle="modal"
                          dataTarget="#modal-edit-aktivitas"
                        />
                      </div>
                      <div>
                        <ActionButton
                          type="submit"
                          variant="danger"
                          onClick={confirmDelete(data.id)}
                          icon="fas fa-trash"
                          text=" Delete"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="card-footer">
              <Pagination
                total={totalPage}
                current={currentPage}
                pagination={(crPage) => handleChangePage(crPage)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
