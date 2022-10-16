import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import { Flex, IconButton, Input, Text } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import { postCadastroOutro } from "services/post/Projetos";

interface refreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  refreshState: refreshState;
  registerForm: any;
  listaOptions: any;
  payloadKey: string;
  propName: string;
  nomeLabel: string;
  rota: string;
  required?: boolean;
  respOuCoord?: boolean;
}

function InputCadastroInline({
  refreshState,
  registerForm,
  listaOptions,
  payloadKey,
  propName,
  nomeLabel,
  rota,
  required,
  respOuCoord,
}: Props) {
  const [cadastroOutro, setCadastroOutro] = useState("");
  const { refresh, setRefresh } = refreshState;

  const handleClick = () => {
    if (cadastroOutro !== "") {
      const getOptionsMaxValue = listaOptions.reduce(
        (acc: any, curr: any) => (curr.value > acc ? curr.value : acc),
        listaOptions[0].value
      );

      if (respOuCoord) {
        setRefresh(!refresh);
        const payload = {
          [payloadKey]: cadastroOutro,
        };

        setCadastroOutro("");
        registerForm.values[propName] = getOptionsMaxValue + 1;
        postCadastroOutro(rota, payload);

        setRefresh(!refresh);
      } else {
        setRefresh(!refresh);
        const novoOutroAdicionado: any = {
          id: getOptionsMaxValue + 1,
          [payloadKey]: cadastroOutro,
          deletado: false,
        };

        setCadastroOutro("");
        registerForm.values[propName] = novoOutroAdicionado.id;
        postCadastroOutro(rota, novoOutroAdicionado);

        setRefresh(!refresh);
      }
    }
  };

  return (
    <Flex alignItems={"start"} direction={"column"} flex={1}>
      {nomeLabel && (
        <Flex gap={1}>
          {required && <RequiredField />}
          <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
            {nomeLabel}
          </Text>
        </Flex>
      )}
      <Flex align={"center"} gap={2} flex={1}>
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
        />
      </Flex>
    </Flex>
  );
}

export default InputCadastroInline;
