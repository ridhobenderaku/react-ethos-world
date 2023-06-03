import { useRef, useState } from 'react';

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
    // const [isLoggedin, setIsLoggedin] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [loader, setLoader] = useState(false);
    const handleSubmit = async (event) => {
      setLoader(true);
      event.preventDefault();

      var requestOptions = {
        method: "POST",
        headers: {
          // "secretcode": "Ebliethos123",
          // "secretkey": "Bearer 1w4194jri32orjq3r",
          // "Content-Type": "application",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "email=" + username.value + "&password=" + password.value,
      };
  
      const api = await fetch(
        // `https://staging-api-edms.ethos.co.id/api/ethos/production/login`,
        process.env.REACT_APP_API_URL2 +`auth/login`,
        // process.env.REACT_APP_API_URL +`production/login`,
        // process.env.REACT_APP_API_SECRETCODE+
        // process.env.REACT_APP_API_SECRETKEY+
        // process.env.REACT_APP_API_CONTENTTYPE,
        requestOptions
      );
      const res = await api.json();
  
      if (api.ok) {
        sessionStorage.setItem("auth", JSON.stringify(res));
        setLoader(false);
        setRedirect(true);
      } else {
        setLoader(false);
        alert("Email Atau Password Yang Anda Masukkan Tidak Sesuai!");
      }
    };
   const loginRedirect = JSON.parse(sessionStorage.getItem("auth"));

  if (redirect === true) {
    return window.location.reload();
  } else if (loginRedirect !== null && loginRedirect.data.role === 6) {
    return (window.location.hash = "#/memo");
  } else if (loginRedirect !== null && loginRedirect.data.role === 7) {
    return (window.location.hash = "#/dashboard-gudang");
  } else if (loginRedirect !== null && loginRedirect.data.role === 5) {
    return (window.location.hash = "#/dashboard-adv");
  } else if (loginRedirect !== null && loginRedirect.data.role === 8) {
    return (window.location.hash = "#/dashboard");
  } else if (loginRedirect !== null && loginRedirect.data.role === 2) {
    return (window.location.hash = "#/dashboard-supervisor");
  } else if (loginRedirect !== null && loginRedirect.data.role === 9) {
    return (window.location.hash = "#/transaksi-berjalan-cc");
  } else if (loginRedirect !== null && loginRedirect.data.role === 1) {
    return (window.location.hash = "#/dashboard-ceo");
  }
  return (
 <>

<div className="hold-transition login-page" >
  <div className="wrapper">
    <nav className="navbar navbar-expand">
      <ul className="navbar-nav ml-md-auto">
        <div className="custom-control custom-switch custom-switch-off-primary custom-switch-on-info">
          {/* <input type="checkbox" className="custom-control-input" id="dark" <?php if (isset($_cookie["is_mode"])) { ? /> checked ?php } ?&gt; */}
          <label className="custom-control-label" htmlFor="dark" />
        </div>
      </ul>
    </nav>
    <section className="content">
      <div className="container-fluid">
        <div className="lockscreen-wrapper">
          <div className="login-box">
            <div className="card card-outline card-primary">
              <div className="card-header text-center">
                <img src="logo/logoethosWord.png" loading="lazy" alt="User Image" />
              </div>
              <div className="card-body">
                {/*?php Flasher::pesan(); ?*/}
                    <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <input type="hidden" name="key" id="key"  />
                    <input type="text" id="user" className="form-control" 
                    ref={userRef}
                     placeholder="Username or Mobile" 
                     required maxLength={25} 
                     {...username}
                    //  onChange={(e) => setUser(e.target.value)}
                    //         value={email}
                            />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  <p className="text-danger" id="err_id" />
                  <div className="input-group mb-3">
                    <input type="password" id="pass" name="pass" 
                    className="form-control" placeholder="Password" required maxLength={10}
                     autoComplete="off"
                    //  onChange={(e) => setPwd(e.target.value)}
                    //         value={password}
                    {...password}
                     />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <p className="text-danger" id="err_ps" />
                  <div className="row">
                    <div className="col-8">
                      {/* <input type="checkbox" id="remember" name="remember" <?php if (isset($_cookie["is_login"])) { ? /> checked ?php } ?&gt; */}
                      <label htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                    <div className="col-4">
                    <button className="btn btn-primary btn-block" >Sign In</button>
                      {/* <input type="submit" className="btn btn-primary btn-block" defaultValue="Sign In " /> */}
                    </div>
                  </div>
                  {/* <input type="checkbox" id="mode" name="mode" <?php if (isset($_cookie["is_mode"])) { ? /> checked ?php } ? hidden&gt; */}
                </form>
              </div>
              <div className="card-footer">
                <button className="add-button btn btn-primary btn-block">Install to home screen</button>
                <div id="offline-notification" className="online">
                  <div className="offline-wrapper bg-danger text-white">
                    {/* <div className="container-fluid">
                      Oops, your internet is disconnected. Please check your signal
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  </div>

</>

  );
};

export default Login;
