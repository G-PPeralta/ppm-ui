import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  IconButton,
} from "@chakra-ui/react";

import { RegisterNewTask } from "./RegisterNewTask";
import { RegisterProjectType } from "./RegisterProjectType";
import RegistrarNovaIntervencao from "./RegistrarNovaIntervencao";

function BotaoCadastrar() {
  const [atividadeModalIsVisible, setAtividadeModalIsVisible] = useState(false);
  const [intervencaoModalIsVisible, setIntervencaoModalIsVisible] =
    useState(false);
  const [projetoModalIsVisible, setProjetoModalIsVisible] = useState(false);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Flex
            mt={2}
            py={3}
            w="75%"
            border={"2px"}
            borderStyle={"dashed"}
            borderColor={"origem.500"}
            borderRadius={"3xl"}
            direction={"column"}
            gap={4}
            align={"center"}
            justify={"center"}
            _hover={{
              cursor: "pointer",
              backgroundColor: "grey.100",
              transition: "all 0.4s",
            }}
          >
            <IconButton
              aria-label="Plus sign"
              icon={<BsPlusLg />}
              background="origem.300"
              variant="secondary"
              color="white"
              isRound={true}
              size="lg"
            />

            <Text color={"origem.500"} fontWeight={600}>
              Cadastrar
            </Text>
          </Flex>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            backgroundColor="origem.400"
            color={"white"}
            border={"none"}
          >
            <PopoverArrow backgroundColor="origem.400" />
            <PopoverCloseButton />
            <PopoverBody>
              <>
                <Box>
                  <Text
                    fontSize={"lg"}
                    fontWeight={"600"}
                    _hover={{
                      cursor: "pointer",
                      transition: "all 0.4s",
                    }}
                    onClick={() => setAtividadeModalIsVisible(true)}
                  >
                    Atividade
                  </Text>
                  <RegisterNewTask
                    isOpen={atividadeModalIsVisible}
                    onClose={() => setAtividadeModalIsVisible(false)}
                  />
                </Box>
                <Box>
                  <Text
                    fontSize={"lg"}
                    fontWeight={"600"}
                    _hover={{
                      cursor: "pointer",
                      transition: "all 0.4s",
                    }}
                    onClick={() => setIntervencaoModalIsVisible(true)}
                  >
                    Intervenção
                  </Text>
                  <RegistrarNovaIntervencao
                    isOpen={intervencaoModalIsVisible}
                    onClose={() => setIntervencaoModalIsVisible(false)}
                  />
                </Box>
                <Box>
                  <Text
                    fontSize={"lg"}
                    fontWeight={"600"}
                    _hover={{
                      cursor: "pointer",
                      transition: "all 0.4s",
                    }}
                    onClick={() => setProjetoModalIsVisible(true)}
                  >
                    Projeto
                  </Text>
                  <RegisterProjectType
                    isOpen={projetoModalIsVisible}
                    onClose={() => setProjetoModalIsVisible(false)}
                  />
                </Box>
              </>
              {/* <Button colorScheme="blue">Button</Button> */}
            </PopoverBody>
            {/* <PopoverFooter>This is the footer</PopoverFooter> */}
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}

export default BotaoCadastrar;
