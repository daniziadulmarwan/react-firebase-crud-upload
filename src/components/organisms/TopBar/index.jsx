import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "configs/firebase";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

export default function TopBar() {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const username = currentUser.email.split("@")[0];

  const onSignout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        toast.success("Berhasil logout");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-center"
        to="/dashboard"
      >
        {username.toUpperCase()}
      </Link>
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
      <div className="w-100"></div>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <a className="nav-link px-3" href="#!" onClick={onSignout}>
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </a>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </header>
  );
}
