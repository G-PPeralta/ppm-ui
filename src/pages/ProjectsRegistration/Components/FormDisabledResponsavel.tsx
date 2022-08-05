import { useEffect, useState } from 'react';

import { Box, FormLabel, Input } from '@chakra-ui/react';

function FormDisabledResponsavel(projectsForm: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading &&
        projectsForm.projectsForm.values.responsavel.map(
          (_responsavel: string, index: number) => (
            <Box key={index}>
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
              />
            </Box>
          ),
        )}
    </>
  );
}

export default FormDisabledResponsavel;
