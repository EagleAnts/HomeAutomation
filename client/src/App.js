import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Menu } from "./components/Menu";

export default function App() {
  return (
    <>
      <Menu />
      <Navbar />
    </>
  );
}
