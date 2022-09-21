import { useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Complexidade } from "interfaces/Services";

import { TextError } from "components/TextError";

import { getComplexidade } from "services/get/Projetos";

function FormComplexidade(projectsForm: any) {
  const [complexidadeState, setComplexidadeState] = useState<Complexidade[]>(
    [] as Complexidade[]
  );

  async function handleGetProjetos() {
    const reqGet = await getComplexidade();

    const dataReq: Complexidade[] = reqGet.data.sort(
      (a: Complexidade, b: Complexidade) =>
        a.complexidade.localeCompare(b.complexidade)
    );

    setComplexidadeState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="complexidadeId">COMPLEXIDADE</FormLabel>
      <Select
        id="complexidadeId"
        name="complexidadeId"
        value={projectsForm.projectsForm.values.complexidadeId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "100%" })}
        placeholder="Selecione"
      >
        {complexidadeState.map((complexidade) => (
          <option key={complexidade.id} value={complexidade.id}>
            {complexidade.complexidade}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.complexidadeId &&
        projectsForm.projectsForm.touched.complexidadeId && (
          <TextError>
            {projectsForm.projectsForm.errors.complexidadeId}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormComplexidade;
