import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.width};
`;

const MUIButton = ({ children, bgColor, width }) => {
  return (
    <StyledButton width={width} bgColor={bgColor} variant="contained">
      {children}
    </StyledButton>
  );
};

export default MUIButton;
