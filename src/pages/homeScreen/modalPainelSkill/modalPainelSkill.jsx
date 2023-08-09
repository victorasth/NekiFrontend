import React, { useState } from "react";
import Modal from "react-modal";
import './modalPainelSkill.css'
import { Input, Textarea, Button, Spinner } from '@chakra-ui/react';
import LogoHeader from './../../../assets/LogoHeader.png';
import { useSkillContext } from "../../../skilContext";

const ModalPainelSkill = ({ isOpen, closeModal }) => {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [newSkill, setNewSkill] = useState({
        nome: "",
        versao: "",
        descricao: "",
        imagem: "",
    });
    const [loading, setLoading] = useState(false);
    
    const { setAllSkills } = useSkillContext();
    const maxLength = 200; 

    const caracteresRestantes = maxLength - newSkill.descricao.length;

    const handleAddClick = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmAddClick = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8085/skill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSkill),
            });

            if (response.ok) {
                const skill = await response.json();
                setAllSkills(prevSkills => [...prevSkills, skill]);
            } else {
                console.error('Erro ao adicionar habilidade');
            }
        } catch (error) {
            console.error('Erro ao adicionar habilidade:', error);
        }

        setLoading(false);
        setNewSkill({
            nome: "",
            versao: "",
            descricao: "",
            imagem: "",
        });
        setConfirmationOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSkill(prevSkill => ({
            ...prevSkill,
            [name]: value,
        }));
    };

    return (
        <div className="containerModal">
            <Modal
                className="modal"
                isOpen={isOpen}
                onRequestClose={closeModal}
            >
                <header className="headerModal">
                    <h2 className="titleHeaderModal">Adicionar Skill</h2>
                    <img className="imgHeaderModal" src={LogoHeader} alt="" />
                </header>

                <div className="mainModal">
                    <div className="inputSkill">
                        <Input
                            marginTop={'10px'}
                            name="nome"
                            value={newSkill.nome}
                            onChange={handleInputChange}
                            placeholder="Nome da Habilidade"
                        />
                        <Input
                            marginTop={'10px'}
                            name="versao"
                            value={newSkill.versao}
                            onChange={handleInputChange}
                            placeholder="Level"
                        />
                        <Textarea
                            marginTop={'10px'}
                            name="descricao"
                            value={newSkill.descricao}
                            onChange={handleInputChange}
                            placeholder="Descrição"
                            maxLength={200}
                        />
                        <div>
                            {caracteresRestantes} / {maxLength} caracteres restantes
                        </div>

                        <Input
                            marginTop={'10px'}
                            name="imagem"
                            value={newSkill.imagem}
                            onChange={handleInputChange}
                            placeholder="URL da Imagem"
                        />
                    </div>

                    <div className="containerBtn">
                        <Button className="registerSkill" onClick={handleAddClick}>
                            Adicionar
                        </Button>
                        <Button className="closeModal" onClick={closeModal}>
                            Fechar Modal
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isConfirmationOpen}
                onRequestClose={() => setConfirmationOpen(false)}
                className="confirmModal"
            >
                <header className="headerModal">
                    <h2 className="titleHeaderModal">Confirmação</h2>
                    <img className="imgHeaderModal" src={LogoHeader} alt="" />
                </header>
                <div className="mainModal">
                    <p>Tem certeza de que deseja adicionar a skill <strong>{newSkill.nome}</strong> na sua lista de habilidades?</p>
                    <div className="containerBtn">
                        <Button className="registerSkill" onClick={handleConfirmAddClick}>
                            {loading ? (
                                <Spinner
                                    aria-label="Enviando dados"
                                    thickness="5px"
                                    speed="0.50s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="md"
                                    mr={2}
                                />
                            ) : (
                                'Confirmar'
                            )}
                        </Button>
                        <Button className="closeModal" onClick={() => setConfirmationOpen(false)}>Cancelar</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalPainelSkill;
