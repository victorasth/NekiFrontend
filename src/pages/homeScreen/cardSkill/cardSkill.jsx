import React, { useState } from "react";
import { CardBody, Card, Stack, Image, Text, Heading, CardFooter, Button, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Img } from '@chakra-ui/react';
import './cardSkill.css'
function CardSkill({ skill, onDelete }) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {

            const response = await fetch(`http://localhost:8085/skill/delete/${skill.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {

                onDelete(skill.id);
            } else {
                console.error('Erro ao excluir habilidade');
            }

            setIsConfirmModalOpen(false);
        } catch (error) {
            console.error('Erro ao excluir habilidade:', error);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
    };

    return (
        <div className='wrapCard'>
            <Card className='card'
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={skill.imagem}
                    alt={skill.nome}/>
                {/* <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={skill.imagemUrl}
                    alt={skill.nome}
                /> */}

                <Stack>
                    <CardBody>
                        <Heading className="headerCard" size='md'>{skill.nome}</Heading>

                        <Text py='2'>
                            Level  - Versão {skill.versao}
                        </Text>

                        <Divider />

                        <Text py='2'>
                            {skill.descricao}
                        </Text>

                    </CardBody>

                    <CardFooter>
                        <Button className='buttonCard' bg={"#08AFA5"} color={"white"} marginRight={"10px"} variant='solid'>
                            Editar nível
                        </Button>
                        <Button className='buttonCard' variant='solid' bg={"red"} color={"white"} marginRight={"10px"} onClick={handleDeleteClick}>
                            Excluir
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>

            <Modal isOpen={isConfirmModalOpen} onClose={handleCancelDelete}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={"#08AFA5"}
                        borderTopLeftRadius="10px"
                        borderTopRightRadius="10px">Confirmar Exclusão</ModalHeader>
                    <ModalBody>
                        Tem certeza de que deseja excluir a habilidade <strong>{skill.nome}</strong>?
                    </ModalBody>
                    <ModalFooter>
                        <Button bg={"#08AFA5"} color={"white"} colorScheme="blue" mr={3} onClick={handleConfirmDelete}>
                            Confirmar
                        </Button>
                        <Button bg={"red"} color={"white"} onClick={handleCancelDelete}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default CardSkill;
