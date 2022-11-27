import React from "react";
import SideBar from "components/organisms/SideBar";
import TopBar from "components/organisms/TopBar";

export default function Instansi() {
  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          <SideBar />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Instansi</h1>
              <div className="btn-toolbar mb-2 mb-md-0"></div>
            </div>

            {/* START: Main Content */}
            {/* END: Main Content */}
          </main>
        </div>
      </div>
    </>
  );
}
