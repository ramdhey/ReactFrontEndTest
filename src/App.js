import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeUser from "./pages/home-user";
import HomeAdmin from "./pages/home-admin";
import Login from "./pages/login";
import Register from "./pages/register";
import SuksesRegister from "./pages/sukses-register";
import StoreState from "./state/store";
import ProtectedRoute from "./components/ProtectedRoute";
import AddLamaran from "./pages/add-lamaran";
import DetailLamaranUser from "./pages/detail-lamaran-user";
import EditLamaran from "./pages/edit-lamaran";
import DetailLamaranUseronAdmin from "./pages/detail-lamaran-user-on-admin";
function App() {
  const { role } = StoreState();
  console.log({ role });

  return (
    <Router>
      <Routes>
        {/* Rute untuk login dan register yang tidak membutuhkan autentikasi */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sukses-register" element={<SuksesRegister />} />
        <Route path="/add-lamaran" element={<AddLamaran />} />
        <Route path="/detail-lamaran/:id" element={<DetailLamaranUser />} />
        {/* Rute yang dilindungi dengan autentikasi token dan role */}

        <Route path="/beranda-admin" element={<HomeAdmin />} />
        <Route path="/beranda-user" element={<HomeUser />} />
        <Route
          path="/detail-lamaran-on-admin/:id"
          element={<DetailLamaranUseronAdmin />}
        />
        <Route
          path="/edit-lamaran/:id"
          element={<EditLamaran />}
        />
      </Routes>
    </Router>
  );
}

export default App;
