//  CRIADO EM: 09/2022
//  AUTOR: Eduardo Muchak
//  DESCRIÇÃO DO ARQUIVO: Combobox para selecionar a tarefa da atividade.

import Select from "react-select";

import { Flex, Text } from "@chakra-ui/react";
import { Area } from "interfaces/CadastrosModaisInfograficos";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

interface Props {
  registerForm: any;
  index: number;
}

function SelectFiltragemTarefa({ registerForm, index }: Props) {
  const { listaArea } = useCadastroAtividade();

  const options = listaArea.map((area: Area) => ({
    value: area.id,
    label: area.nom_area,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    registerForm.setFieldValue(name, value);
  };

  return (
    <>
      <Flex direction={"column"}>
        <Text sx={{ fontSize: 12, fontWeight: "600" }}>TAREFA</Text>
        <Select
          id={`atividades[${index}].tarefa_id`}
          name={`atividades[${index}].tarefa_id`}
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
      </Flex>
    </>
  );
}

export default SelectFiltragemTarefa;
