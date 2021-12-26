import * as React from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { BsFillPatchPlusFill } from "react-icons/bs";
// import { Popper } from "@mui/material";
import { styled } from "@mui/system";

import {
  addDevice,
  refreshDevices,
  refreshDeviceStatus,
  showLoadingIcon,
} from "../redux/actions/action";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Autocomplete } from "@mui/material";

//Devices List
import { devicesList } from "../optionsList/devicesList";
import encryptedPost from "../encryptedPost";

//Encryption
import encryptData from "../cryptoFunctions/encrypt";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7b40f2",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#7b40f2",
    },
  },
});

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#6b3fc3",
  },
});

const style = {
  height: "400px",
  overflowY: "hidden",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  borderRadius: "1.25rem",
  p: 4,
};

const FormPropsTextFields = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");

  const [area, setArea] = React.useState("");

  const [option, setOption] = React.useState("");

  React.useEffect(() => {}, []);

  const saveDevice = async (e) => {
    e.preventDefault();

    const deviceID = uuidv4();

    const data = await encryptData({
      deviceID,
      name,
      option,
      area,
    });

    encryptedPost(data, "api/device/add", true).then((res) => {
      dispatch(showLoadingIcon(true));
      dispatch(
        addDevice({
          deviceID,
          name,
          area,
          status: false,
          description: res,
        })
      );
      dispatch(refreshDeviceStatus({ id: deviceID, active: false }));
      dispatch(showLoadingIcon(false));
    });

    props.setOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      sx={{
        height: "80%",
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      autoComplete="off"
      onSubmit={saveDevice}
      justifyContent="space-around"
      m={2}
    >
      <CustomTextField
        required
        id="outlined-required"
        label="Name"
        placeholder="(Give any name to device)"
        onChange={(e) => {
          setName(e.target.value.trim());
        }}
      />

      <Autocomplete
        id="Device-Type"
        autoComplete
        options={devicesList}
        onChange={(e, value) => {
          setOption(value);
        }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            required
            label="Select Device"
            placeholder="(Device Description)"
          >
            {/* {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))} */}
          </CustomTextField>
        )}
      />
      <CustomTextField
        required
        id="outlined-required"
        label="Area"
        placeholder="(For e.g. Living Room | Bathroom | Kitchen)"
        onChange={(e) => {
          setArea(e.target.value.toLowerCase().trim());
        }}
      />

      <CustomButton
        variant="contained"
        sx={{ backgroundColor: "#7b40f2", margin: "8px", width: "100%" }}
        type="submit"
      >
        Submit
      </CustomButton>
    </Box>
  );
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          color: "#7b40f2",
          marginLeft: "auto",
        }}
      >
        <Typography mr={2} fontSize="1.25rem">
          Add a Device
        </Typography>
        <BsFillPatchPlusFill fontSize="2rem" />
      </Button>
      {open ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Please Enter the Device Details
              </Typography>
              <FormPropsTextFields setOpen={setOpen} />
            </Box>
          </Fade>
        </Modal>
      ) : null}
    </div>
  );
}
