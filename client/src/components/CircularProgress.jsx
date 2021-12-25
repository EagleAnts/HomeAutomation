import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TiPlus, TiMinus } from "react-icons/ti";
import { CustomButton } from "./CustomButton";
import { CircularProgress, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import dial from "../assets/dial.png";
import { changeDeviceValue } from "../redux/actions/action";

import { useDispatch } from "react-redux";

const CustomCircularProgress = styled(CircularProgress)(() => ({
  "& .MuiCircularProgress-circleDeterminate": {
    strokeLinecap: "round",
    transition: "stroke-dashoffset 500ms cubic-bezier(0,.12,.48,1)",
  },
}));

export const CircularProgressComponent = (props) => {
  const dispatch = useDispatch();

  const [deviceValue] = useSelector((state) =>
    state.DeviceStatus.filter((el) => el.id === props.deviceID).map(
      (el) => el.value || 0
    )
  );
  const [value, setValue] = useState(deviceValue);

  // React.useEffect(() => {
  //   setValue(deviceValue);
  // }, []);

  return (
    <>
      <CustomButton
        onClick={() => {
          const newValue = value - props.incrementBy;
          if (value !== 0) {
            setValue(newValue);
            const data = { deviceID: props.deviceID, newValue };
            dispatch(changeDeviceValue(data));
          }
        }}
      >
        <TiMinus />
      </CustomButton>
      <img
        src={dial}
        alt="dial-icon"
        style={{
          position: "absolute",
          height: "21.875rem",
          width: "21.875rem",
        }}
      />
      <Box>
        <Box
          sx={{
            position: "absolute",
            height: "18.75rem",
            width: "18.75rem",
          }}
        >
          <Box
            sx={{
              top: "3rem",
              left: "3rem",
              width: "12.5rem",
              height: "12.5rem",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography fontSize="1.5rem"> {props.label} </Typography>
            <Typography fontSize="2rem">{value}</Typography>
          </Box>

          <CustomCircularProgress
            variant="determinate"
            value={100}
            size="18.75rem"
            thickness={2}
            sx={{
              color: "#ccc",
            }}
          />
        </Box>

        <CustomCircularProgress
          variant="determinate"
          value={value}
          size="18.75rem"
          thickness={2}
          sx={{ color: "#7b40f2" }}
        />
      </Box>
      <CustomButton
        onClick={() => {
          const newValue = value + props.incrementBy;

          if (value !== 100) {
            setValue(newValue);
            const data = { deviceID: props.deviceID, newValue };
            dispatch(changeDeviceValue(data));
          }
        }}
      >
        <TiPlus />
      </CustomButton>
    </>
  );
};
