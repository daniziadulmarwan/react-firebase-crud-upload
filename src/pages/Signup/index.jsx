import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "configs/firebase";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const onSignUp = () => {
    if (email === "" || password === "" || confirmPass === "") {
      toast.warning("All field cannot be empty");
      return;
    }

    if (password.toString() !== confirmPass.toString()) {
      toast.warning("Confirm password not same");
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        toast.success("Register berhasil");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email sudah terdaftar");
            break;
          case "auth/invalid-email":
            toast.error("Email tidak valid");
            break;
          case "auth/operation-not-allowed":
            toast.error("Terjadi kesalahan, silahkan ulangi lagi");
            break;
          case "auth/weak-password":
            toast.error("Password minimal 6 karakter");
            break;
          default:
            toast.error(error.message);
            break;
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <Input
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    type="password"
                    id="confirmPassword"
                  />
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

      <ToastContainer theme="colored" />
    </div>
  );
}
