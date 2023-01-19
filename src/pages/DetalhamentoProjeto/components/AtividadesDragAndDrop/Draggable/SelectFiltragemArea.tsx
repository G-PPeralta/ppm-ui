//  CRIADO EM: 07/2022
//  AUTOR:Bruno Fracaro e Eduardo Muchak
//  DESCRIÇÃO DO ARQUIVO: Combobox para selcionar uma área.

import Select from "react-select";

import { Flex, Text } from "@chakra-ui/react";
import { Area } from "interfaces/CadastrosModaisInfograficos";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

interface Props {
  registerForm: any;
  index: number;
}

function SelectFiltragemArea({ registerForm, index }: Props) {
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
        <Text sx={{ fontSize: 12, fontWeight: "600" }}>ÁREA</Text>
        <Select
          id={`atividades[${index}].area_id`}
          name={`atividades[${index}].area_id`}
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
      </Flex>
    </>
  );
}

export default SelectFiltragemArea;
