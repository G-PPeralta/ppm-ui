import { FiPlus, FiTrash } from "react-icons/fi";

import { Flex, IconButton } from "@chakra-ui/react";

import InputGenerico from "components/InputGenerico";
import LeitorPDF from "components/LeitorPDF";

import { regexCaracteresEspeciais } from "utils/regex";

import BotaoUploadArquivo from "./BotaoUpload";

interface Props {
  registerForm: any;
}

function EditarAtividadeTabAPR({ registerForm }: Props) {
  const adicionarNovaApr = () => {
    const aprs = registerForm.values.aprs;
    registerForm.setFieldValue("aprs", [
      ...aprs,
      {
        codigo_apr: "",
        anexo: "",
        arquivo: "",
      },
    ]);
  };

  const removerApr = (index: number) => {
    const aprs = registerForm.values.aprs;
    aprs.splice(index, 1);
    registerForm.setFieldValue("aprs", [...aprs]);
  };

  const isDisabled = registerForm.values.aprs.some(
    (apr: any) => apr.codigo_apr === ""
  );

  // console.log("registerForm", registerForm.values);

  return (
    <Flex w={"100%"} direction={"column"} gap={4}>
      <Flex flex={1} justify={"space-between"} direction={"column"} gap={4}>
        {registerForm.values.aprs.map((apr: any, index: number) => (
          <Flex direction={"column"} gap={5}>
            <Flex gap={4} justify={"space-between"} align={"end"} key={index}>
              <Flex w={"50%"} align={"end"} gap={2}>
                <InputGenerico
                  registerForm={registerForm}
                  nomeInput={"CÓDIGO DA APR"}
                  propName={`aprs[${index}].codigo_apr`}
                  value={regexCaracteresEspeciais(
                    registerForm.values.aprs[index].codigo_apr
                  )}
                  required={false}
                  placeholder={"Código da APR"}
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
                  onClick={() => removerApr(index)}
                />
              </Flex>
              <BotaoUploadArquivo
                registerForm={registerForm}
                index={index}
                nomeArquivo={apr.anexo}
                propName={"aprs"}
              />
            </Flex>
            {apr?.url?.length > 0 && (
              <LeitorPDF
                registerForm={registerForm}
                index={index}
                propName={"aprs"}
              />
            )}
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
          onClick={() => adicionarNovaApr()}
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

export default EditarAtividadeTabAPR;
