import React from "react";

import { Grid } from "@mui/material";

import { BsSearch } from "react-icons/bs";
import { BsGearFill } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

export const Navbar = () => {
  const iconsStyle = {
    fontSize: "1.5rem",
    padding: "1rem",
  };

  return (
    <div className="Navbar">
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={6}>
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
          xs={5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <BsGearFill style={iconsStyle} />
          <IoNotificationsOutline style={iconsStyle} />
          <RiAccountCircleFill style={iconsStyle} />
        </Grid>
      </Grid>
    </div>
  );
};
