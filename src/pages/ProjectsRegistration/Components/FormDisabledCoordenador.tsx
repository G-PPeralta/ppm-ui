import { useEffect, useState } from 'react';

import { Box, FormLabel, Input } from '@chakra-ui/react';

function FormDisabledCoordenador(projectsForm: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading &&
        projectsForm.projectsForm.values.coordenadores.map(
          (_coordenador: string, index: number) => (
            <Box key={index}>
              <FormLabel htmlFor={`coordenador${index}`}>
                COORDENADOR {index + 1}
              </FormLabel>
              <Input
                disabled
                placeholder=""
                id={`coordenador${index}`}
                type={`coordenador${index}`}
                name={`coordenador${index}`}
                value={
                  projectsForm.projectsForm.values.coordenadores[index]
                    .coordenadorNome
                }
                w={'100%'}
              />
            </Box>
          ),
        )}
    </>
  );
}

export default FormDisabledCoordenador;
