import Switch from "@mui/material/Switch";
import { styled } from "@mui/system";
import { amber } from "@mui/material/colors";

export const AmberSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: amber[700],
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "slategrey",
  },
}));
