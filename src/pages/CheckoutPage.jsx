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

  // Dados externos iniciais: 

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
    let valor = 0;
    let promisse2 = axios.get(`${url}/cart`, chave);
    promisse2.then((res) => {
      let lista_prov = res.data.itens;
      for (let i = 0; i < lista_prov.length; i++) {
        let promisse3 = axios.get(`${url}/products/${lista_prov[i]}`, chave);
        promisse3.then((res) => {
            lista.push(res.data);
            setCarrinho(lista);
            valor = valor + res.data.price
            setConta(valor)
        });
      }
    });
    promisse2.catch((res) => console.log(res));
    
    console.log(lista);
  }, []);

  if (!User || !carrinho) {
    return (
      <HomeContainer>
        <HeaderSite />
        <LoadingGifDiv />
      </HomeContainer>
    );
  }

  function Finalizar(valor, metodo) {
    
    let tokenSessao = localStorage.getItem("token");
    const chave = { headers: { Authorization: `Bearer ${tokenSessao}` } };
    let promisse = axios.post(`${url}/Checkout`, {payment: metodo},  chave)
    promisse.then(res => {
        console.log(res)
        alert(`
        Sua conta no valor de ${valor} será finalizada.
        Enviaremos os dados de pagamento via 
        ${metodo} no email cadastrado.
    `)
        navigate("/")
    })
    
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
            <h1> 
                Seu total é {conta}R$
            </h1>
            <PayOpt>
                <h1>Deseja Finalizar sua compra com:</h1>
                <div>
                    <button onClick={() => Finalizar(conta,"Cartão de credito")}>
                        Cartão de credito
                    </button>
                    <button onClick={() => Finalizar(conta,"Cartão de debito")}>
                        Cartão de debito
                    </button>
                    <button onClick={() => Finalizar(conta,"Boleto")}>
                        Boleto
                    </button>
                </div>
            </PayOpt>
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
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const PayOpt = styled.div`
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    h1 {
        text-align: center;
    }
    button {
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: white;
        font-size: 20px;
        font-weight: 600;
        color: black;
        cursor: pointer;
        width: unset;
        padding: unset;
        :hover {
            background-color: lightgray;
        }
    }
    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
`
