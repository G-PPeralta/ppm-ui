import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormValorTotalPrevisto(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="valorTotalPrevisto">CAPEX PREVISTO</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
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
          w={useBreakpointValue({
            base: '100%',
            md: '95%',
          })}
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
