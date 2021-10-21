import React, { useState, useRef } from "react";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import "./dropdown.css";

const Dropdown = (props) => {
  const dropDownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropDownRef, false);
  const [haveText, sethaveText] = useState(`Select ${props.description}`);

  const handleClick = () => {
    setIsActive(!isActive);
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
      ref={dropDownRef}
      id={props.id}
      className={
        isActive ? "dropdown active selectDisable" : "dropdown selectDisable"
      }
      onClick={handleClick}
    >
      <div className="dropdown__text">{haveText}</div>
      {itemList(props.options)}
    </div>
  );
};

export default Dropdown;
