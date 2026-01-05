import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar.component";
import ProtectedRoute from "./components/protected-route/protected-route.component";
import PublicRoute from "./components/public-route/public-route.component";
import AuthGate from "./components/auth-gate/auth-gate.component";

import LoginPage from "./pages/login/login.page";
import HomePage from "./pages/home/home.page";
import VehiclesPage from "./pages/vehicles/vehicles.page";
import UsersPage from "./pages/users/users.page";
import RegisterPage from "./pages/register/register.page";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          element={
            <AuthGate>
              <ProtectedRoute />
            </AuthGate>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
