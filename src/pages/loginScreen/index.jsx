import React, { useState, useEffect } from "react";
import './index.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainLayout from './../../components/mainLayout';
import LogoNeki from './../../assets/LogoNeki.png'
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (storedUsername && storedPassword && rememberPassword) {
            setUsername(storedUsername);
            setPassword(storedPassword);
        }
    }, [rememberPassword])

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8085/user?usuario=${username}', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: username,
                    senha: password,
                }),
            });

            if (response.ok) {
               
            } else {
                
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }

        if (rememberPassword) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
    }

    return (
        <MainLayout pageTitle="Login">
            <div className="container">
                <div className="containerLogin">
                    <div className="wrapLogin">
                        <div className="containerImg">
                            <img className="imageLogin" src={LogoNeki} alt="Logo" />
                        </div>
                        <div className="containerFormLogin">
                            <form className="formLogin">
                                <h1 className="titleLogin"> Bem-vindo!</h1>
                                <div className="wrapInput">
                                    <input
                                        className={username !== "" ? 'has-val input' : 'input'}
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <span className="focusInput" data-placeholder="Usuário"></span>
                                </div>
                                <div className="wrapInput">
                                    <input
                                        className={password !== "" ? 'has-val input' : 'input'}
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <span className="focusInput" data-placeholder="Senha"></span>
                                    <button
                                        type="button"
                                        className="showPasswordBtn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="rememberMe">
                                    <input
                                        type="checkbox"
                                        checked={rememberPassword}
                                        onChange={() => setRememberPassword(!rememberPassword)}
                                    />
                                    <label>Lembrar senha</label>
                                </div>
                                <div className="containerBtn">
                                    <Link to={"/home"}><button className="loginBtn" onClick={handleLogin}>Entrar</button></Link>
                                </div>
                                <div className="textBottom">
                                    <span className="text1">Não possui cadastro?</span>
                                    <a href="/cadastro" className="text2">Efetuar cadastro.</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Login;
