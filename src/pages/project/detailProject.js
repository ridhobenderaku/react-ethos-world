import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ReactContext } from "../../context/AuthProvider";
import { getProjectById } from "../../api/projectApi";
import { convertToDateLocalString } from "../../utils/dateConversion";
import EditDetailProject from "../../components/project/detailProject/editDetailProject";
import ViewDetailProject from "../../components/project/detailProject/viewDetaillProject";
import ActionButton from "../../components/button/actionButton";

function DetailProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setNotifikasi } = useContext(ReactContext);
  const [dataProject, setDataProject] = useState(null);
  const [isEditMode, setisEditMode] = useState(false);

  const getData = async () => {
    const resp = await getProjectById(id, user.id);

    if (resp && resp.data) {
      resp.data.tgl = convertToDateLocalString(new Date(resp.data.tgl));
      setDataProject(resp.data);
    }

    if (resp && resp.read && resp.read === 200) {
      setNotifikasi((prev) => {
        return {
          ...prev,
          project: prev.project === 1 ? 0 : prev.project - 1,
        };
      });
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const handleCancelEdit = (e) => {
    e.preventDefault();
    // getData();
    setisEditMode(false);
  };

  const isUserAuthor = () => {
    let isAuthor = false;
    if (dataProject.anggota) {
      dataProject.anggota.forEach((item) => {
        if (item.label === user.fullname) {
          if (item.editor === "editor") isAuthor = true;
        }
      });
    }
    if (dataProject.pemilik === user.fullname) isAuthor = true;

    return isAuthor;
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {dataProject && (
        <div className='wrapper'>
          <div className='content-wrapper'>
            <section className='content-header px-3 pb-0 pt-3'>
              <div className='container-fluid'>
                <div
                  style={{ gap: "15px" }}
                  className='row mb-2 d-flex flex-column-reverse flex-sm-row  justify-content-between'>
                  <div
                    style={{ gap: "5px" }}
                    className='d-flex align-items-center col-10'>
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={handleBack}
                      className='fas fa-arrow-left mr-2 nama'
                    />
                    <h1
                      style={{ color: "#619A3F" }}
                      className='judul-menu text-break w-100'>
                      {dataProject.judul}
                    </h1>
                  </div>
                  <div style={{ gap: "5px" }} className='d-flex align-self-end'>
                    {/* <button className='btn btn-default btn-sm'>
                      <i className='fas fa-archive' />
                    </button> */}
                    {isUserAuthor() && (
                      <div>
                        <ActionButton
                          onClick={(e) => {
                            e.preventDefault();
                            setisEditMode(true);
                          }}
                          type='submit'
                          variant='primary'
                          icon='fas fa-edit'
                          text=' Edit'
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {isEditMode ? (
              <EditDetailProject
                projectId={id}
                user={user}
                handleCancelEdit={handleCancelEdit}
                dataProject={dataProject}
                handleBack={handleBack}
              />
            ) : (
              <ViewDetailProject
                dataProject={dataProject}
                handleBack={handleBack}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DetailProject;
