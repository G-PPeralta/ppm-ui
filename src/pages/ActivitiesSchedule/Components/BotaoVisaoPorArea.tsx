import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";

interface Props {
  id: string | undefined;
}

function BotaoVisaoPorArea({ id }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/atividade/${id}/visao-por-area`);
  };

  return (
    <>
      <Button
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
