import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from './App';
import Login from './pages/loginScreen/index';
import Register from "./pages/registerScreen";
import Home from "./pages/homeScreen";
import { SkillProvider } from "./skilContext";

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <SkillProvider> {/* Adicione o SkillProvider aqui */}
      <React.StrictMode>
        {router}
      </React.StrictMode>
    </SkillProvider>
  </ChakraProvider>,
);
