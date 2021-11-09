import React from "react";

import "./dropdown.css";

const Dropdown = (props) => {
  const itemList = (options) => {
    const list = options.map((item) => (
      <div
        onClick={props.handleText}
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
      ref={props.dropDownRef}
      id={props.id}
      className={props.isActive ? "dropdown active " : "dropdown "}
      onClick={props.onClick}
    >
      <div className="dropdown__text">{props.haveText}</div>
      {itemList(props.options)}
    </div>
  );
};

export default Dropdown;
