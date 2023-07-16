import Logo from "../components/Logo";
import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderSite() {
  const navigate = useNavigate();
  return (
    <>
      <DivHeader>
        <Logo />
        <Pointer>
          <BiExit
            onClick={() => {
              navigate("/");
              localStorage.removeItem("token");
            }}
          />
        </Pointer>
      </DivHeader>
      <DivHeader>
        <Link to={"/Checkout"}> Seu Carrinho </Link>
        <Link to={"/home"}> Home </Link>
        <Link to={"/Products/Sapato feminino"}> Sapatos Femininos </Link>
        <Link to={"/Products/Sapato masculino"}> Sapatos Masculinos </Link>
      </DivHeader>
    </>
  );
}

const DivHeader = styled.div`
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