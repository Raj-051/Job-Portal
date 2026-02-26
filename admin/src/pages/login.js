import React from "react";
import "./login.css";

function Login() {
  return (
    <> 
    <div className="login-page">
      <div className="container d-flex align-items-center min-vh-100">
        <div className="form-holder has-shadow w-100">
          <div className="row">

            {/* Left Section */}
            <div className="col-lg-6">
              <div className="info d-flex align-items-center h-100">
                <div className="content">
                  <div className="logo">
                    <h1>Dashboard</h1>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-lg-6 bg-white">
              <div className="form d-flex align-items-center h-101">
                <div className="content2">

                  <form>
                    <div className="form-group">
                      <input
                        id="login-username"
                        type="text"
                        name="username"
                        className="input-material"
                        placeholder="User Name"
                        required
                      />
                      <label
                        htmlFor="login-username"
                        className="label-material"
                      >
                      
                      </label>
                    </div>

                    <div className="form-group">
                      <input
                        id="login-email"
                        type="email"
                        name="email"
                        className="input-material"
                        placeholder="Email Address"
                        required
                      />
                      <label
                        htmlFor="login-email"
                        className="label-material"
                      >
                       
                      </label>
                    </div>

                    <div className="form-group">
                      <input
                        id="login-password"
                        type="password"
                        name="password"
                        className="input-material"
                        placeholder="Password"
                        required
                      />
                      <label
                        htmlFor="login-password"
                        className="label-material"
                      >
                       
                      </label>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  <a href="#" className="forgot-pass">
                    Forgot Password?
                  </a>
                  <br />
                  <small>Do not have an account?</small>
                  <a href="#" className="signup"> Signup</a>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="copyrights text-center">
        <p>
          2018 © Your company. Download From{" "}
          <a
            href="https://templateshub.net"
            target="_blank"
            rel="noreferrer"
          >
            Templates Hub
          </a>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;