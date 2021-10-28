import * as React from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { getDevices } from "../redux/actions/action";
import { refreshDevices } from "../redux/actions/action";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Autocomplete } from "@mui/material";

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

  const options = ["Fan", "Lights"];

  const [name, setName] = React.useState("");

  const [area, setArea] = React.useState("");

  const [option, setOption] = React.useState("");

  React.useEffect(() => {}, []);

  const saveDevice = async (e) => {
    e.preventDefault();

    const deviceID = uuidv4();

    const data = {
      deviceID,
      name,
      option,
      area,
    };

    axios.post("http://localhost:5000/api/device/add", data).then((res) => {
      dispatch(
        refreshDevices({
          deviceID,
          name,
          area,
          status: false,
          description: res.data,
        })
      );
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
      noValidate
      autoComplete="off"
      onSubmit={saveDevice}
      justifyContent="space-around"
      m={2}
    >
      <TextField
        required
        id="outlined-required"
        label="Name"
        placeholder="(For eg. Fan1/Fan2,Lights/Bathroom_Lights)"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Autocomplete
        id="Device-Type"
        autoComplete
        options={options}
        onChange={(e, value) => {
          setOption(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Device"
            placeholder="(Device Description)"
          >
            {/* {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))} */}
          </TextField>
        )}
      />
      <TextField
        required
        id="outlined-required"
        label="Area"
        placeholder="(For e.g. Living Room/Bathroom/Kitchen)"
        onChange={(e) => {
          setArea(e.target.value.toLowerCase());
        }}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: "#7b40f2", margin: "8px", width: "100%" }}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: "#7b40f2" }}>
        Add a Device
      </Button>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Please Enter the Device Details
            </Typography>
            <FormPropsTextFields setOpen={setOpen} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
