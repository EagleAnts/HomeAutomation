import React, { useState } from "react";

import SearchBar from "./SearchBar";
import { Stack } from "@mui/material";
import { BsGearFill } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

export const Navbar = () => {
  const iconsStyle = {
    cursor: "pointer",
    fontSize: "2rem",
    padding: "0 10px 0 10px",
  };

  return (
    <div className="Navbar">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        xs={6}
        sm={5}
        md={5}
      >
        <SearchBar />
        <Stack
          m="0 2rem"
          xs={6}
          sm={7}
          md={5}
          spacing={3}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <BsGearFill style={iconsStyle} />
          <IoNotificationsOutline style={iconsStyle} />
          <RiAccountCircleFill style={iconsStyle} />
        </Stack>
      </Stack>
    </div>
  );
};
