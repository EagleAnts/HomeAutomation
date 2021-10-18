import React, { useState } from "react";
import { connect } from "react-redux";
import { Card } from "@mui/material";
import dial from "../assets/dial.png";
import CircularSlider from "@fseehawer/react-circular-slider";
import { IoAtOutline, IoLocationOutline } from "react-icons/io5";
import { TiPlus, TiMinus } from "react-icons/ti";

import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";
import Dropdown from "./Dropdown";
import { showDropdown } from "../redux/actions/action";

const CustomButtonRoot = styled("span")(`
  background-color: #7b40f2;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;


  &:hover {
// background-color: #dasda;
  }

  &.${buttonUnstyledClasses.active} {
    box-shadow: inset 0 0 5px 5px #4e4e4e78;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }

  & > svg{
    pointer-events:none;
  }
`);

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}
const dataArray = [];
for (let i = 0; i <= 100; i += 5) dataArray.push(`${i}`);

const DeviceStatus = (props) => {
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
        onClick={(e) => {
          let el = document.querySelector(".dropdown");
          if (e.target !== el && el.className.includes("active")) {
            props.showDropdown(!props.isOpen);
          }
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
          <Dropdown />
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
  isOpen: state.ShowDropdown.isOpen,
});

export default connect(mapStateToProps, { showDropdown })(DeviceStatus);
