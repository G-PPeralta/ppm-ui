import { useEffect, useState } from 'react';

import { Box, FormLabel, Input } from '@chakra-ui/react';

function FormDisabledResponsavel(projectsForm: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <Box>
          <FormLabel htmlFor={'responsavel'}>RESPONSÁVEL</FormLabel>
          <Input
            disabled
            placeholder=""
            id={'responsavel'}
            type={'responsavel'}
            name={'responsavel'}
            value={projectsForm.projectsForm.values.responsavel}
            w={'100%'}
          />
        </Box>
      )}
    </>
  );
}

export default FormDisabledResponsavel;
