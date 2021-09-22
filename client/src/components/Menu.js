import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// Icons
import { HiHome } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

export const Menu = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <nav className="menu">
      <NavLink to="/" onClick={() => handleOnClick(0)}>
        <HiHome className={`menu_items ${activeIndex === 0 ? "active" : ""}`} />
      </NavLink>
      <NavLink to="/dashboard" onClick={() => handleOnClick(1)}>
        <MdDashboard
          className={`menu_items ${activeIndex === 1 ? "active" : ""}`}
        />
      </NavLink>
      <NavLink to="/logout" onClick={() => handleOnClick(2)}>
        <IoExitOutline
          className={`menu_items ${activeIndex === 2 ? "active" : ""}`}
        />
      </NavLink>
    </nav>
  );
};
