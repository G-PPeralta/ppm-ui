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
            style={{ fontSize: "12px", color: "#A7A7A7" }}
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
            style={{ color: "#A7A7A7", fontSize: "14px" }}
          />
        </Box>
      )}
    </>
  );
}

export default FormDisabledResponsavel;
