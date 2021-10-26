import React from "react";
import { NavLink } from "react-router-dom";

// Icons
import { MdDashboard, MdDevicesOther } from "react-icons/md";

export const Menu = (props) => {
  return (
    <nav className={props.title}>
      <NavLink to="/dashboard" activeClassName="activeLink">
        <MdDashboard className="menu_items" />
      </NavLink>
      <NavLink to="/devices" activeClassName="activeLink">
        <MdDevicesOther className="menu_items" />
      </NavLink>
    </nav>
  );
};
