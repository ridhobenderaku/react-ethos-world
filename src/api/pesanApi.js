import Swal from "sweetalert2";

import { baseURlPost, baseURlView } from "./baseAPI";

export const getDataAllPesanByType = async (
  id,
  page,
  limit,
  startDate,
  endDate,
  type,
  search = ""
) => {
  try {
    const data = await baseURlView.get(
      `pesan/getAll/${type}/${id}?page=${page}&limit=${limit}&startDate=0&endDate=0&search=${search}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const setPesanBerbintang = async (idpesan, idpengirim, username) => {
  try {
    const form = new FormData();

    form.append("idpesan", idpesan);
    form.append(
      "authId",
      JSON.stringify({ id: idpengirim.toString(), nama: username })
    );

    const data = await baseURlPost.post(`pesan/berbintangpesan`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const hapusPesanBerbintang = async (idpesan, idpengirim, username) => {
  try {
    const form = new FormData();
    form.append("idpesan", idpesan);
    form.append("authId", idpengirim.toString());

    const data = await baseURlPost.post(`pesan/hapusberbintang`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await baseURlView.get("users");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const notif = async (data) => {
  try {
    const resp = await baseURlView.get(
      `send-notifpesan/{"id":"${data.id}","read":"false"}/${data.id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const tambahPesan = async (
  idPengirim,
  namaPengirim,
  kepada,
  subjek,
  file,
  isi
) => {
  try {
    const form = new FormData();

    form.append("subjek", subjek);
    form.append("isi", isi);
    form.append("draft", 0);
    form.append("arsip", JSON.stringify([]));
    form.append("delete", JSON.stringify([]));
    form.append("deletepermanen", JSON.stringify([]));
    form.append("berbintang", JSON.stringify([]));
    form.append("idauth", idPengirim);

    form.append(
      "authId",
      JSON.stringify([{ id: idPengirim, nama: namaPengirim }])
    );
    form.append("tim", JSON.stringify(kepada ? kepada : []));
    form.append("file", JSON.stringify(file ? file : []));

    const data = await baseURlPost.post("pesan/kirimpesan", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    kepada.forEach((element) => {
      notif({ id: element.id, nama: element.username });
    });

    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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

export const tambahPesanDraft = async (
  idPesan,
  idPengirim,
  namaPengirim,
  kepada,
  subjek,
  file,
  isi
) => {
  try {
    const form = new FormData();
    form.append("idpesan", idPesan ? idPesan : "0");
    form.append("subjek", subjek);
    form.append("isi", isi);
    form.append("draft", 1);
    form.append("arsip", JSON.stringify([]));
    form.append("delete", JSON.stringify([]));
    form.append("deletepermanen", JSON.stringify([]));
    form.append("berbintang", JSON.stringify([]));
    form.append("idauth", idPengirim);
    form.append(
      "authId",
      JSON.stringify([{ id: idPengirim, nama: namaPengirim }])
    );
    form.append("tim", JSON.stringify(kepada ? kepada : []));
    form.append("file", JSON.stringify(file ? file : []));

    const data = await baseURlPost.post("pesan/draftpesan", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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
export const tambahPesanDraftToSend = async (
  idPesan,
  idPengirim,
  namaPengirim,
  kepada,
  subjek,
  file,
  isi
) => {
  try {
    const form = new FormData();
    form.append("idpesan", idPesan ? idPesan : "0");
    form.append("subjek", subjek);
    form.append("isi", isi);
    form.append("draft", 0);
    form.append("arsip", JSON.stringify([]));
    form.append("delete", JSON.stringify([]));
    form.append("deletepermanen", JSON.stringify([]));
    form.append("berbintang", JSON.stringify([]));
    form.append(
      "authId",
      JSON.stringify([{ id: idPengirim, nama: namaPengirim }])
    );
    form.append("tim", JSON.stringify(kepada ? kepada : []));
    form.append("file", JSON.stringify(file ? file : []));

    const data = await baseURlPost.post("pesan/draftpesan", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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
export const deletePesan = async (pesan) => {
  try {
    const form = new FormData();
    form.append(
      "idpesan",
      JSON.stringify(
        pesan.map((item, index) => {
          return {
            id: item.id,
            authId: JSON.stringify([
              {
                id: pesan[index].authId.toString(),
                nama: pesan[index].username,
              },
            ]),
          };
        })
      )
    );

    const data = await baseURlPost.post(`pesan/hapuspesan`, form, {
      headers: {
        "Content-Type": "text/html",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data.data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
      customClass: {
        popup: "popup-alert-small",
        icon: "icon",
        title: "title",
        htmlContainer: "htmlContainer",
        confirmButton: "btn",
        denyButton: "btn",
        cancelButton: "btn",
      },
      showConfirmButton: true,
    });
  }
};
export const deletePesanSelamanya = async (pesan) => {
  try {
    const form = new FormData();
    form.append(
      "idpesan",
      JSON.stringify(
        pesan.map((item, index) => {
          return {
            id: item.id,
            authId: JSON.stringify([
              {
                id: pesan[index].authId.toString(),
                nama: pesan[index].username,
              },
            ]),
          };
        })
      )
    );

    const data = await baseURlPost.post(`pesan/hapuspesanselamanya`, form, {
      headers: {
        "Content-Type": "text/html",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data.data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
      customClass: {
        popup: "popup-alert-small",
        icon: "icon",
        title: "title",
        htmlContainer: "htmlContainer",
        confirmButton: "btn",
        denyButton: "btn",
        cancelButton: "btn",
      },
      showConfirmButton: true,
    });
  }
};
export const bacaPesan = async (idpesan, iduser) => {
  try {
    const form = new FormData();
    form.append("idpesan", idpesan);
    form.append("iduser", iduser);

    const resp = await baseURlPost.post(`pesan/bacapesan`, form, {
      headers: {
        "Content-Type": "text/html",
      },
    });

    return resp.data.code;
  } catch (error) {
    console.log(error);
  }
};
export const balasPesan = async (
  idPesan,
  idComment,
  idPengirim,
  kepada,
  username,
  isi,
  file
) => {
  try {
    const form = new FormData();

    form.append("idpesan", idPesan);
    form.append(
      "komentar",
      JSON.stringify({
        uuid: idComment,
        id: idPengirim.toString(),
        kepada: kepada,
        nama: username,
        read: "false",
        isi: isi,
        tgl: new Date(),
        file: JSON.stringify(file ? file : []),
      })
    );

    const data = await baseURlPost.post(`pesan/komenpesan`, form, {
      headers: {
        "Content-Type": "text/html",
      },
    });
    kepada.forEach((element) => {
      notif(element);
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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

export const getPesanById = async (idpesan) => {
  try {
    const resp = await baseURlView.get(
      `pesan/detail/${idpesan}?page=1&limit=10&search=&startDate=0&endDate=0`
    );
    return resp.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const arsipPesan = async (idpesan, idpengirim, username) => {
  try {
    const form = new FormData();
    form.append("idpesan", idpesan);
    form.append(
      "authId",
      JSON.stringify({ id: idpengirim.toString(), nama: username })
    );

    const data = await baseURlPost.post(`pesan/arsippesan`, form, {
      headers: {
        "Content-Type": "text/html",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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

    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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
export const pulihkanPesan = async (idpesan, idpengirim) => {
  try {
    const form = new FormData();
    form.append("idpesan", idpesan);
    form.append("authId", idpengirim);

    const data = await baseURlPost.post(`pesan/hapusarsip`, form, {
      headers: {
        "Content-Type": "text/html",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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

    return data.data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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
export const pulihkanPesanSampah = async (idpesan, idpengirim) => {
  try {
    const form = new FormData();
    form.append("idpesan", idpesan);
    form.append("authId", idpengirim);
    const data = await baseURlPost.post(`pesan/pulihkanhapus`, form, {
      headers: {
        "Content-Type": "text/html",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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

    return data.data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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
