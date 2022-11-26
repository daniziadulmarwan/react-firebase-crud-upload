import { CountContex } from "context/CountContex";
import React, { useContext } from "react";
import "./counter.css";

export default function Counter() {
  const { state, dispatch } = useContext(CountContex);

  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex gap-2">
              <button
                onClick={() => dispatch({ type: "PLUS" })}
                style={{ minHeight: 40, minWidth: 40 }}
                className="btn plus rounded-1"
              >
                <i className="bi bi-plus-lg"></i>
              </button>

              <input
                type="text"
                className="form-control text-center rounded-1"
                disabled
                value={state.count}
              />

              <button
                onClick={() => dispatch({ type: "MINUS" })}
                style={{ minHeight: 40, minWidth: 40 }}
                className="btn minus rounded-1"
              >
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
