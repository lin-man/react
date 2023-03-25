import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "antd";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import User from "./pages/user/User";
import Role from "./pages/role/Role";
import Line from "./pages/charts/Line";
import Pie from "./pages/charts/Pie";
import Bar from "./pages/charts/Bar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Admin />}>
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/user" element={<User />} />
          <Route path="/role" element={<Role />} />
          <Route path="/charts/line" element={<Line />} />
          <Route path="/charts/pie" element={<Pie />} />
          <Route path="/charts/bar" element={<Bar />} />
          <Route path="/" element={<Navigate to="/home"></Navigate>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
