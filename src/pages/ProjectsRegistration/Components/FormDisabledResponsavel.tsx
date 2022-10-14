import { useEffect, useState } from "react";

import { Box, FormLabel, Input } from "@chakra-ui/react";

function FormDisabledResponsavel(projectsForm: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <Box>
          <FormLabel
            // style={{ fontSize: "12px", color: "#A7A7A7" }}
            color={"#949494"}
            fontWeight={"700"}
            fontSize={"12px"}
            htmlFor={"responsavel"}
          >
            RESPONSÁVEL
          </FormLabel>
          <Input
            disabled
            placeholder=""
            id={"responsavel"}
            type={"responsavel"}
            name={"responsavel"}
            value={projectsForm.projectsForm.values.responsavel}
            w={"100%"}
            style={{ color: "black", fontSize: "14px" }}
            _placeholder={{ color: "black" }}
          />
        </Box>
      )}
    </>
  );
}

export default FormDisabledResponsavel;
