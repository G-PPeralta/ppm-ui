import { useEffect, useState } from 'react';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function FormDisabledResponsavel(projectsForm: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <FormControl>
      {!loading &&
        projectsForm.projectsForm.values.responsavel.map(
          (_responsavel: string, index: number) => (
            <>
              <FormLabel htmlFor={`responsavel${index}`}>
                RESPONSÁVEL {index + 1}
              </FormLabel>
              <Input
                disabled
                placeholder=""
                id={`responsavel${index}`}
                type={`responsavel${index}`}
                name={`responsavel${index}`}
                value={
                  projectsForm.projectsForm.values.responsavel[index]
                    .nomeResponsavel
                }
                w={'100%'}
                mb={2}
              />
            </>
          ),
        )}
    </FormControl>
  );
}

export default FormDisabledResponsavel;
