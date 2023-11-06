import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import auth from "../../api/auth";
import "./login.css";

const Login = () => {
  const userRef = useRef();

  const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    return {
      value,
      onChange: handleChange,
    };
  };

  const username = useFormInput("");
  const password = useFormInput("");
  const [loader, setLoader] = useState(false);

  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    const resp = await auth(username.value, password.value);

    if (resp && resp.message === "login Berhasil") {
      sessionStorage.setItem("auth", btoa(JSON.stringify(resp.data.role)));
      window.location.hash = "#/dashboard";
      window.location.reload();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: resp ? resp.message : "connection error",
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

    setLoader(false);
  };

  const handleInstall = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  const fieldInstallBtn = () => {
    if (!supportsPWA) {
      return null;
    }
    return (
      <button
        style={{ maxWidth: "478px" }}
        onClick={handleInstall}
        className="btn btn-primary btn-lg btn-block mt-5"
      >
        Install to home screen
      </button>
    );
  };

  useEffect(() => {
    const handler = (e) => {
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);
  return (
    <>
      <section>
        <div className="login-container">
          <div className="left-container">
            <img
              width={382}
              className="logo d-none d-sm-flex"
              src="/img/logo/logoEthosWorld.svg"
            />
            <img
              width={150}
              className="logo d-flex d-sm-none"
              src="/img/logo/logoEthosWorldPutih.png"
            />
            <img
              className="background"
              src="/img/logo/backgroundLoginGreen.svg"
            />
          </div>
          <div className="right-container">
            <div className="form">
              <h1 style={{ color: "#D9E021" }} className="m-0">
                Selamat Datang!
              </h1>
              <p style={{ color: "white" }} className="m-0">
                Tolong masukkan Username dan Password anda
              </p>
              <form
                style={{ width: "fit-content", maxWidth: "100%" }}
                onSubmit={handleSubmit}
                className=" mt-5"
              >
                {/* Email input */}
                <div
                  style={{ width: "478px", maxWidth: "100%" }}
                  className="form-outline mb-4 "
                >
                  <label style={{ color: "#D9E021" }} className="form-label">
                    Username
                  </label>
                  <input
                    ref={userRef}
                    {...username}
                    type="text"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    required
                  />
                </div>
                {/* Password input */}
                <div
                  style={{ width: "478px", maxWidth: "100%" }}
                  className="form-outline mb-4 "
                >
                  <label style={{ color: "#D9E021" }} className="form-label">
                    Password
                  </label>
                  <input
                    {...password}
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                  />
                </div>

                {/* Submit button */}
                {loader ? (
                  <button
                    disabled
                    style={{ maxWidth: "478px" }}
                    className="btn btn-primary btn-lg btn-block"
                  >
                    <div
                      className="spinner-border mx-auto text-light"
                      role="status"
                    ></div>
                  </button>
                ) : (
                  <button
                    style={{ maxWidth: "478px" }}
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Masuk
                  </button>
                )}
              </form>
              {fieldInstallBtn()}
            </div>
            <img
              className="background"
              height={157}
              src="/img/logo/backgroundLoginEmas.svg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
