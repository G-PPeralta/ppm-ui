//  CRIADO EM: 8/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Regras de importação de planilha.

import { AiFillExclamationCircle } from "react-icons/ai";
import "../components/regras.css";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";

export function RegrasGeraisDeImportacao() {
  return (
    <Accordion defaultIndex={[1]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton
            minHeight="100px"
            maxH={"900px"}
            border={"1px"}
            borderColor="gray.200"
            borderRadius="0.5rem"
          >
            <Box flex="1" textAlign="left">
              <Flex>
                <Icon
                  as={AiFillExclamationCircle}
                  fontSize="20px"
                  color="#F40606"
                  // mr={1}
                  alignSelf={"center"}
                />
                <Flex
                  fontSize="24px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  pl="1rem"
                >
                  Regras Planilha x:
                </Flex>
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <br />
          <ul>
            <li>
              - Esta deve conter 2 abas com os nomes "Participação" e
              "Servidão".
            </li>
            <li>
              - O título das colunas deve ser exatamente aos do arquivo que vou
              mandar.
            </li>
          </ul>
          <br />
          <br />
          - Os seguintes campos são obrigatórios:
          <br />
          <br />
          <ul>
            <li>- Sequencial ANP</li>
            <li>- Contrato de Concessão</li>
            <li>- Poço ANP</li>
            <li>- Poço BMP</li>
            <li>- CNPJ Origem</li>
            <li>- Polo</li>
            <li>- Campo</li>
            <li>- Município</li>
            <li>- UF</li>
            <li>- Regulararizada</li>
            <li>- Uso da Terra</li>
            <li>- Endereço</li>
            <li>- Última atualização</li>
            <li>- Sequencial ANP aceita apenas números</li>
            <li>
              - Participação na Produção deve ser uma porcentagem (Ex: 25%)
            </li>
          </ul>
          <br />
          <br />
          - Os campos Contrato de Participação Petrobras, Escritura de Servidão
          Petrobras e Regularizada devem ser prenchidos apenas com 3 opções,
          sendo elas: "SIM", "NÃO" ou "N/A".
          <br />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
