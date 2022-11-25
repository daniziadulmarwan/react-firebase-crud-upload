import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../configs/firebase";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const onSignout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        toast.success("Berhasil logout");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      })
      .catch((error) => {
        toast.success(error.message);
      });
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#!">
        React Firebase
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <input
        className="form-control form-control-dark w-100 rounded-0 border-0"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <a className="nav-link px-3" href="#!" onClick={onSignout}>
            <i className="bi bi-box-arrow-right me-2"></i>
            Sign out
          </a>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </header>
  );
}
