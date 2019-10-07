import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import React from "react";

const StyledAppBar = styled(AppBar)`
  margin-bottom: 4rem;
`;

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6">Package Analyzer</Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
