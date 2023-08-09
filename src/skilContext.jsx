import React, { useContext, createContext, useState } from 'react';

const SkillContext = createContext();

export const useSkillContext = () => {
    return useContext(SkillContext);
};

export const SkillProvider = ({ children }) => {
    const [allSkills, setAllSkills] = useState([]);

    return (
        <SkillContext.Provider value={{ allSkills, setAllSkills }}>
            {children}
        </SkillContext.Provider>
    );
};
