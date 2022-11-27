import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import Dashboard from "pages/Admin/Dashboard";
import Users from "pages/Admin/Users";
import SignIn from "pages/Signin";
import NotFound from "pages/NotFound";
import SignUp from "pages/Signup";
import Counter from "pages/Counter";
import { CountContexProvider } from "context/CountContex";
import Instansi from "pages/Admin/Instansi";

export default function Router() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/instansi"
        element={
          <RequireAuth>
            <Instansi />
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

      <Route
        path="/"
        element={
          <CountContexProvider>
            <SignIn />
          </CountContexProvider>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="counter"
        element={
          <CountContexProvider>
            <Counter />
          </CountContexProvider>
        }
      />
    </Routes>
  );
}
