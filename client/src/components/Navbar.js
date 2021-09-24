import React from "react";

import { Grid } from "@mui/material";

import { BsSearch } from "react-icons/bs";
import { BsGearFill } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

export const Navbar = () => {
  const iconsStyle = {
    cursor: "pointer",
    fontSize: "1.5rem",
    padding: "0 10px 0 10px",
  };

  return (
    <div className="Navbar">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={5} md={5}>
          <div className="searchWrapper">
            <div className="searchBar">
              <input id="searchQueryInput" type="text" placeholder="Search" />
              <button
                id="searchQuerySubmit"
                type="submit"
                name="searchQuerySubmit"
              >
                <BsSearch color="purple" />
              </button>
            </div>
          </div>
        </Grid>

        <Grid
          container
          item
          xs={6}
          sm={7}
          md={5}
          justifyContent="flex-end"
          alignItems="center"
        >
          <BsGearFill style={iconsStyle} />
          <IoNotificationsOutline style={iconsStyle} />
          <RiAccountCircleFill style={iconsStyle} />
        </Grid>
      </Grid>
    </div>
  );
};
