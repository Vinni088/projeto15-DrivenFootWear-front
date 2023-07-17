import axios from "axios";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import HeaderSite from "../components/Headers";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function HomePage() {
  /* Ferramentas da Página */
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const User = useContext(UserContext).UserData;
  const setUser = useContext(UserContext).SetUserData;
  let [Produtos, SetProdutos] = useState([]);
  let params = useParams();

  /* Dados externos iniciais: */
  useEffect(() => {
    let tokenSessao = localStorage.getItem("token");
    if (!tokenSessao) {
      return navigate("/");
    }
    SetProdutos([])
    const chave = { headers: { Authorization: `Bearer ${tokenSessao}` } };
    let promisse1 = axios.get(`${url}/usuario-logado`, chave);
    promisse1.then((resposta) => {
      setUser({
        name: resposta.data.name,
        email: resposta.data.email,
        tokenSessao,
      });
    });

    let promisse2 = axios.get(`${url}/products`, chave);
    promisse2.then((resposta) => {
      let array = resposta.data;
      let array_filtered = array.filter(produto => produto.type === params.ProductType);
      SetProdutos(array_filtered);
    });
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
          {Produtos.map((produto) => {
            return (
              <ProductBox
                key={produto._id}
                onClick={() => navigate(`/Products/add/${produto._id}`)}
              >
                <img src={produto.foto} />
                <span> {produto.name} </span>
              </ProductBox>
            );
          })}
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

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: lightgray;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: gray;
  }
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
  background-color: white;
  :hover {
    border: gray 2px solid;
    cursor: pointer;
  }
  img {
    height: 100px;
    border-radius: 15px;
  }
`;
