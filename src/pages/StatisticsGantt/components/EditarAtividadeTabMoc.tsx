import { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

import { Flex, IconButton } from "@chakra-ui/react";

import InputGenerico from "components/InputGenerico";
import LeitorPDF from "components/LeitorPDF";

import { regexCaracteresEspeciais } from "utils/regex";

import BotaoUploadArquivo from "./BotaoUpload";

interface Props {
  registerForm: any;
}

function EditarAtividadeTabMOC({ registerForm }: Props) {
  const [arquivoPdf, setArquivoPdf] = useState<any>("");

  const adicionarNovaMoc = () => {
    const mocs = registerForm.values.mocs;
    registerForm.setFieldValue("mocs", [
      ...mocs,
      {
        numero_moc: "",
        anexo: "",
        arquivo: "",
      },
    ]);
  };

  const removerMoc = (index: number) => {
    const mocs = registerForm.values.mocs;
    mocs.splice(index, 1);
    registerForm.setFieldValue("mocs", [...mocs]);
  };

  const isDisabled = registerForm.values.mocs.some(
    (moc: any) => moc.numero_moc === ""
  );

  return (
    <Flex w={"100%"} direction={"column"} gap={4}>
      <Flex flex={1} justify={"space-between"} direction={"column"} gap={4}>
        {registerForm.values.mocs.map((moc: any, index: number) => (
          <Flex direction={"column"} gap={5}>
            <Flex gap={4} justify={"space-between"} align={"end"} key={index}>
              <Flex w={"50%"} align={"end"} gap={2}>
                <InputGenerico
                  registerForm={registerForm}
                  nomeInput={"NÚMERO DA MOC"}
                  propName={`mocs[${index}].numero_moc`}
                  value={regexCaracteresEspeciais(
                    registerForm.values.mocs[index].numero_moc
                  )}
                  required={false}
                  placeholder={"Número da MOC"}
                  maxLength={100}
                />
                <IconButton
                  aria-label="Botão de Deletar"
                  icon={<FiTrash size={20} />}
                  borderRadius={"10px"}
                  h={"56px"}
                  w={"56px"}
                  background={"transparent"}
                  color={"red.500"}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  onClick={() => removerMoc(index)}
                />
              </Flex>
              <BotaoUploadArquivo
                registerForm={registerForm}
                index={index}
                nomeArquivo={moc.anexo}
                setArquivoPdf={setArquivoPdf}
              />
            </Flex>
            {arquivoPdf && <LeitorPDF arquivoPdf={arquivoPdf} />}
          </Flex>
        ))}
      </Flex>
      <Flex
        w="100%"
        border={"2px"}
        borderStyle={"dashed"}
        borderRadius={"50px"}
        borderColor={"#D6D4D4"}
        align={"center"}
        justify={"center"}
        p={2}
        _hover={{
          borderColor: "#D6D4D4",
        }}
      >
        <IconButton
          onClick={() => adicionarNovaMoc()}
          icon={<FiPlus />}
          aria-label={"Plus sign icon"}
          isRound={true}
          color={"white"}
          backgroundColor={isDisabled ? "#D6D4D4" : "origem.500"}
          size={"sm"}
          _hover={{
            backgroundColor: isDisabled ? "#D6D4D4" : "origem.600",
          }}
          transition={"all 0.4s"}
          isDisabled={isDisabled}
        />
      </Flex>
    </Flex>
  );
}

export default EditarAtividadeTabMOC;
