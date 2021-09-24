import { Device } from "./Device";
import React from "react";
import { CgBolt } from "react-icons/cg";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaFan } from "react-icons/fa";
function Devices() {
  return (
    <>
      <Device name="Air Conditioner" icon={<FaFan />} />
      <Device name="Refrigerator" icon={<CgSmartHomeRefrigerator />} />
      <Device name="Temperature" icon={<CgBolt />} />
      <Device name="Lights" icon={<HiOutlineLightBulb />} />
    </>
  );
}

export default Devices;
