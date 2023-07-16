import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { createContext, useState } from "react";

export const UserContext = createContext();

export default function App() {
  let [UserData, SetUserData] = useState(null);

  return (
    <UserContext.Provider value={{UserData, SetUserData}}>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/Home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </UserContext.Provider>
  );
}

const PagesContainer = styled.main`
  background-color: red;
  background-image: linear-gradient(180deg, lightcoral, coral);
  width: 100vw;
  height: 100vh;
  padding: 10px;
`;
