import React, { useEffect, useState, useContext } from "react";
import {
  addBerbintangIde,
  deleteIde,
  getAllDataIde,
  removeBerbintangIde,
} from "../../api/ideApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { ReactContext } from "../../context/AuthProvider";
import { Table } from "../../components/table/table";
import { BoxControls } from "../../components/table/boxControls";
import { HeaderTableIde } from "../../components/ide/table/headerTableIde";
import BagikanIdeModal from "../../components/ide/bagikanIdeModal";
import TableIsiIde from "../../components/ide/table/tableIsiIde";
import TitleTableIde from "../../components/ide/table/titleTableIde";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";

const headerMenu = [
  {
    title: "Ide Saya",
    icon: "fas fa-lightbulb",
  },
];

const titleTable = [
  { title: "", style: "default" },
  { title: "", style: "default" },
  { title: "", style: "default" },
  { title: "Judul Ide", style: "title" },
  { title: "Isi Ide", style: "description" },
  { title: "Pemilik Ide", style: "author" },
  { title: "", style: "default" },
  { title: "Tanggal", style: "date" },
];

export default function RuangIde() {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Ide Saya");
  const [dataTable, setDataTable] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIde, setSelectedIde] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [resetCheck, setResetCheck] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDataSelected, setcurrentDataSelected] = useState(null);
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
    if (!sessionStorage.getItem("ide")) {
      sessionStorage.setItem(
        "ide",
        bytesToBase64(
          new TextEncoder().encode(
            JSON.stringify({
              ruangIde: { data: data, page: page, totalPage: totalPage },
            })
          )
        )
      );
    } else {
      let ide = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("ide")))
      );
      ide["ruangIde"] = {
        data: { data: data, page: page, totalPage: totalPage },
      };
      sessionStorage.setItem(
        "ide",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(ide)))
      );
    }
  };
  const getDataIdeServer = async () => {
    if (activeTab === "Ide Saya") {
      const data = await getAllDataIde(
        user.id,
        currentPage,
        10,
        0,
        0,
        "ruangide",
        search
      );
      if (data) {
        setDataTable(data.data);
        setTotalPages(data.totalPages);
        setCurrentPage(data.page === 0 ? 1 : data.page);
        addDataSessionStorage(
          data.data,
          data.page === 0 ? 1 : data.page,
          data.totalPages
        );
      }
    }
  };
  const getData = async () => {
    if (!sessionStorage.getItem("ide")) {
      getDataIdeServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("ide")))
      );
      if (data.ruangIde) {
        if (currentPage === 0 || currentPage === data.ruangIde.data.page) {
          setDataTable(data.ruangIde.data.data);
          setTotalPages(data.ruangIde.data.totalPage);
          setCurrentPage(data.ruangIde.data.page);
        } else getDataIdeServer();
      } else getDataIdeServer();
    }
  };

  const handleRefresh = () => {
    getDataIdeServer();
  };

  const handleIdeBerbintang = async (isBerbintang, idIde) => {
    let resp;
    if (isBerbintang) {
      resp = await removeBerbintangIde(user.id, user.fullname, idIde);
    } else {
      resp = await addBerbintangIde(user.id, user.fullname, idIde);
    }

    if (resp && resp.data.code === 200) {
      getDataIdeServer();
    }
  };
  const handleCheckboxChange = (id, index, isChecked) => {
    const currentIde = dataTable[index];
    if (isChecked) {
      setSelectedIde([
        ...selectedIde,
        {
          id: currentIde.idnyaide,
          authId: user.id,
        },
      ]);
    } else {
      setSelectedIde(selectedIde.filter((selectedId) => selectedId.id !== id));
    }
  };

  const handleSelectAll = () => {
    const allIde = dataTable.map((item) => {
      return { id: item.idnyaide, authId: user.id };
    });

    if (isAllChecked) {
      setSelectedIde([]);
    } else {
      setSelectedIde(allIde);
    }
    setIsAllChecked(!isAllChecked);
  };
  const handleDeleteIde = async () => {
    const res = await deleteIde(selectedIde);
    if (res && res.data.code === 200) {
      getDataIdeServer();
      setSelectedIde([]);
      setResetCheck(!resetCheck);
    }
  };

  const confirmDeleteIde = () => {
    if (selectedIde.length > 0) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "ingin menghapus ide",
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
          handleDeleteIde();
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "tidak ada ide terseleksi",
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

  const handleBerbagiIde = (data) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    setcurrentDataSelected(data);
    window.$("#bagikanIdeModal").modal("show");
  };
  const handleSalinIde = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataIdeServer();
  };

  useEffect(() => {
    getDataIdeServer();
  }, [currentPage, activeTab]);

  return (
    <div className='col-md-9'>
      <Table
        Header={
          <>
            <HeaderTableIde
              headerMenu={headerMenu}
              setActiveTab={setActiveTab}
              handleSearch={handleSearch}
              search={search}
              setSearch={setSearch}
            />
            <BoxControls
              handleSelectAll={handleSelectAll}
              handleDeleteItem={confirmDeleteIde}
              handleRefresh={handleRefresh}
              handleIncrementPages={handleIncrementPages}
              handleDecrementPages={handleDecrementPages}
              handleChangePage={handleChangePage}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            <BagikanIdeModal
              dataIde={currentDataSelected}
              type='edit'
              handleRefresh={handleRefresh}
            />
          </>
        }
        Content={
          <>
            <TitleTableIde title={titleTable} />
            {dataTable &&
              dataTable.map((data, idx) => (
                <TableIsiIde
                  user={user}
                  type='ruangIde'
                  key={idx}
                  data={data}
                  handleDetail={handleDetail}
                  handleCheckboxChange={handleCheckboxChange}
                  handleBerbagiIde={handleBerbagiIde}
                  handleIdeBerbintang={handleIdeBerbintang}
                  index={idx}
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
              handleDeleteItem={confirmDeleteIde}
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