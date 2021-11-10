import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      whileTap={{ scale: 0.9 }}
      ref={props.dropDownRef}
      id={props.id}
      className={props.isActive ? "dropdown active " : "dropdown "}
      onClick={props.onClick}
    >
      <div className="dropdown__text">{props.haveText}</div>
      {itemList(props.options)}
    </motion.div>
  );
};

export default Dropdown;
