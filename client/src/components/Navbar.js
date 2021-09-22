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
      <Grid container direction="row" alignItems="center" sx={{ pl: "10%" }}>
        <Grid item xs={12} sm={5} md={6}>
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
          xs={4}
          sm={7}
          md={6}
          justifyContent="flex-end"
          alignContent="center"
        >
          <BsGearFill style={iconsStyle} />
          <IoNotificationsOutline style={iconsStyle} />
          <RiAccountCircleFill style={iconsStyle} />
        </Grid>
      </Grid>
    </div>
  );
};
