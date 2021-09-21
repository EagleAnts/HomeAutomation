import React from "react";
import { HiHome } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

export const Menu = () => {
  return (
    <nav className="menu">
      <a href="">
        <HiHome className="menu_items menu_items-active" />
      </a>
      <a href="">
        <MdDashboard className="menu_items" />
      </a>
      <a href="">
        <IoExitOutline className="menu_items" />
      </a>
    </nav>
  );
};
