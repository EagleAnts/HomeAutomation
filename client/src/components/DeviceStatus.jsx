import React from "react";
import { connect } from "react-redux";
import { Card } from "@mui/material";
import dial from "../assets/dial.png";
import CircularSlider from "@fseehawer/react-circular-slider";
import { IoLocationOutline } from "react-icons/io5";
import { TiPlus, TiMinus } from "react-icons/ti";

import { CustomButton } from "./CustomButton";
import Dropdown from "./Dropdown";

const dataArray = [];
for (let i = 0; i <= 100; i += 5) dataArray.push(`${i}`);

const DeviceStatus = (props) => {
  const options = ["ON", "OFF"];

  return (
    <>
      <Card
        className="selectDisable"
        elevation={3}
        sx={{
          display: "flex",
          position: "relative",
          flexFlow: "column wrap",
          alignItems: "center",
          p: 2,
          borderRadius: "1.25rem",
          bgcolor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          Currently Selected Device is : {props.activeDevice}
          <Dropdown
            id="deviceDropdown"
            options={options}
            description="Status"
          />
        </div>
        <div id="status-indicator">
          <CustomButton>
            <TiMinus />
          </CustomButton>

          <div id="Slider">
            <CircularSlider
              label="Temperature"
              width={250}
              min={0}
              max={100}
              data={dataArray}
              knobSize={50}
              knobColor="transparent"
              progressLineCap="round"
              appendToValue="℃"
              labelFontSize="1.2rem"
              valueFontSize="1.5rem"
              progressColorFrom="#8F63DF"
              progressColorTo="#EB9471"
            >
              <IoLocationOutline id="Slider-icon" fontSize="45px" />
            </CircularSlider>
          </div>
          <img
            src={dial}
            alt="jpg"
            style={{
              m: 2,
              width: "420px",
            }}
          />
          <div id="circle">
            <div id="small-circle"></div>
          </div>
          <CustomButton>
            <TiPlus />
          </CustomButton>
        </div>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  activeDevice: state.SelectedDevice.activeDevice,
});
export default connect(mapStateToProps)(DeviceStatus);
