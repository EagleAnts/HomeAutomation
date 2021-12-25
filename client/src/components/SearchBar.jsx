import React, { useState, useRef } from "react";
import { Backdrop, Modal, styled, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ButtonUnstyled } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { showLoadingIcon } from "../redux/actions/action";

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
function SearchButton(props) {
  return <ButtonUnstyled {...props} component={SearchButtonRoot} />;
}

const filterDevices = (userDevices, query) => {
  if (query) {
    return userDevices.filter((device) => {
      const deviceName = device.name.toLowerCase();
      return deviceName.includes(query);
    });
  }
};

const SearchBar = () => {
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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
      <SearchButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <Typography>Search</Typography>
        <BsSearch style={{ color: "#7b40f2" }} />
      </SearchButton>

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
