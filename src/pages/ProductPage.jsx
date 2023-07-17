import axios from "axios";
import HeaderSite from "../components/Headers";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

export default function ProductPage() {
  /* Ferramentas da Página */
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const User = useContext(UserContext).UserData;
  const setUser = useContext(UserContext).SetUserData;
  let [Produto, SetProduto] = useState(null);
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

    let promisse2 = axios.get(`${url}/products/${params.IdProduct}`, chave);
    promisse2.then((resposta) => {
      console.log(resposta.data);
      SetProduto(resposta.data);
    });
  }, []);

  function AdicionarProduto(Id){
    let tokenSessao = localStorage.getItem("token");

    let promisse = axios.post(`${url}/cart/${Id}`, User.email, {
        headers: {
          Authorization: `Bearer ${tokenSessao}`,
        },
      });
    promisse.then(resposta => {
        alert("Item adicionado ao seu carrinho, voltando à Página principal.")
        navigate("/home")
    });
    promisse.catch(resposta => {console.log(resposta)});
  }

  if (!User || !Produto) {
    return (
      <HomeContainer>
        <HeaderSite />
        <Loading>{<ThreeDots width={"150px"} color="#FFFFFF" />}</Loading>
      </HomeContainer>
    );
  }

  if (User && Produto) {
    return (
      <HomeContainer>
        <HeaderSite />
        <ProductSpace>
          <img src={Produto.foto} />
          <ProductData>
            <span> {Produto.name} </span>
            <span> Preço: {Produto.price} R$ </span>
            <span> Gostaria de adicionar ao seu Carrinho? </span>
            <button onClick={() => AdicionarProduto(params.IdProduct)} >Adicionar ao carrinho</button>
          </ProductData>
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
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;

  padding: 6px;
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  img {
    width: 60%;
    border-radius: 20px;
  }
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
const ProductData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  span {
    color: white;
    font-size: 20px;
    font-weight: 600;
  }
`;
