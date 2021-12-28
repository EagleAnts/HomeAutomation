import React, { useState, useContext, useEffect } from "react";

import SearchBar from "./SearchBar";
import { Button, Stack, styled, Typography } from "@mui/material";
import { ButtonUnstyled, buttonUnstyledClasses } from "@mui/material";
import { BsGearFill, BsSearch } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineBulb } from "react-icons/ai";
import { HiOutlineLightBulb } from "react-icons/hi";
import { SocketContext } from "../context/socket";

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

const ConnectButtonRoot = styled("button")`
  display: flex;
  justify-content: space-between;
  alignitems: center;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: #7b40f2;
  padding: 15px;
  border-radius: 1rem;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #6744ae;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #6744ae;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function ConnectButton(props) {
  return <ButtonUnstyled {...props} component={ConnectButtonRoot} />;
}

const iconsStyle = {
  cursor: "pointer",
  fontSize: "2rem",
  padding: "0 10px 0 10px",
};
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const socket = useContext(SocketContext);
  const [socketConnected, setSocketConnected] = useState(socket.connected);

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

        <ConnectButton
          onClick={() => {
            if (socketConnected) {
              socket.disconnect();
              setSocketConnected(false);
            } else {
              socket.connect();
              setSocketConnected(true);
            }
          }}
        >
          <Typography sx={{ pointerEvents: "none" }}>
            {socketConnected ? "Disconnect" : "Connect"}
          </Typography>
          {socketConnected ? (
            <HiOutlineLightBulb pointerEvents="none" size={20} />
          ) : (
            <AiOutlineBulb pointerEvents="none" size={20} />
          )}
        </ConnectButton>
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
