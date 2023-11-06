import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { getDataMeeting } from "../../api/meetingApi";
import { UserContext } from "../../context/AuthProvider";

const Table = () => {
  const user = useContext(UserContext);
  const [dataMeeting, setDataMeeting] = useState([]);
  const navigate = useNavigate();

  const column = [
    "Judul Meeting",
    "Anggota Meeting",
    "Lokasi",
    "Status",
    "Jadwal",
  ];

  const handlerDetail = (id) => {
    navigate(`./${id}`);
    // bacaPesan(id, user.id);
  };

  useEffect(() => {
    getDataMeeting(user.id).then((res) => {
      setDataMeeting(res);
    });
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card-body table-responsive p-0">
          <table className="table table-striped projects">
            <thead>
              <tr>
                {column.map((item, i) => (
                  <th
                    key={i}
                    className="nama"
                    style={
                      item === "Status"
                        ? { width: "8%" }
                        : item === "Anggota Meeting"
                        ? { width: "30%" }
                        : { width: "20%" }
                    }
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={(e) => {
                  e.preventDefault();
                  handlerDetail("tes");
                }}
              >
                <td>Rapat Koordinasi Ethos World</td>
                <td>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <img
                        alt="Avatar"
                        className="table-avatar"
                        src="https://adminlte.io/themes/v3/dist/img/avatar.png"
                      />
                    </li>
                    <li className="list-inline-item">
                      <img
                        alt="Avatar"
                        className="table-avatar"
                        src="https://adminlte.io/themes/v3/dist/img/avatar2.png"
                      />
                    </li>
                    <li className="list-inline-item">
                      <img
                        alt="Avatar"
                        className="table-avatar"
                        src="https://adminlte.io/themes/v3/dist/img/avatar3.png"
                      />
                    </li>
                    <li className="list-inline-item">
                      <img
                        alt="Avatar"
                        className="table-avatar"
                        src="https://adminlte.io/themes/v3/dist/img/avatar4.png"
                      />
                    </li>
                  </ul>
                </td>
                <td>Kantor Kinibalu 1 lt.2</td>
                <td className="project-state">
                  <span className="badges outlined-secondary2">
                    Berlangsung
                  </span>
                </td>
                <td>13 Juli 2023 | 10.00 - 11.00 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
