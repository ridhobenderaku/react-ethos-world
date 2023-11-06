import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import "../../components/document/tableDocument.css";
import { getDataDokumen } from "../../api/dokumenApi";
import Pagination from "../../components/pagination";
const optionFilter = [
  { value: "", label: "All" },
  { value: "Pesan", label: "Pesan" },
  { value: "Project", label: "Project" },
  { value: "Ide", label: "Ide" },
  { value: "Memo", label: "Memo" },
  { value: "Meeting", label: "Meeting" },
  { value: "Aktivitas", label: "Aktivitas" },
];
function Index() {
  const [datadokumen, setDatadokumen] = useState([]);
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const getData = async () => {
    const data = await getDataDokumen(currentPage, search, filter);
    if (data) {
      setDatadokumen(data.data);
      setTotalPages(data.totalPage);
    }
  };

  const handleChangeSelect = (selectedOptions) => {
    setFilter(selectedOptions.value);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleInputSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleRefresh = () => {
    getData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  useEffect(() => {
    getData();
  }, [currentPage, filter]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="d-flex flex-md-row  w-100 justify-content-between align-items-center">
              <h1 className="nama">Ruang Dokumen</h1>
            </div>
          </div>
        </div>

        <section className="content-body p-2">
          <div className="card">
            <div style={{ border: "none" }} className="card-header">
              <form className="d-flex w-100 flex-column flex-sm-row justify-content-end">
                <div className="col-sm-2 col-12 mb-sm-0 mb-2">
                  <Select
                    name="Select Category"
                    placeholder="Select Category - All"
                    options={optionFilter}
                    className="basic-multi-select input-xs"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      handleChangeSelect(selectedOptions)
                    }
                  />
                </div>
                <div className="d-flex col-sm-4 col-12">
                  <input
                    type="search"
                    value={search}
                    onChange={handleInputSearch}
                    className="form-control form-control-navbar "
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <div>
                    <button onClick={handleSearch} className="btn btn-success">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="pt-0 card-body table-responsive ">
              <table id="mytbl" className="table table-striped projects">
                <tbody>
                  <tr className="table-document header">
                    <th className="no">No.</th>
                    <th className="category">Category</th>
                    <th className="filename">Filename</th>
                    <th className="subject">Subject</th>
                    <th className="created">Created </th>
                    <th className="username">Fullname</th>
                    <th className="action">Action</th>
                  </tr>
                  {datadokumen &&
                    datadokumen.map((data, idx) => (
                      <tr key={idx} className="table-document content-hover">
                        <>
                          <td className="no"> {idx + 1} </td>
                          <td className="category"> {data.tipenya} </td>
                          <td className="filename ">
                            {data.namafilenya &&
                              data.namafilenya.map((file, idx) => (
                                <div key={idx}>
                                  {file.namafile}
                                  {idx !== data.namafilenya.length - 1 && (
                                    <p key={idx}> ,</p>
                                  )}
                                </div>
                              ))}
                          </td>
                          <td className="subject text-truncate">
                            {data.subjek}
                          </td>
                          <td className="created text-nowrap">
                            {data.tglbuat}
                          </td>
                          <td className="username text-truncate">
                            {data.namauser}
                          </td>
                          <td className="action">
                            {data.namafilenya &&
                              data.namafilenya.map((file, idx) => (
                                <Link
                                  key={idx}
                                  to={
                                    process.env.REACT_APP_API_PROD_GSTORAGE +
                                    file.link
                                  }
                                  target="_blank"
                                >
                                  <button className="btn btn-success">
                                    <i className="fas fa-download"></i>
                                  </button>
                                  {idx !== data.namafilenya.length - 1 && (
                                    <p key={idx}> ,</p>
                                  )}
                                </Link>
                              ))}
                          </td>
                        </>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <Pagination
                total={totalPage}
                current={currentPage}
                pagination={(crPage) => handleChangePage(crPage)}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Index;
