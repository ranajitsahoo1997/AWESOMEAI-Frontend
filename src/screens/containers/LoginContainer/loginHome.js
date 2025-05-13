import React from "react";
import "./loginHome.css";
function LoginHome({ children }) {
  return (
    <div>
      <nav>
        <header>
          <div className="navbar fixed-top ">
            <div className="container-fluid row">
              <div className="col-md-3">
                <a className="navbar-brand" href="#">
                  AWESOME AI
                </a>
              </div>

              <div className="links col-md-9">
                <a className="link" href="#">
                  Home
                </a>
                <a className="link" href="#">
                  About us
                </a>
                <a className="link" href="#">
                  Contact
                </a>
                <a className="link" href="#">
                  Services
                </a>
                {window.location.pathname === "/" ? (
                  <a className="link" href="#">
                    Register
                  </a>
                ) : (
                  <a className="link" href="#">
                    Login
                  </a>
                )}
              </div>
            </div>
            
          </div>
        </header>
      </nav>
      <main className="vh-100">{children}</main>
    </div>
  );
}

export default LoginHome;
