import React, { useState } from "react";
import Gallery from "./Gallery";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { SearchOutlined } from "@mui/icons-material";
import { mobile } from "./responsive";

const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";

const Container = styled.div`
  background-color: #000000;
  height: 100vh; /* 100% of the viewport height */
  overflow-y: auto; /* Enable vertical scrolling if needed */
  width: 100%; /* 100% of the parent's width */
  position: sticky;
  top: 0;
  color: gray;
`;

const Navbar = styled.h1`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 40px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ fontSize: "40px", padding: "10px" })}
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;

const SearchBox = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #2f3640;
  border-radius: 50px;
  position: relative;
  ${mobile({ width: "80%" })}
`;

const Form = styled.form``;

const SearchButton = styled.button`
  color: white;
  position: absolute;
  right: 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(
    --gradient-2,
    linear-gradient(90deg, #2af598 0%, #009efd 100%)
  );
  border: 0;
  display: inline-block;
  margin: 10px 0px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);

  /* hover effect */
  &:hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.5) 0 10px 20px;
    transform: translateY(-3px);
  }

  /* button pressing effect */
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  width: 50;
  outline: none;
  color: white;
  font-size: 20px;
  padding: 24px 46px 24px 26px;

  cursor: pointer;
  ${mobile({ width: "50%" })}
`;

const Main = styled.div`
  height: 100vh;
`;
const slideAnimation = keyframes`
  0%, 100% {
    bottom: -35px;
  }

  25%, 75% {
    bottom: -2px;
  }

  20%, 80% {
    bottom: 2px;
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(-15deg);
  }

  25%, 75% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(25deg);
  }
`;

const LoaderContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  background: #db9595;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 500px;
  margin-top: 70px;

  ${mobile({ margin: "80px 40px 0px 120px" })}
`;

const LoaderBefore = styled.div`
  content: "";
  position: absolute;

  width: 40px;
  height: 40px;
  transform: rotate(45deg) translate(30%, 40%);
  background: blue;
  box-shadow: 32px -34px 0 5px #ff3d00;
  animation: ${slideAnimation} 2s infinite ease-in-out alternate;
`;

const LoaderAfter = styled.div`
  content: "";
  position: absolute;
  left: 10px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ff3d00;
  transform: rotate(0deg);
  transform-origin: 35px 145px;
  animation: ${rotateAnimation} 2s infinite ease-in-out;
`;

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => setData(response.data.photos.photo));
  };
  return (
    <Container>
      <Navbar>Picture Gallery</Navbar>
      <Middle>
        <SearchBox>
          <Form onSubmit={submitHandler}>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchButton type="submit" name="search">
              <SearchOutlined />
            </SearchButton>
          </Form>
        </SearchBox>
      </Middle>

      <Main>
        {data.length >= 1 ? (
          <Gallery data={data} />
        ) : (
          <LoaderContainer>
            <LoaderBefore />
            <LoaderAfter />
          </LoaderContainer>
        )}
      </Main>
    </Container>
  );
};

export default App;
