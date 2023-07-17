import axios from "axios";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import { useNavigate } from "react-router-dom";
import HeaderSite from "../components/Headers";
import LoadingGifDiv from "../components/Loading";
import { useContext, useState, useEffect } from "react";

export default function HomePage() {
  /* Ferramentas da Página */
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const User = useContext(UserContext).UserData;
  const setUser = useContext(UserContext).SetUserData;
  let [carrinho, setCarrinho] = useState([]);
  let [conta, setConta] = useState(0);

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

    let lista = [];
    
    let promisse2 = axios.get(`${url}/cart`, chave);
    promisse2.then((res) => {
      let lista_prov = res.data.itens;
      for (let i = 0; i < lista_prov.length; i++) {
        let promisse3 = axios.get(`${url}/products/${lista_prov[i]}`, chave);
        promisse3.then((res) => {
            lista.push(res.data);
            setCarrinho(lista);
        });
      }
    });
    promisse2.catch((res) => console.log(res));
    
    console.log(lista);
    let valor = 0;
    for (let i = 0; i < lista.length; i++) {
        valor += lista[i].price;
    }
    console.log(valor);
  }, []);

  if (!User || !carrinho) {
    return (
      <HomeContainer>
        <HeaderSite />
        <LoadingGifDiv />
      </HomeContainer>
    );
  }

  if (User) {
    return (
      <HomeContainer>
        <HeaderSite />
        <h1> Itens atualmente no seu carrinho: </h1>
        <ProductSpace>
          {carrinho.map( item => {
            return (
              <ProductBox key={item._id}>
                <img src={item.foto} />
                <span> {item.name} </span>
              </ProductBox>
            );
          })}
        </ProductSpace>
        <CheckoutData>
            <h1> Seu total é {conta}R$</h1>
        </CheckoutData>
      </HomeContainer>
    );
  }
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100%; 
  h1 {
    color: white;
    font-size: 20px;
    font-weight: 600;
  }
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
    max-width: 98%;
    border-radius: 15px;
  }
`;
const CheckoutData = styled.div`
    
`
