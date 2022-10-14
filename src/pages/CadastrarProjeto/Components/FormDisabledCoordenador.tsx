import { useEffect, useState } from "react";

import { Box, FormLabel, Input } from "@chakra-ui/react";

function FormDisabledCoordenador(projectsForm: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <Box>
          <FormLabel
            color={"#949494"}
            fontWeight={"700"}
            fontSize={"12px"}
            htmlFor={"coordenador"}
          >
            COORDENADOR
          </FormLabel>
          <Input
            disabled
            placeholder=""
            id={"coordenador"}
            type={"coordenador"}
            name={"coordenador"}
            value={projectsForm.projectsForm.values.coordenador}
            mt={"-9px"}
            maxLength={40}
            fontSize={"14px"}
            fontWeight={"400"}
            w={"100%"}
            border={"1px solid #949494"}
            h={"56px"}
            style={{ color: "black", fontSize: "14px" }}
            _placeholder={{ color: "black" }}
            color={"black"}
          />
        </Box>
      )}
    </>
  );
}

export default FormDisabledCoordenador;
