//  CRIADO EM: 06/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Input para edição e cadastro.

import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";

import { Flex, IconButton, Input, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import { postCadastroOutro } from "services/post/Projetos";

interface refreshState {
  refresh1: boolean;
  setRefresh1: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  refreshState: refreshState;
  registerForm: any;
  listaOptions: any;
  payloadKey: string;
  propName: string;
  nomeLabel: string;
  rota: string;
  ind_sistema?: string;
  required?: boolean;
  respOuCoord?: boolean;
}

function InputCadastroArea({
  refreshState,
  registerForm,
  listaOptions,
  payloadKey,
  ind_sistema,
  propName,
  nomeLabel,
  rota,
  required,
  respOuCoord,
}: Props) {
  const [cadastroOutro, setCadastroOutro] = useState("");
  const { refresh1, setRefresh1 } = refreshState;

  let payload = {
    [payloadKey]: cadastroOutro,
  };

  const handleClick = () => {
    if (cadastroOutro !== "") {
      const getOptionsMaxValue = listaOptions.reduce(
        (acc: any, curr: any) => (curr.value > acc ? curr.value : acc),
        listaOptions[0].value
      );

      if (respOuCoord) {
        setRefresh1(!refresh1);
        if (!ind_sistema) {
          payload = {
            [payloadKey]: cadastroOutro,
          };
        }

        if (ind_sistema) {
          payload = {
            [payloadKey]: cadastroOutro,
            ind_sistema,
          };
        }

        setCadastroOutro("");
        registerForm.values[propName] = getOptionsMaxValue + 1;
        postCadastroOutro(rota, payload);

        setRefresh1(!refresh1);
      } else {
        setRefresh1(!refresh1);
        const novoOutroAdicionado: any = {
          id: getOptionsMaxValue + 1,
          [payloadKey]: cadastroOutro,
          deletado: false,
        };

        setCadastroOutro("");
        registerForm.values[propName] = novoOutroAdicionado.id;
        postCadastroOutro(rota, novoOutroAdicionado);

        setRefresh1(!refresh1);
      }
    }
  };

  const handleCancelar = () => {
    setCadastroOutro("");
    registerForm.setFieldValue(`${propName}`, -1);
  };

  return (
    <Flex alignItems={"stretch"} direction={"column"} w={"100%"}>
      {nomeLabel && (
        <Flex gap={1}>
          {required && <RequiredField />}
          <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
            {nomeLabel}
          </Text>
        </Flex>
      )}
      <Flex align={"center"} gap={1} flex={1}>
        <Input
          placeholder="Outro"
          id={propName}
          type="text"
          name={propName}
          value={cadastroOutro}
          onChange={(e) => setCadastroOutro(e.target.value)}
          w={"100%"}
          border={"1px solid #949494"}
          h={"56px"}
          maxLength={40}
        />
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          isRound={true}
          size="sm"
          onClick={() => handleClick()}
          _hover={{
            background: "origem.500",
            transition: "all 0.4s",
            cursor: "pointer",
          }}
        />
        <IconButton
          isRound
          variant={"secondary"}
          size={"sm"}
          aria-label="Botão excluir anexo"
          color="white"
          background="red.500"
          _hover={{
            background: "red.600",
            transition: "all 0.4s",
            color: "white",
            size: "md",
          }}
          icon={<AiOutlineClose />}
          onClick={() => handleCancelar()}
        />
      </Flex>
    </Flex>
  );
}

export default InputCadastroArea;
