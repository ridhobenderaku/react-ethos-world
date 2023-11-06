import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { getDataAllPesanByType } from "../../api/pesanApi";
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
    title: "Draft",
    icon: "fas fa-file-alt",
  },
];

const titleTable = [
  { title: "", style: "default" },

  { title: "Nama Penerima", style: "pengirim" },
  { title: "Subjek Pesan", style: "subject" },
  { title: "Isi Pesan", style: "isi" },
  { title: "Tanggal", style: "date" },
];
export default function DraftPesan() {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Draft");
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
              draft: {
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
      if (!pesan.draft) {
        pesan = {
          ...pesan,
          draft: {
            data: { data: data, page: page, totalPage: totalPage },
          },
        };
      } else
        pesan["draft"] = {
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
      "draft",
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
      if (data.draft) {
        if (currentPage === 0 || currentPage === data.draft.data.page) {
          setDataTable(data.draft.data.data);
          setTotalPages(data.draft.data.totalPage);
          setCurrentPage(data.draft.data.page);
        } else getDataPesanServer();
      } else getDataPesanServer();
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
                  type='draft'
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
