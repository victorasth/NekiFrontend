import React, { useState, useEffect } from "react";
import MainLayout from "../../components/mainLayout";
import "./index.css";
import CardSkill from "./cardSkill/cardSkill";
import ModalPainelSkill from "./modalPainelSkill/modalPainelSkill";
import { useSkillContext } from "../../skilContext";
import { Link } from "react-router-dom";



const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { allSkills, setAllSkills } = useSkillContext();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSkillAdd = (newSkill) => {
        setAllSkills([...allSkills, newSkill]);
    };

    const handleSkillDelete = (id) => {
        const updatedSkills = allSkills.filter(skill => skill.id !== id);
        setAllSkills(updatedSkills);
    };

    const fetchAllSkills = async () => {
        try {
            const response = await fetch('http://localhost:8085/skill/all');
            if (response.ok) {
                const skills = await response.json();
                setAllSkills(skills);
            }
        } catch (error) {
            console.error('Erro ao buscar habilidades:', error);
        }
    };

    useEffect(() => {
        fetchAllSkills();
    }, []);

    return (
        <MainLayout>
            <div className="main">

                <div className="containerPainelSkill">
                    <h1>Usúario X</h1>
                    <button onClick={openModal} className="painelSkill">Adicionar Skill</button>
                    <Link to="/login"><button className="painelSkill">Logout</button></Link>
                </div>
                <ModalPainelSkill isOpen={isModalOpen} closeModal={closeModal} onSkillAdd={handleSkillAdd} />

                <div className="cardContainer">
                    {allSkills.map(skill => (
                        <CardSkill key={skill.id} skill={skill} onDelete={handleSkillDelete} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
