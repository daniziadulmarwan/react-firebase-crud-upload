import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = () => {
    setIsLoading(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Fullname
                  </label>
                  <Input type="text" id="name" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <Input type="email" id="email" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Input type="password" id="password" onChange={() => {}} />
                </div>

                <div className="mb-3">
                  {isLoading ? (
                    <Button
                      className="btn btn-primary rounded-1 w-100"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Loading...</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={onSignUp}
                      type="button"
                      className="btn btn-primary rounded-1 w-100"
                    >
                      <i className="bi bi-send me-2"></i> Submit
                    </Button>
                  )}
                </div>
              </form>

              <div className="text-center">
                Already have account ? <Link to="/">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
