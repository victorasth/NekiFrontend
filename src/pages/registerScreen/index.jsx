import React, { useState } from "react";
import ImgLogin from './../../assets/ImgLogin.png'
import './index.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainLayout from './../../components/mainLayout';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [inputEmpty, setInputEmpty] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const checkInputEmpty = () => {
        return !username || !password || !confirmPassword;
    };

    const isStrongPassword = (password) => {
        const uppercasePattern = /[A-Z]/;
        const specialCharacterPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return uppercasePattern.test(password) && specialCharacterPattern.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (checkInputEmpty()) {
            setInputEmpty(true);
            return;
        } else {
            setInputEmpty(false);
        }

        if (password === confirmPassword) {
            if (isStrongPassword(password)) {
                try {
                    const response = await fetch('http://localhost:8085/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            usuario: username,
                            senha: password,
                        }),
                    });

                    if (response.ok) {
                        console.log('Registro bem-sucedido');
                        setShowSuccessModal(true);
                    } else {
                        const responseData = await response.json();
                        setPasswordError(responseData.error.message);
                    }
                } catch (error) {
                    console.error('Erro ao registrar:', error);
                }
            } else {
                setPasswordError("A senha deve conter pelo menos uma letra maiúscula e um caractere especial.");
            }
        } else {
            setPasswordError("");
            setConfirmPasswordError("Senhas não coincidem. Por favor, tente novamente.");
        }
    };

    const clearPasswordError = () => {
        if (passwordError !== "") {
            setPasswordError("");
        }
    };

    const clearConfirmPasswordError = () => {
        if (confirmPasswordError !== "") {
            setConfirmPasswordError("");
        }
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <MainLayout pageTitle="Cadastro">
            <div className="container">
                <div className="containerRegister">
                    <div className="wrapRegister">
                        <div className="containerFormRegister">
                            <form className="formRegister" onSubmit={handleRegister}>
                                <div className="containerImage">
                                    <img className="imageRegister" src={ImgLogin} alt="Logo" />
                                </div>
                                <h1 className="titleRegister">
                                    Cadastrar conta
                                </h1>
                                <div className={`wrapInput ${inputEmpty && !username ? 'input-empty' : ''}`}>
                                    <input
                                        className={username !== "" ? 'has-val input' : 'input'}
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <span className="focusInput" data-placeholder="Usuário"></span>
                                </div>
                                <div className={`wrapInput ${inputEmpty && (!password || !confirmPassword) ? 'input-empty' : ''} ${passwordError || confirmPasswordError ? 'input-error' : ''}`}>
                                    <input
                                        className={password !== "" ? 'has-val input' : 'input'}
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={e => { setPassword(e.target.value); clearPasswordError(); }}
                                    />
                                    <span className="focusInput" data-placeholder="Criar uma senha"></span>
                                    <button
                                        type="button"
                                        className="showPasswordBtn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className={`wrapInput ${inputEmpty && (!password || !confirmPassword) ? 'input-empty' : ''} ${passwordError || confirmPasswordError ? 'input-error' : ''}`}>
                                    <input
                                        className={confirmPassword !== "" ? 'has-val input' : 'input'}
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={e => { setConfirmPassword(e.target.value); clearConfirmPasswordError(); }}
                                    />
                                    <span className="focusInput" data-placeholder="Confirmar senha"></span>
                                    <button
                                        type="button"
                                        className="showPasswordBtn"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {inputEmpty && <div className="error-message">Por favor, preencha todos os campos.</div>}
                                {passwordError && <div className="error-message">{passwordError}</div>}
                                {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                                <div className="containerBtn">
                                    <button className="registerBtn" type="submit">Cadastrar</button>
                                    <Link to="/login" className="registerBtn">Voltar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Modal  isOpen={showSuccessModal} onClose={closeSuccessModal} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader 
                    bg={"#08AFA5"}
                    borderTopLeftRadius="10px"
                    borderTopRightRadius="10px"
                    >Parabéns!</ModalHeader>
                    <Link to="/login"><ModalCloseButton onClick={closeSuccessModal} /></Link>
                    <ModalBody>
                        Seu registro foi realizado com sucesso.
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/login">
                            <Button bg={"#08AFA5"} color={"white"} onClick={closeSuccessModal}>
                                Fechar
                            </Button>
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </MainLayout>
    );
};

export default Register;
