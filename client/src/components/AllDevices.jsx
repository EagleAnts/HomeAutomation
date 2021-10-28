import React from "react";
import { Grid } from "@mui/material";
import Modal from "./TransitionModal";
import Carousel from "./DeviceCarousel";

import { useSelector } from "react-redux";

const BuildCarousel = (props) => {
  const areaList = [];

  for (const area in props.area) {
    areaList.push(
      <Carousel key={area} area={area} devices={props.area[area]} />
    );
  }

  return areaList;
};

export const AllDevices = () => {
  const devices = useSelector((state) => state.GetUserDevices.myDevices);

  const area = {};

  devices.map((el) => {
    if (!area[el.area]) area[el.area] = [];
    area[el.area].push(el);
  });

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Modal />
        <BuildCarousel area={area} />
      </Grid>
    </>
  );
};
