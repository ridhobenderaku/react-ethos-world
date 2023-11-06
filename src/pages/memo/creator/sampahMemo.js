import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../../context/AuthProvider";
import { DeletePermanenMemoById, getAllMemoByType } from "../../../api/memoApi";
import { Table } from "../../../components/table/table";
import { HeaderTableMemo } from "../../../components/memo/tabel/HeaderTableMemo";
import { BoxControls } from "../../../components/table/boxControls";
import TableIsiMemo from "../../../components/memo/tabel/tableIsiMemo";
import TitleTableMemo from "../../../components/memo/tabel/titleTableMemo";
import { base64ToBytes, bytesToBase64 } from "../../../utils/encodeDecode";

const headerTitle = {
  name: "Sampah",
  icon: "fas fa-trash-alt",
};

const titleTable = [
  { title: "", style: "default" },
  { title: "Disetujui Oleh", style: "author" },
  { title: "Perihal Memo", style: "perihal" },
  { title: "Isi Memo", style: "isi" },
  { title: "Tanggal", style: "date" },
];

const SampahMemo = () => {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [dataMemoSampah, setdataMemoSampah] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIdData, setSelectedIdData] = useState([]);
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
    if (!sessionStorage.getItem("memo")) {
      sessionStorage.setItem(
        "memo",
        bytesToBase64(
          new TextEncoder().encode(
            JSON.stringify({
              sampah: { data: data, page: page, totalPage: totalPage },
            })
          )
        )
      );
    } else {
      let memo = JSON.parse(atob(sessionStorage.getItem("memo")));
      memo["sampah"] = {
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
      "sampah",
      10,
      0,
      0,
      search
    );
    if (data) {
      setdataMemoSampah(data.data);
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
    if (!sessionStorage.getItem("memo")) {
      getDataMemoServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("memo")))
      );
      if (data.sampah) {
        if (currentPage === 0 || currentPage === data.sampah.data.page) {
          setdataMemoSampah(data.sampah.data.data);
          setTotalPages(data.sampah.data.totalPage);
          setCurrentPage(data.sampah.data.page);
        } else getDataMemoServer();
      } else getDataMemoServer();
    }
  };

  const handleRefresh = () => {
    getDataMemoServer();
  };

  const handleDetail = (id) => {
    navigate(`./${id}`);
  };

  const handleCheckboxChange = (id, index, isChecked) => {
    if (isChecked) {
      setSelectedIdData([...selectedIdData, id]);
    } else {
      setSelectedIdData(
        selectedIdData.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleSelectAll = () => {
    const allIds = dataMemoSampah.map((item) => item.id);

    if (isAllChecked) {
      setSelectedIdData([]);
    } else {
      setSelectedIdData(allIds);
    }
    setIsAllChecked(!isAllChecked);
  };

  const deleteMemo = async () => {
    const resp = await DeletePermanenMemoById(selectedIdData, user.id);
    if (resp && resp.data.code === 200) {
      setSelectedIdData([]);
      getDataMemoServer();
      setResetCheck(!resetCheck);
    }
  };

  const handleDeleteMemo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIdData.length > 0) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "ingin menghapus memo Selamanya",
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
    <>
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
                handleDeleteItem={handleDeleteMemo}
                handleRefresh={handleRefresh}
                handleIncrementPages={handleIncrementPages}
                handleDecrementPages={handleDecrementPages}
                handleChangePage={handleChangePage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
              {/* <div
                className='d-flex p-2 justify-content-center'
                style={{ backgroundColor: "#D8E6CF", gap: "15px" }}>
                <div>
                  <p>
                    Sampah yang ada di sampah selama lebih dari 30 hari akan di
                    hapus secara otomatis
                  </p>
                </div>
                <div>
                  <button className='btn btn-block btn-primary btn-xs p-2'>
                    <i className='fa fa-trash-alt' /> kosongkan Sampah
                  </button>
                </div>
              </div> */}
            </>
          }
          Content={
            <>
              <TitleTableMemo title={titleTable} />

              {dataMemoSampah &&
                dataMemoSampah.map((data, idx) => (
                  <TableIsiMemo
                    key={idx}
                    index={idx}
                    data={data}
                    activeTab={"Sampah"}
                    handleDetail={handleDetail}
                    handleCheckboxChange={handleCheckboxChange}
                    isAllChecked={isAllChecked}
                    resetCheck={resetCheck}
                  />
                ))}
            </>
          }
          Footer={
            <>
              <BoxControls
                handleSelectAll={handleSelectAll}
                handleDeleteItem={handleDeleteMemo}
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
    </>
  );
};

export default SampahMemo;
