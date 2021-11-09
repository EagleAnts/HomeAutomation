import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const CustomButton = styled(Button)(`
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
  background-color: #6b3fc3;
  }

  & > svg{
    pointer-events:none;
  }
`);
