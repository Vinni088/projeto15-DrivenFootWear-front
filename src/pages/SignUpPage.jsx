import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/Logo";

export default function SignUpPage() {
  let [nome, setNome] = useState("");
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [senha2, setSenha2] = useState("");
  let [visivel, setVisivel] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  function Cadastro(e) {
    e.preventDefault();
    requisição();
  }

  function requisição() {
    if (senha !== senha2) {
      return alert("As senhas digitadas não coincidem.");
    }

    let novoCadastro = {
      name: nome,
      email,
      password: senha,
    };
    console.log(novoCadastro)
    
    const post = axios.post(`${url}/sign-up`, novoCadastro);
    setVisivel(true)
    post.then(() => navigate("/"));
    post.catch((resposta) => {
      alert(
        `Houve um problema com seu cadastro: ${resposta.response.data}`
      );
      setVisivel(false)
      console.log(resposta);
    });
  }

  return (
    <SingUpContainer>
      <form onSubmit={Cadastro}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

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

        <input 
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={senha2}
          onChange={(e) => setSenha2(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>Já tem uma conta? Entre agora!</Link>

      {<ThreeDots height={"40"} color="#FFFFFF" visible={visivel} />}

    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
