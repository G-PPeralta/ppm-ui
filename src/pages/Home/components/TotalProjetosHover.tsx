import {
  Box,
  Text,
  Popover,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";

interface TotalProjetosHoverProps {
  isVisible: boolean;
  hoverProps: {
    holds: number;
    holdsPercentage: number;
    preAprovacao: number;
    preAprovacaoPercentage: number;
    reprogramado: number;
    reprogramadoPercentage: number;
    naoIniciado: number;
    naoIniciadoPercentage: number;
  };
}

export default function TotalProjetosHover({
  isVisible,
  hoverProps,
}: TotalProjetosHoverProps) {
  return (
    <Popover isOpen={isVisible}>
      <PopoverContent w={"fit-content"}>
        <PopoverBody w={"fit-content"}>
          <Box
            bg={"#FFFFFF"}
            padding={"18px, 24px, 18px, 24px"}
            boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
            borderRadius="8px"
          >
            <Box>
              <Text color={"#1C1B1B"} fontWeight="700">
                Holds: {hoverProps.holds} - {hoverProps.holdsPercentage}%
              </Text>
            </Box>
            <Box>
              <Text color={"#1C1B1B"} fontWeight="700">
                Projetos Pré Aprovação: {hoverProps.preAprovacao} -{" "}
                {hoverProps.preAprovacaoPercentage}%
              </Text>
            </Box>
            <Box>
              <Text color={"#1C1B1B"} fontWeight="700">
                Projetos Reprogramados: {hoverProps.reprogramado} -{" "}
                {hoverProps.reprogramadoPercentage}%
              </Text>
            </Box>
            <Box>
              <Text color={"#1C1B1B"} fontWeight="700">
                Projetos Não Iniciados: {hoverProps.naoIniciado} -{" "}
                {hoverProps.naoIniciadoPercentage}%
              </Text>
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
