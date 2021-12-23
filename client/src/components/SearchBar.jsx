import React, { useState, useEffect } from "react";
import { Backdrop, Modal, styled, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ButtonUnstyled, buttonUnstyledClasses } from "@mui/material";
import { BsSearch } from "react-icons/bs";

const SearchButtonRoot = styled("button")`
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  max-width: 25rem;
  margin: 0 11rem;
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
  height: "80%",
  overflowY: "hidden",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  borderRadius: "1.25rem",
  padding: 1,
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
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    const [name, area] = searchQuery.split(" | ");
    history.push(`?s=${name}-${area.toLowerCase()}`);
  };
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const userDevices = useSelector((state) => state.UserDevices.myDevices);

  const filteredDevices = filterDevices(userDevices, searchQuery.toLowerCase());

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const deviceList = (options) => {
    const list = options.map((device) => (
      <div
        className="searchDropdown__item"
        key={device.name + "-" + device.area}
      >
        {`${device.name} | ${device.area}`}
      </div>
    ));

    return <div className="searchDropdown__items">{list}</div>;
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
          backgroundColor: "#6f7e8c33",
        }}
      >
        <Box sx={style}>
          <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
            <div className="searchWrapper">
              <div className="searchBar">
                <input
                  id="searchQuery"
                  className={
                    searchQuery && filteredDevices.length !== 0
                      ? "searchQueryInput active"
                      : "searchQueryInput"
                  }
                  value={searchQuery}
                  onInput={(e) => {
                    setSearchQuery(e.target.value);
                    setOpen(true);
                  }}
                  type="text"
                  name="s"
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
                <section>
                  <div
                    onClick={(e) => {
                      setSearchQuery(e.target.innerText);
                      setOpen(false);
                      //   document.getElementById("searchQuerySubmit").click();
                    }}
                    className={
                      searchQuery && filteredDevices.length !== 0
                        ? "searchDropdown active"
                        : "searchDropdown"
                    }
                  >
                    {searchQuery ? deviceList(filteredDevices) : null}
                  </div>
                </section>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SearchBar;
