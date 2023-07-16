import axios from "axios";
import HeaderSite from "../components/Headers";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

export default function ProductPage() {
  /* Ferramentas da Página */
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const User = useContext(UserContext).UserData;
  const setUser = useContext(UserContext).SetUserData;
  const params = useParams();

  /* Dados externos iniciais: */
  useEffect(() => {
    let tokenSessao = localStorage.getItem("token");
    if (!tokenSessao) {
      return navigate("/");
    }

    const chave = { headers: { Authorization: `Bearer ${tokenSessao}` } };
    let promisse1 = axios.get(`${url}/usuario-logado`, chave);
    promisse1.then((resposta) => {
      setUser({
        name: resposta.data.name,
        email: resposta.data.email,
        tokenSessao,
      });
    });

    /*let promisse2 = axios.get(`${url}/products`, chave);
    promisse2.then((resposta) => SetProdutos(resposta.data));*/
  }, []);

  if (!User) {
    return (
      <HomeContainer>
        <HeaderSite />
        <Loading>{<ThreeDots width={"150px"} color="#FFFFFF" />}</Loading>
      </HomeContainer>
    );
  }

  if (User) {
    return (
      <HomeContainer>
        <HeaderSite />
        <ProductSpace>
            Produto de id {params.IdProduct}
        </ProductSpace>
      </HomeContainer>
    );
  }
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100%;
`;
const Loading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductSpace = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;

  padding: 6px;
  width: 100%;
  height: 100%;

  overflow-y: scroll;
`;
const ProductBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  border: white 2px solid;
  text-align: center;
  :hover {
    border: gray 2px solid;
    cursor: pointer;
  }
  img {
    height: 100px;
  }
`;
