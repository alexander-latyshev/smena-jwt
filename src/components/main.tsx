import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import About from "./auth/about";
import Login from "./auth/login";
import Register from "./auth/register";

type Props = {};

const Main = (props: Props) => {
  return (
    <div className="main" style={{ padding: "auto" }}>
      <Routes>
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<About />} path="/about" />
      </Routes>
    </div>
  );
};

export default Main;
