import { useEffect, useState } from 'react';

import { Box, FormLabel, Input } from '@chakra-ui/react';

function FormDisabledCoordenador(projectsForm: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <Box>
          <FormLabel htmlFor={'coordenador'}>COORDENADOR</FormLabel>
          <Input
            disabled
            placeholder=""
            id={'coordenador'}
            type={'coordenador'}
            name={'coordenador'}
            value={projectsForm.projectsForm.values.coordenador}
            w={'100%'}
          />
        </Box>
      )}
    </>
  );
}

export default FormDisabledCoordenador;
