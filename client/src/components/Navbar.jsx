import React, { useState } from "react";

import SearchBar from "./SearchBar";
import { Stack, styled, Typography } from "@mui/material";
import { ButtonUnstyled } from "@mui/material";
import { BsGearFill, BsSearch } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

const SearchButtonRoot = styled("button")`
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  max-width: 25rem;
  margin: 0 8rem;
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  position: relative;
  background-color: #fff;
  color: rgb(62 80 96);
  font-size: 0.875rem;
  border: 1px solid rgb(224, 227, 231);
  border-radius: 10px;
  cursor: pointer;
  transition-property: all;
  transition-duration: 150ms;

  &:hover {
    background-color: rgb(243, 246, 249);
  }
`;
function SearchButton(props) {
  return <ButtonUnstyled {...props} component={SearchButtonRoot} />;
}

const iconsStyle = {
  cursor: "pointer",
  fontSize: "2rem",
  padding: "0 10px 0 10px",
};
export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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
        <SearchButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <Typography>Search</Typography>
          <BsSearch style={{ color: "#7b40f2" }} />
        </SearchButton>
        {open ? (
          <SearchBar open={open} setOpen={setOpen} handleClose={handleClose} />
        ) : null}
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
