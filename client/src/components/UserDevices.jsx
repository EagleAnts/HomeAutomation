import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDevices } from "../redux/actions/toggleAction";
import { Device } from "./Device";

const UserDevices = (props) => {
  useEffect(() => {
    props.getDevices();
  }, [props]);

  const myDevices = [];
  props.items.forEach((el) => {
    const { id, name } = el;
    myDevices.push(<Device key={id} id={name} />);
  });

  return <>{myDevices}</>;
};

const mapStateToProps = (state) => ({
  items: state.currentRoomDevices.items,
});

export default connect(mapStateToProps, { getDevices })(UserDevices);
