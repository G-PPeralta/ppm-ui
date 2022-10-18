import {
  FormControl,
  FormLabel,
  Input,
  // useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormDataInicio(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
        htmlFor="dataInicio"
      >
        INÍCIO
      </FormLabel>
      <Input
        max="9999-12-31"
        maxLength={1}
        isRequired
        placeholder="dd/mm/aaaa"
        id="dataInicio"
        type="date"
        name="dataInicio"
        value={projectsForm.projectsForm.values.dataInicio}
        onChange={projectsForm.projectsForm.handleChange}
        mt={"-9px"}
        h={"56px"}
        w={"30%"}
        border={"solid 1px #949494"}
        fontSize={"14px"}
        fontWeight={"400"}
      />
      {projectsForm.projectsForm.errors.dataInicio &&
        projectsForm.projectsForm.touched.dataInicio && (
          <TextError>{projectsForm.projectsForm.errors.dataInicio}</TextError>
        )}
    </FormControl>
  );
}

export default FormDataInicio;
