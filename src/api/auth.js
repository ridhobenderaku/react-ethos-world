import axios from "axios";
import Swal from "sweetalert2";

const auth = async (username, password) => {
  try {
    const form = new FormData();
    form.append("user", username);
    form.append("pass", password);

    const { data } = await axios.post(
      process.env.REACT_APP_API_PROD_POST + `auth/login`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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

    return null;
  }
};

export default auth;
