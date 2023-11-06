import React, { useState, useContext, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ReactContext } from "../../context/AuthProvider";
import { getIdeById } from "../../api/ideApi";
import Discussion from "../../components/ide/detailIde/discussion";
import EditDetailIde from "../../components/ide/detailIde/editDetailIde";
import ViewDetailIde from "../../components/ide/detailIde/viewDetailIde";

const DetailIde = ({ type }) => {
  const { user } = useContext(ReactContext);
  const { id } = useParams();
  const [dataIde, setdataIde] = useState(null);
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const isUserAuthor = () => {
    let isAuthor = false;
    if (dataIde.pemilik[0].nama === user.fullname) isAuthor = true;
    return isAuthor;
  };

  const getEditor = () => {
    let editor = "pemilik";
    if (dataIde && dataIde.tim) {
      dataIde.tim.forEach((item) => {
        if (Number(item.id) === user.id) editor = item.editor;
      });
    }
    return editor;
  };
  const handleRefresh = () => {
    getIdeById(id).then((res) => {
      if (res) {
        res.tim = res.tim
          ? res.tim
          : [{ id: user.id, label: user.fullname, editor: "pemilik" }];
        setdataIde(res);
      }
    });
  };
  useEffect(() => {
    getIdeById(id).then((res) => {
      if (res) {
        res.tim = res.tim
          ? res.tim
          : [{ id: user.id, label: user.fullname, editor: "pemilik" }];
        setdataIde(res);
      }
    });
  }, []);
  return (
    <>
      {dataIde && (
        <div className='col-md-9'>
          {isUserAuthor() && type !== "sampah" && type !== "arsip" ? (
            <EditDetailIde
              handleGoBack={handleGoBack}
              type={type}
              user={user}
              dataIde={dataIde}
            />
          ) : (
            <ViewDetailIde
              type={type}
              berbintang={dataIde?.berbintang}
              judulIde={dataIde?.judul}
              isiIde={dataIde?.isinya}
              file={dataIde?.filenya}
              handleGoBack={handleGoBack}
              user={user}
              idIde={id}
              editor={getEditor()}
              namaPembuat={dataIde?.pemilik[0].nama}
            />
          )}
          {type !== "ruangIde" && (
            <Discussion
              commentId={dataIde.id}
              ideId={id}
              userId={user.id}
              type={type}
              editor={getEditor()}
              dataAllComment={
                dataIde.komentar ? dataIde.komentar.reverse() : null
              }
              userName={user.fullname}
              handleRefresh={handleRefresh}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DetailIde;
