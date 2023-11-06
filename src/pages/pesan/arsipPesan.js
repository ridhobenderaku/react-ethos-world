import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { getDataAllPesanByType } from "../../api/pesanApi";
import { deletePesan, bacaPesan } from "../../api/pesanApi";
import { ReactContext } from "../../context/AuthProvider";
import { Table } from "../../components/table/table";
import { BoxControls } from "../../components/table/boxControls";
import { HeaderTablePesan } from "../../components/pesan/table/headerTablePesan";
import TableIsiPesan from "../../components/pesan/table/tableIsiPesan";
import TitleTablePesan from "../../components/pesan/table/titleTablepesan";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";

const headerMenu = [
  {
    title: "Pesan",
    icon: "fas fa-archive",
  },
  {
    title: "Memo",
    icon: "fas fa-book",
  },
];

const titleTablePesan = [
  { title: "", style: "default" },
  { title: "Nama ", style: "pengirim" },
  { title: "Subjek Pesan", style: "subject" },
  { title: "Isi Pesan", style: "isi" },
  { title: "Tanggal", style: "date" },
];
const titleTableMemo = [
  { title: "Nama Pengirim", style: "author" },
  { title: "Perihal Memo", style: "perihal" },
  { title: "Isi Memo", style: "isi" },
  { title: "Tanggal", style: "date" },
];
export default function ArsipPesan() {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Arsip");
  const [dataTable, setDataTable] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPesan, setSelectedPesan] = useState([]);
  const [resetCheck, setResetCheck] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleIncrementPages = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDecrementPages = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const addDataSessionStorage = (data, page, totalPage) => {
    if (!sessionStorage.getItem("pesan")) {
      sessionStorage.setItem(
        "pesan",
        activeTab === "Pesan"
          ? bytesToBase64(
              new TextEncoder().encode(
                JSON.stringify({
                  arsip: {
                    pesan: {
                      data: { data: data, page: page, totalPage: totalPage },
                    },
                  },
                })
              )
            )
          : bytesToBase64(
              new TextEncoder().encode(
                JSON.stringify({
                  arsip: {
                    memo: {
                      data: { data: data, page: page, totalPage: totalPage },
                    },
                  },
                })
              )
            )
      );
    } else {
      let pesan = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("pesan")))
      );
      if (!pesan.arsip) {
        pesan =
          activeTab === "Pesan"
            ? {
                ...pesan,
                arsip: {
                  pesan: {
                    data: { data: data, page: page, totalPage: totalPage },
                  },
                },
              }
            : {
                ...pesan,
                arsip: {
                  memo: {
                    data: { data: data, page: page, totalPage: totalPage },
                  },
                },
              };
      } else
        pesan["arsip"][activeTab.toLocaleLowerCase()] = {
          data: { data: data, page: page, totalPage: totalPage },
        };

      sessionStorage.setItem(
        "pesan",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(pesan)))
      );
    }
  };

  const getDataPesanServer = async () => {
    let data;
    if (activeTab === "Pesan") {
      data = await getDataAllPesanByType(
        user.id,
        currentPage,
        10,
        0,
        0,
        "arsip",
        search
      );
    } else {
      setDataTable(null);
    }

    if (data) {
      setDataTable(data.data);
      setTotalPages(data.totalPage);
      setCurrentPage(data.page === 0 ? 1 : data.page);
      addDataSessionStorage(
        data.data,
        data.page === 0 ? 1 : data.page,
        data.totalPage
      );
    }
  };

  const getData = async () => {
    if (activeTab === "Pesan") {
      if (!sessionStorage.getItem("pesan")) {
        getDataPesanServer();
      } else {
        const data = JSON.parse(
          new TextDecoder().decode(
            base64ToBytes(sessionStorage.getItem("pesan"))
          )
        );
        if (data.arsip && data.arsip.pesan) {
          if (currentPage === 0 || currentPage === data.arsip.pesan.data.page) {
            setDataTable(data.arsip.pesan.data.data);
            setTotalPages(data.arsip.pesan.data.totalPage);
            setCurrentPage(data.arsip.pesan.data.page);
          } else getDataPesanServer();
        } else getDataPesanServer();
      }
    } else {
      if (!sessionStorage.getItem("pesan")) {
        getDataPesanServer();
      } else {
        const data = JSON.parse(
          new TextDecoder().decode(
            base64ToBytes(sessionStorage.getItem("pesan"))
          )
        );
        if (data.arsip && data.arsip.memo) {
          if (currentPage === 0 || currentPage === data.arsip.memo.data.page) {
            setDataTable(data.arsip.memo.data.data);
            setTotalPages(data.arsip.memo.data.totalPage);
            setCurrentPage(data.arsip.memo.data.page);
          } else getDataPesanServer();
        } else getDataPesanServer();
      }
    }
  };

  const handleRefresh = () => {
    getDataPesanServer();
  };

  const handleCheckboxChange = (id, index, isChecked) => {
    const currentPesan = dataTable[index];
    if (isChecked) {
      setSelectedPesan([
        ...selectedPesan,
        { id: currentPesan.idpesan, authId: user.id, username: user.fullname },
      ]);
    } else {
      setSelectedPesan(selectedPesan.filter((selected) => selected.id !== id));
    }
  };

  const handleSelectAll = () => {
    const allPesan = dataTable.map((item, index) => {
      return { id: item.idpesan, authId: user.id, username: user.fullname };
    });

    if (isAllChecked) {
      setSelectedPesan([]);
    } else {
      setSelectedPesan(allPesan);
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleDeletePesan = async () => {
    const res = await deletePesan(selectedPesan);
    if (res && res.code === 200) {
      getDataPesanServer();
      setSelectedPesan([]);
      setResetCheck(!resetCheck);
    }
  };

  const confirmDeletePesan = () => {
    if (selectedPesan.length > 0) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "ingin menghapus pesan",
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
          handleDeletePesan();
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "tidak ada pesan terseleksi",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "popup-alert-small",
          icon: "icon",
          title: "title",
          htmlContainer: "htmlContainer",
          confirmButton: "btn",
          denyButton: "btn",
          cancelButton: "btn",
        },
      });
    }
  };

  const handleDetail = (id) => {
    navigate(`./${id}`);
    bacaPesan(id, user.id);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataPesanServer();
  };
  useEffect(() => {
    getDataPesanServer();
  }, [currentPage, activeTab]);

  return (
    <div className='col-md-9'>
      <Table
        Header={
          <>
            <HeaderTablePesan
              headerMenu={headerMenu}
              setActiveTab={setActiveTab}
              handleSearch={handleSearch}
              search={search}
              setSearch={setSearch}
              activeTab={activeTab}
            />
            <BoxControls
              handleSelectAll={handleSelectAll}
              handleDeleteItem={confirmDeletePesan}
              handleRefresh={handleRefresh}
              handleIncrementPages={handleIncrementPages}
              handleDecrementPages={handleDecrementPages}
              handleChangePage={handleChangePage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        }
        Content={
          <>
            <TitleTablePesan
              title={activeTab === "Pesan" ? titleTablePesan : titleTableMemo}
            />
            {dataTable &&
              dataTable.map((data, idx) => (
                <TableIsiPesan
                  user={user}
                  type='arsip'
                  key={idx}
                  index={idx}
                  data={data}
                  handleCheckboxChange={handleCheckboxChange}
                  isAllChecked={isAllChecked}
                  handleDetail={handleDetail}
                  resetCheck={resetCheck}
                />
              ))}
          </>
        }
        Footer={
          <>
            <BoxControls
              handleSelectAll={handleSelectAll}
              handleDeleteItem={confirmDeletePesan}
              handleRefresh={handleRefresh}
              handleIncrementPages={handleIncrementPages}
              handleDecrementPages={handleDecrementPages}
              handleChangePage={handleChangePage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        }
      />
    </div>
  );
}
