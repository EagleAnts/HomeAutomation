import React, { useState } from "react";
import "./dropdown.css";
import { showDropdown } from "../redux/actions/action";
import { connect } from "react-redux";

const options = ["ON", "OFF"];

const Dropdown = (props) => {
  // const { isOpen, showDropdown } = props;
  const [isOpen, setOpen] = useState(false);
  const [haveText, sethaveText] = useState("");

  const handleClick = () => {
    setOpen(!isOpen);
    // showDropdown(!isOpen);
  };

  const handleText = (ev) => {
    sethaveText(ev.currentTarget.textContent);
  };

  const itemList = (options) => {
    const list = options.map((item) => (
      <div
        onClick={handleText}
        className="dropdown__item"
        key={item.toString()}
      >
        {item}
      </div>
    ));

    return <div className="dropdown__items"> {list} </div>;
  };

  return (
    <div
      className={isOpen ? "dropdown active" : "dropdown"}
      onClick={handleClick}
    >
      <div className="dropdown__text">
        {!haveText ? `Select ${props.description}` : haveText}
      </div>
      {itemList(props.options)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.ShowDropdown.isOpen,
});

export default connect(mapStateToProps, { showDropdown })(Dropdown);
