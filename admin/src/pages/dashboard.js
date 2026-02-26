import React from "react";
import "./dashboard.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
function Dashboard() {
  return (
    <>
      <div className="page-content">
        <div className="page-header">
          <div className="container-fluid">
            <h2 className="h5 no-margin-bottom">Dashboard</h2>
          </div>
        </div>

        <section className="no-padding-top no-padding-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="statistic-block block">
                  <div className="progress-details d-flex align-items-end justify-content-between">
                    <div className="title">
                      <div className="icon">
                        <i className="icon-user-1"></i>
                      </div>
                      <strong>New Clients</strong>
                    </div>
                    <div className="number dashtext-1">27</div>
                  </div>
                  <div className="progress progress-template">
                    <div
                      className="progress-bar progress-bar-template dashbg-1"
                      role="progressbar"
                      style={{ width: "30%" }}
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="statistic-block block">
                  <div className="progress-details d-flex align-items-end justify-content-between">
                    <div className="title">
                      <div className="icon">
                        <i className="icon-contract"></i>
                      </div>
                      <strong>New Projects</strong>
                    </div>
                    <div className="number dashtext-2">375</div>
                  </div>
                  <div className="progress progress-template">
                    <div
                      className="progress-bar progress-bar-template dashbg-2"
                      role="progressbar"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="statistic-block block">
                  <div className="progress-details d-flex align-items-end justify-content-between">
                    <div className="title">
                      <div className="icon">
                        <i className="icon-paper-and-pencil"></i>
                      </div>
                      <strong>New Invoices</strong>
                    </div>
                    <div className="number dashtext-3">140</div>
                  </div>
                  <div className="progress progress-template">
                    <div
                      className="progress-bar progress-bar-template dashbg-3"
                      role="progressbar"
                      style={{ width: "55%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="statistic-block block">
                  <div className="progress-details d-flex align-items-end justify-content-between">
                    <div className="title">
                      <div className="icon">
                        <i className="icon-writing-whiteboard"></i>
                      </div>
                      <strong>All Projects</strong>
                    </div>
                    <div className="number dashtext-4">41</div>
                  </div>
                  <div className="progress progress-template">
                    <div
                      className="progress-bar progress-bar-template dashbg-4"
                      role="progressbar"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-padding-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4">
                <div className="bar-chart block no-margin-bottom">
                  <canvas id="barChartExample1"></canvas>
                </div>
                <div className="bar-chart block">
                  <canvas id="barChartExample2"></canvas>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="line-cahrt block">
                  <canvas id="lineCahrt"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- MORE SECTIONS CONTINUE EXACTLY SAME --- */}
      </div>
    </>
  );
}

export default Dashboard;
