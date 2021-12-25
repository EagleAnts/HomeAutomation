import React, { useState, useRef } from "react";
import { Backdrop, Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { showLoadingIcon } from "../redux/actions/action";

const style = {
  height: "31.25rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25rem",
  backgroundColor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  borderRadius: "1.25rem",
  padding: "1px",
};

const filterDevices = (userDevices, query) => {
  if (query) {
    return userDevices.filter((device) => {
      const deviceName = device.name.toLowerCase();
      return deviceName.includes(query);
    });
  }
};

const SearchBar = (props) => {
  const { open, setOpen, handleClose } = props;

  const formEl = useRef();

  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoadingIcon(true));
    const searchFor = formEl.current.elements[0].textContent;
    handleClose();
    history.push({ pathname: "/devices", search: `?query=${searchFor}` });
    setSearchQuery("");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const userDevices = useSelector((state) => state.UserDevices.myDevices);

  const userDevicesList = [];

  Object.keys(userDevices).forEach((el) => {
    userDevicesList.push(...userDevices[el]);
  });

  const filteredDevices = searchQuery
    ? filterDevices(userDevicesList, searchQuery.toLowerCase())
    : [];

  const deviceList = (options) => {
    const list = options.map((device) => (
      <ListItem
        className="searchDropdown__item"
        key={device.name + "-" + device.area}
      >
        <ListItemButton disableGutters>
          <ListItemText
            sx={{ textAlign: "center" }}
          >{`${device.name} | ${device.area}`}</ListItemText>
        </ListItemButton>
      </ListItem>
    ));

    return <List disablePadding>{list}</List>;
  };

  return (
    <>
      <Modal
        aria-labelledby="search-modal-title"
        aria-describedby="search-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          className: "backdrop",
          backgroundcolor: "#6f7e8c33",
        }}
      >
        <Box sx={style}>
          <form
            ref={formEl}
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div className="searchWrapper">
              <div className="searchBar">
                <input
                  id="searchQuery"
                  className="searchQueryInput"
                  value={searchQuery}
                  onInput={(e) => {
                    setSearchQuery(e.target.value);
                    setOpen(true);
                  }}
                  type="text"
                  placeholder="Search for Registered Devices"
                />
                <button
                  id="searchQuerySubmit"
                  type="submit"
                  name="searchQuerySubmit"
                >
                  <BsSearch color="purple" fontSize="1.2rem" />
                </button>
              </div>
              <div className="searchDropdown-Container">
                <div
                  onClick={(e) => {
                    formEl.current.elements[0].textContent =
                      e.target.textContent.split(" | ").join("-");
                    formEl.current.elements[1].click();
                  }}
                  className={
                    searchQuery && filteredDevices.length !== 0
                      ? "searchDropdown active"
                      : "searchDropdown"
                  }
                >
                  {searchQuery ? deviceList(filteredDevices) : null}
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SearchBar;
