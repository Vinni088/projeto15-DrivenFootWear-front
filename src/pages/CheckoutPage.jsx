import axios from "axios";
import styled from "styled-components";
import Logo from "../components/Logo";
import { BiExit } from "react-icons/bi";
import { UserContext } from "/src/App.jsx";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <Header>
        <Logo/>
        <Pointer>
            <BiExit
              onClick={() => {
                navigate("/");
                localStorage.removeItem("token")
              }}
            />
          </Pointer>
      </Header>
      <Header>
        <Link to={"/Checkout"}> Seu Carrinho </Link>
        <Link to={"/home"}> Home </Link>
        <Link to={"/Products/Sapato feminino"}> Sapatos Femininos </Link>
        <Link to={"/Products/Sapato masculino"}> Sapatos Masculinos </Link>
      </Header>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100%;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  a {
    width: 170px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding-top: unset;
    :hover {
      border: 2px solid white;
    }
  }
`;
const Pointer = styled.div`
  cursor: pointer;
`;
