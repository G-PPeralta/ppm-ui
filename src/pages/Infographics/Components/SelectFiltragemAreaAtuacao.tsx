import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { AreaAtuacao } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";
// import { TextError } from "components/TextError";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

function SelectFiltragemAreaAtuacao({ registerForm }: any) {
  const { listaAreaAtuacao } = useCadastroAtividade();
  const options = listaAreaAtuacao.map((area: AreaAtuacao) => ({
    value: area.id,
    label: area.tipo,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    registerForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <Flex gap={1}>
          <RequiredField />
          <FormLabel htmlFor="area_atuacao">AREA</FormLabel>
        </Flex>
        <Select
          id="area_atuacao"
          name="area_atuacao"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
        {/* {registerForm.errors.area_atuacao &&
          registerForm.touched.area_atuacao && (
            <TextError>{registerForm.errors.area_atuacao}</TextError>
          )} */}
      </FormControl>
    </>
  );
}

export default SelectFiltragemAreaAtuacao;
