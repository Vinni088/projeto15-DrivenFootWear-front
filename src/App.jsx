import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import { createContext, useState } from "react";
import ProductbyTypePage from "./pages/ProductbyTypePage";


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
            <Route path="/Products/:ProductType" element={<ProductbyTypePage />} />
            <Route path="/Products/add/:IdProduct" element={<ProductPage />} />
            <Route path="/Checkout" element={<CheckoutPage/>}></Route>
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
