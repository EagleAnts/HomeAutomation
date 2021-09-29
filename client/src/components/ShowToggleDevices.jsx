import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDevices } from "../redux/actions/toggleAction";
import ToggleDevices from "./ToggleDevices";

const ShowToggleDevices = (props) => {
  useEffect(() => {
    props.getDevices();
  }, [props]);

  const toggleList = [];
  props.items.forEach((el) => {
    const { id, name } = el;
    toggleList.push(
      <div>
        <ToggleDevices key={id} id={id} value={name} />
      </div>
    );
  });

  return <>{toggleList}</>;
};

const mapStateToProps = (state) => ({
  items: state.currentRoomDevices.items,
});

export default connect(mapStateToProps, { getDevices })(ShowToggleDevices);
