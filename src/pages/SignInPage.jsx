import axios from "axios";
import styled from "styled-components";
import { UserContext } from "/src/App.jsx";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useContext, useEffect, useState } from "react";

export default function SignInPage() {
  
  /* Variaveis de Estado */
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [visivel, setVisivel] = useState(false);

  /* Configurações da Página */
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const setUser = useContext(UserContext).SetUserData;

  /* Token: existencia + uso */
  let tokenSessao = localStorage.getItem("token");

  /* Funções de transição */
  function login(e) {
    e.preventDefault();
    setVisivel(true);
    requisição_login();
  }
  function requisição_login() {
    let dadosLogin = {
      email,
      password: senha,
    };
    let promisse = axios.post(`${url}/sign-in`, dadosLogin);
    promisse.then((resposta) => Sucesso(resposta));
    promisse.catch((resposta) => Fail(resposta));
  }
  function Sucesso(resposta) {
    console.log(resposta);
    let token = resposta.data;
    const chave = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let promisse = axios.get(`${url}/usuario-logado`, chave);

    promisse.then((resposta) => {
      setUser({
        nome: resposta.data.name,
        email: resposta.data.email,
        tokenSessao,
      });
      localStorage.setItem("token", `${token}`);
      navigate("/home");
    });
    
  }
  function Fail(resposta) {
    alert(`${resposta.response.data}`);
    setVisivel(false);
  }

  /* Se houver um Token: */
  if (tokenSessao) {
    useEffect(() => {
      if (tokenSessao) {
        const chave = {
          headers: {
            Authorization: `Bearer ${tokenSessao}`,
          },
        };

        let promisse = axios.get(`${url}/usuario-logado`, chave);
        promisse.then((resposta) => {
          setUser({
            nome: resposta.data.nome,
            email: resposta.data.email,
            tokenSessao,
          });
          navigate("/home");
        });
      }
    }, []);

    return <Centered>{<ThreeDots height={"80"} color="#FFFFFF" />}</Centered>;
  }

  /* Se NÃO houver um Token: */
  if (!tokenSessao) {
    return (
      <SingInContainer>
        <form onSubmit={login}>
          <Logo />
          <input
            placeholder="E-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>

        {<ThreeDots height={"40"} color="#FFFFFF" visible={visivel} />}

        <Link to={"/SignUp"}>Primeira vez? Cadastre-se!</Link>
      </SingInContainer>
    );
  }
}

const SingInContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Centered = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
