import Pages from "../src/pages/Pages";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/reducers/authReducer";
import AppRoutes from "./components/AppRoutes/index";
import Footer from "./components/Footer";




function App() {
  // const user = useSelector((store) => store.authReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(checkAuth());
    }
  }, [token]);
  return (
    <div className="App">
       <Pages />
       <Footer/>  
    </div>
  );
}
export default App;
