import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  getDataAllPesanByType,
  hapusPesanBerbintang,
} from "../../api/pesanApi";
import { deletePesan, setPesanBerbintang, bacaPesan } from "../../api/pesanApi";
import { ReactContext } from "../../context/AuthProvider";
import { Table } from "../../components/table/table";
import { BoxControls } from "../../components/table/boxControls";
import { HeaderTablePesan } from "../../components/pesan/table/headerTablePesan";
import TableIsiPesan from "../../components/pesan/table/tableIsiPesan";
import TitleTablePesan from "../../components/pesan/table/titleTablepesan";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";

const headerMenu = [
  {
    title: "Terkirim",
    icon: "fas fa-paper-plane",
  },
];
const titleTable = [
  { title: "", style: "default" },
  { title: "", style: "default" },
  { title: "Nama Penerima", style: "pengirim" },
  { title: "Subjek Pesan", style: "subject" },
  { title: "Isi Pesan", style: "isi" },
  { title: "Tanggal", style: "date" },
];
export default function TerkirimPesan() {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Terkirim");
  const [dataTable, setDataTable] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPesan, setSelectedPesan] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [resetCheck, setResetCheck] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const sortirPesan = (data) => {
    const newData = data;

    if (data.komentar && data.komentar.length > 0) {
      for (let index = data.komentar.length; index > 0; index--) {
        if (data.komentar[index - 1].nama === user.fullname) {
          newData.isi = data.komentar[index - 1].isi;
          newData.pemilik[0] = {
            id: data.pemilik[0].id,
            nama: data.komentar[data.komentar.length - 1].nama,
          };
          return newData;
        }
      }
    }
    return newData;
  };
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
              terkirim: {
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

      if (!pesan.terkirim) {
        pesan = {
          ...pesan,
          terkirim: {
            data: { data: data, page: page, totalPage: totalPage },
          },
        };
      } else
        pesan["terkirim"] = {
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
      "terkirim",
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
      if (data.terkirim) {
        if (currentPage === 0 || currentPage === data.terkirim.data.page) {
          setDataTable(data.terkirim.data.data);
          setTotalPages(data.terkirim.data.totalPage);
          setCurrentPage(data.terkirim.data.page);
        } else getDataPesanServer();
      } else getDataPesanServer();
    }
  };

  const handleRefresh = () => {
    getDataPesanServer();
  };

  const handlePesanBerbintang = async (index, idpesan, isBerbintang) => {
    let resp;
    if (isBerbintang)
      resp = await hapusPesanBerbintang(idpesan, user.id, user.fullname);
    else resp = await setPesanBerbintang(idpesan, user.id, user.fullname);
    if (resp && resp.code === 200) {
      const updatedDataTable = dataTable;
      const updatedPesan = updatedDataTable[index];
      updatedPesan.berbintang = isBerbintang ? 0 : 1;
      updatedDataTable[index] = updatedPesan;
      setDataTable(updatedDataTable);
      addDataSessionStorage(dataTable, currentPage, totalPages);
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

  // useEffect(() => {
  //   getDataPesanServer();
  // }, []);
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
                  type='terkirim'
                  key={idx}
                  index={idx}
                  data={sortirPesan(data)}
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
