import React from "react";
import background from "../assets/login.jpg";
import styled from "styled-components";
export default function BackgrounImage() {
return(
  <Container>
    <img src={background} alt="background" />
  </Container>
);
}
const Container = styled.div`
height: 100 vh;
width: 100 vw;
img{
  height:100vh;
  width:100vw;
}
`;