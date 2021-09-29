import React from "react";
import { CgSmartHomeRefrigerator } from "react-icons/cg";

const ToggleDevices = (props) => {
  return (
    <>
      <input
        type="radio"
        name="buttonGroup"
        id={props.id}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>
        <CgSmartHomeRefrigerator fontSize="50px" />
        {props.value}
      </label>
    </>
  );
};

export default ToggleDevices;
