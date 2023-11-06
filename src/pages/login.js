import { useRef, useState } from "react";
import Swal from "sweetalert2";
import auth from "../api/auth";

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

  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();
    const { data, message } = await auth(username.value, password.value);

    if (message === "login Berhasil") {
      sessionStorage.setItem("auth", btoa(JSON.stringify(data.role)));
      window.location.hash = "#/dashboard";
      window.location.reload();
    } else {
      Swal.fire({
        title: message,
        icon: "warning",
      });
      // alert(message);
    }

    setLoader(false);
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="/img/logo/logoEthosWorldVertical.png"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    ref={userRef}
                    {...username}
                    type="text"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    required
                  />
                  <label className="form-label">Email address</label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    {...password}
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                  />
                  <label className="form-label">Password</label>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  {/* <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label"> Remember me </label>
                  </div>
                  <a href="#!">Forgot password?</a> */}
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
                <div className="divider d-flex align-items-center my-4"></div>
                {/* <button className="add-button btn btn-primary btn-block">
                  Install to home screen
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
