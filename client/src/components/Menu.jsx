import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// Icons
import { HiHome } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

export const Menu = (props) => {
  return (
    <nav className={props.title}>
      <NavLink exact to="/" activeClassName="activeLink">
        <HiHome className="menu_items" />
      </NavLink>
      <NavLink to="/dashboard" activeClassName="activeLink">
        <MdDashboard className="menu_items" />
      </NavLink>
      <NavLink to="/logout" activeClassName="activeLink">
        <IoExitOutline className="menu_items" />
      </NavLink>
    </nav>
  );
};
