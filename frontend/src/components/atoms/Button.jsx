import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  ${({ customType }) =>
    customType === "local" &&
    `
    background-color: #1976D2;
    color: white;

  `}
  ${({ customType }) =>
    customType === "social" &&
    `
    background-color: white;
    color: black;

  `}
`;

// social customType
// local customType

const MUIButton = ({ children, customType }) => {
  return (
    <StyledButton customType={customType} variant="contained">
      {children}
    </StyledButton>
  );
};

export default MUIButton;
