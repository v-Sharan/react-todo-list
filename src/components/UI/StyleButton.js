import { Button } from "@mui/material";
import { styled } from "@mui/styles";

export const StyleButton = styled(Button)({
  background: "#6395f2",
  border: 0,
  borderRadius: 14,
  color: "white",
  boxShadow: "0 3px 5px 2px #d1a2f",
  height: 48,
  "&:hover": {
    background: "#397dfa",
    color: "#d2d6d6",
  },
  "&:disabled": {
    background: "#7d7c79",
    color: "#c4c3c0",
    cursor: "not-allowed",
  },
});
