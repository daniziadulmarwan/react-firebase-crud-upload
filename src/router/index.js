import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import SignIn from "../pages/Signin";

export default function Router() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/signin" />;
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth>
            <Users />
          </RequireAuth>
        }
      />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}
