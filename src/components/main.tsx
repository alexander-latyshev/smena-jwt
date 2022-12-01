import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import About from "./auth/about";
import Login from "./auth/login";
import Register from "./auth/register";

type Props = {};

const Main = (props: Props) => {
  const pathname: string = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") navigate("/register");
    console.log(1);
  }, [pathname]);

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
