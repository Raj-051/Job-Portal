import React from "react";
import "./header.css";
function Header() {
  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="search-panel">
            <div className="search-inner d-flex align-items-center justify-content-center">
              <div className="close-btn">
                Close <i className="fa fa-close"></i>
              </div>
              <form id="searchForm" action="#">
                <div className="form-group">
                  <input
                    type="search"
                    name="search"
                    placeholder="What are you searching for..."
                  />
                  <button type="submit" className="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="navbar-header">
              <a href="index.html" className="navbar-brand">
                <div className="brand-text brand-big visible text-uppercase">
                  <strong className="text-primary">Job</strong>
                  <strong>portal</strong>
                </div>
                <div className="brand-text brand-sm">
                  <strong className="text-primary">D</strong>
                  <strong>A</strong>
                </div>
              </a>

              <button className="sidebar-toggle">
                <i className="fa fa-long-arrow-left"></i>
              </button>
            </div>

            <div className="right-menu list-inline no-margin-bottom">
              <div className="list-inline-item">
                <a href="#" className="search-open nav-link">
                  <i className="icon-magnifying-glass-browser"></i>
                </a>
              </div>

              <div className="list-inline-item dropdown">
                <a
                  id="navbarDropdownMenuLink1"
                  href="http://example.com"
                  className="nav-link messages-toggle"
                >
                  <i className="icon-email"></i>
                  <span className="badge dashbg-1">5</span>
                </a>
              </div>

              <div className="list-inline-item dropdown">
                <a
                  id="navbarDropdownMenuLink2"
                  href="http://example.com"
                  className="nav-link tasks-toggle"
                >
                  <i className="icon-new-file"></i>
                  <span className="badge dashbg-3">9</span>
                </a>

                <div className="dropdown-menu tasks-list">
                  <a href="#" className="dropdown-item">
                    <div className="text d-flex justify-content-between">
                      <strong>Task 1</strong>
                      <span>40% complete</span>
                    </div>
                    <div className="progress">
                      <div
                        role="progressbar"
                        style={{ width: "40%" }}
                        className="progress-bar dashbg-1"
                      ></div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="list-inline-item logout">
                <a id="logout" href="login" className="nav-link">
                  Logout <i className="icon-logout"></i>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;