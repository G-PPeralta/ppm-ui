import {
  FormControl,
  FormLabel,
  Input,
  // useBreakpointValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormValorTotalPrevisto(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
        htmlFor="valorTotalPrevisto"
      >
        CAPEX PREVISTO
      </FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          fontSize={"12px"}
          fontWeight={"700"}
          color={"#949494"}
        >
          R$
        </InputLeftElement>
        <Input
          isRequired
          placeholder="10.000,00"
          id="valorTotalPrevisto"
          type="text"
          name="valorTotalPrevisto"
          value={projectsForm.projectsForm.values.valorTotalPrevisto}
          onChange={projectsForm.projectsForm.handleChange}
          mt={"-9px"}
          h={"56px"}
          w={"50%"}
          border={"solid 1px #949494"}
          fontSize={"14px"}
          fontWeight={"400"}
        />
      </InputGroup>
      {projectsForm.projectsForm.errors.valorTotalPrevisto &&
        projectsForm.projectsForm.touched.valorTotalPrevisto && (
          <TextError>
            {projectsForm.projectsForm.errors.valorTotalPrevisto}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormValorTotalPrevisto;
