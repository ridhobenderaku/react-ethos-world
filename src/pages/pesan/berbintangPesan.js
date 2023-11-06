import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  getDataAllPesanByType,
  hapusPesanBerbintang,
} from "../../api/pesanApi";
import { deletePesan } from "../../api/pesanApi";
import { ReactContext } from "../../context/AuthProvider";
import { Table } from "../../components/table/table";
import { BoxControls } from "../../components/table/boxControls";
import { HeaderTablePesan } from "../../components/pesan/table/headerTablePesan";
import TableIsiPesan from "../../components/pesan/table/tableIsiPesan";
import TitleTablePesan from "../../components/pesan/table/titleTablepesan";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";

const headerMenu = [
  {
    title: "Berbintang",
    icon: "fas fa-star",
  },
];

const titleTable = [
  { title: "", style: "default" },
  { title: "", style: "default" },
  { title: "Nama ", style: "pengirim" },
  { title: "Subjek Pesan", style: "subject" },
  { title: "Isi Pesan", style: "isi" },
  { title: "Tanggal", style: "date" },
];

export default function BerbintangPesan() {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Berbintang");
  const [dataTable, setDataTable] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPesan, setSelectedPesan] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [resetCheck, setResetCheck] = useState(false);
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
        bytesToBase64(
          new TextEncoder().encode(
            JSON.stringify({
              berbintang: {
                data: { data: data, page: page, totalPage: totalPage },
              },
            })
          )
        )
      );
    } else {
      let pesan = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("pesan")))
      );

      pesan["berbintang"] = {
        data: { data: data, page: page, totalPage: totalPage },
      };

      sessionStorage.setItem(
        "pesan",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(pesan)))
      );
    }
  };

  const getDataPesanServer = async () => {
    const data = await getDataAllPesanByType(
      user.id,
      currentPage,
      10,
      0,
      0,
      "berbintang",
      search
    );
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
    if (!sessionStorage.getItem("pesan")) {
      getDataPesanServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("pesan")))
      );
      if (data.berbintang) {
        if (currentPage === 0 || currentPage === data.berbintang.data.page) {
          setDataTable(data.berbintang.data.data);
          setTotalPages(data.berbintang.data.totalPage);
          setCurrentPage(data.berbintang.data.page);
        } else getDataPesanServer();
      } else getDataPesanServer();
    }
  };

  const handleRefresh = () => {
    getDataPesanServer();
  };

  const handlePesanBerbintang = async (
    index,
    idpesan,
    idpengirim,
    idpenerima
  ) => {
    let resp;
    if (idpengirim === user.id) {
      resp = await hapusPesanBerbintang(idpesan, user.id, "0");
    } else {
      resp = await hapusPesanBerbintang(idpesan, "0", user.id);
    }
    if (resp && resp.code === 200) {
      getDataPesanServer();
    }
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
    const allIds = dataTable.map((item) => item.id);

    if (isAllChecked) {
      setSelectedPesan([]);
    } else {
      setSelectedPesan(allIds);
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleDeletePesan = async (e) => {
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
            <TitleTablePesan title={titleTable} />
            {dataTable &&
              dataTable.map((data, idx) => (
                <TableIsiPesan
                  user={user}
                  type='berbintang'
                  key={idx}
                  data={data}
                  index={idx}
                  handleCheckboxChange={handleCheckboxChange}
                  isAllChecked={isAllChecked}
                  handleDetail={handleDetail}
                  handlePesanBerbintang={handlePesanBerbintang}
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
