import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../../context/AuthProvider";
import {
  addMemoBerbintangById,
  deleteMemoBerbintangById,
  deleteMemoById,
  getAllMemoByType,
} from "../../../api/memoApi";
import { Table } from "../../../components/table/table";
import { HeaderTableMemo } from "../../../components/memo/tabel/HeaderTableMemo";
import { BoxControls } from "../../../components/table/boxControls";
import TableIsiMemo from "../../../components/memo/tabel/tableIsiMemo";
import TitleTableMemo from "../../../components/memo/tabel/titleTableMemo";
import { base64ToBytes, bytesToBase64 } from "../../../utils/encodeDecode";

const headerTitle = {
  name: "Persetujuan",
  icon: "fas fa-file-signature",
};

const titleTable = [
  { title: "", style: "default" },
  { title: "Status", style: "status" },
  { title: "Dibuat Oleh", style: "aproval" },
  { title: "Perihal Memo", style: "perihal" },
  { title: "Isi Memo", style: "isi" },
  { title: "Tanggal", style: "date" },
];

export default function PersetujuanMemo() {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [dataMemo, setDataMemo] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIdData, setSelectedIdData] = useState([]);
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
    if (!sessionStorage.getItem("memo")) {
      sessionStorage.setItem(
        "memo",
        bytesToBase64(
          new TextEncoder().encode(
            JSON.stringify({
              persetujuan: { data: data, page: page, totalPage: totalPage },
            })
          )
        )
      );
    } else {
      let memo = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("memo")))
      );
      memo["persetujuan"] = {
        data: { data: data, page: page, totalPage: totalPage },
      };
      sessionStorage.setItem(
        "memo",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(memo)))
      );
    }
  };
  const getDataMemoServer = async () => {
    const data = await getAllMemoByType(
      user.id,
      currentPage,
      "persetujuan",
      10,
      0,
      0,
      search
    );
    if (data) {
      setDataMemo(data.data);
      setTotalPages(data.totalPage);
      setCurrentPage(data.page);
      addDataSessionStorage(data.data, data.page, data.totalPage);
    }
  };

  const getData = async () => {
    if (!sessionStorage.getItem("memo")) {
      getDataMemoServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("memo")))
      );
      if (data.persetujuan) {
        if (currentPage === 0 || currentPage === data.persetujuan.data.page) {
          setDataMemo(data.persetujuan.data.data);
          setTotalPages(data.persetujuan.data.totalPage);
          setCurrentPage(data.persetujuan.data.page);
        } else getDataMemoServer();
      } else getDataMemoServer();
    }
  };

  const handleRefresh = () => {
    getDataMemoServer();
  };

  const handleMemoBerbintang = async (index, isBerbintang, id, noDokumen) => {
    let resp;
    if (isBerbintang === 1) {
      resp = await deleteMemoBerbintangById(id, noDokumen);
    } else {
      resp = await addMemoBerbintangById(id, noDokumen);
    }

    if (resp && resp.code === 200) {
      const updatedDataTable = dataMemo;
      const updatedMemo = updatedDataTable[index];
      updatedMemo.berbintang = isBerbintang === 1 ? 0 : 1;
      updatedDataTable[index] = updatedMemo;
      setDataMemo(updatedDataTable);
      addDataSessionStorage(updatedDataTable, currentPage, totalPages);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedIdData([...selectedIdData, id]);
    } else {
      setSelectedIdData(
        selectedIdData.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleSelectAll = () => {
    const allIds = dataMemo.map((item) => item.id);

    if (isAllChecked) {
      setSelectedIdData([]);
    } else {
      setSelectedIdData(allIds);
    }
    setIsAllChecked(!isAllChecked);
  };

  const deleteMemo = async () => {
    const resp = await deleteMemoById(selectedIdData[0]);
    if (resp && resp.data.code === 200) {
      setSelectedIdData([]);
      getDataMemoServer();
    }
  };

  const handleDeleteMemo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIdData.length > 0) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "ingin menghapus memo",
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
          deleteMemo();
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "tidak ada memo terseleksi",
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
    navigate(`/memo/pengajuan/${id}`);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataMemoServer();
  };

  useEffect(() => {
    getDataMemoServer();
  }, [currentPage]);

  return (
    <div className='col-md-9'>
      <Table
        Header={
          <>
            <HeaderTableMemo
              title={headerTitle}
              handleSearch={handleSearch}
              search={search}
              setSearch={setSearch}
            />
            <BoxControls
              handleSelectAll={handleSelectAll}
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
            <TitleTableMemo title={titleTable} />

            {dataMemo &&
              dataMemo.map((data, idx) => (
                <TableIsiMemo
                  key={idx}
                  index={idx}
                  data={data}
                  activeTab={"persetujuan"}
                  handleDetail={handleDetail}
                  handleCheckboxChange={handleCheckboxChange}
                  handleMemoBerbintang={handleMemoBerbintang}
                  isAllChecked={isAllChecked}
                />
              ))}
          </>
        }
        Footer={
          <>
            <BoxControls
              handleSelectAll={handleSelectAll}
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
