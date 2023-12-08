import React from "react";

import styled from "styled-components";
import { mobile } from "./responsive";

const Container = styled.div`
  width: 100%;
  height: 550%;
  background-color: black;
  ${mobile({ margin: "40px 20px 10px -50px", position: "sticky" })}
`;
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 70px;
  justify-content: space-around;
`;
const Image = styled.img`
  height: 400px;
  width: 500px;
  padding: 10px;
  ${mobile({ position: "sticky", height: "200px", width: "300px" })}
`;

const Gallery = ({ data }) => {
  return (
    <Container>
      <ImageContainer>
        {data.map((image) => (
          <Image
            key={image.id}
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
            alt="images"
          />
        ))}
      </ImageContainer>
    </Container>
  );
};

export default Gallery;
