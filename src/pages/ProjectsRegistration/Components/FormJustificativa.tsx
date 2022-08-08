import {
  FormControl,
  FormLabel,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormJustificativa(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="justificativa">JUSTIFICATIVA</FormLabel>
      <Textarea
        isRequired
        placeholder="Sistema necessário para medição e entrega de gás."
        id="justificativa"
        name="justificativa"
        value={projectsForm.projectsForm.values.justificativa}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      />
      {projectsForm.projectsForm.errors.justificativa &&
        projectsForm.projectsForm.touched.justificativa && (
          <TextError>
            {projectsForm.projectsForm.errors.justificativa}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormJustificativa;
