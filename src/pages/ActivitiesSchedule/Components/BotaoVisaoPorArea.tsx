//  CRIADO EM: 09/2022
//  AUTOR: Eduardo Muchak
//  DESCRIÇÃO Botão de navegar para a tela de visão por área.

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@chakra-ui/react";

function BotaoVisaoPorArea() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campanhas/atividade/${id}/visao-por-area`);
  };

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
        variant="outline"
        border={"2px solid"}
        borderColor={"origem.500"}
        textColor={"origem.500"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.500",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={handleClick}
      >
        Visão Por Área
      </Button>
    </>
  );
}

export default BotaoVisaoPorArea;
