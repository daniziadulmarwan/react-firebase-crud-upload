import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/dashboard">
              <i
                className="bi bi-house-door me-2 align-text-center"
                style={{ fontSize: 22 }}
              ></i>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/users">
              <i
                className="bi bi-people me-2 align-text-center"
                style={{ fontSize: 22 }}
              ></i>
              Students
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
