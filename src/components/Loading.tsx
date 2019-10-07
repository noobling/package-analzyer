import React from "react";
import styled from "styled-components";
import { ReactComponent as LoadingSvg } from "../loading.svg";
import ReactFloaterJS from "react-floaterjs";

const StyledLoading = styled(LoadingSvg)`
  max-width: 400px;
  max-height: 400px;
`;

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <ReactFloaterJS>
        <StyledLoading />
      </ReactFloaterJS>
    </Container>
  );
};

export default Loading;
