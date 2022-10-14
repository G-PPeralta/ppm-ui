import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Gate } from "interfaces/Services";

import { TextError } from "components/TextError";

import { getGate } from "services/get/Projetos";
import { postNovoGate } from "services/post/AdicionarOpcaoSelect";

function FormGate(projectsForm: any) {
  const [gateState, setGateState] = useState<Gate[]>([] as Gate[]);
  const [loading, setLoading] = useState(true);
  const [novaOpcao, setNovaOpcao] = useState("");

  async function handleGetProjetos() {
    const reqGet = await getGate();

    const dataReq: Gate[] = reqGet.data.sort((a: Gate, b: Gate) =>
      a.gate.localeCompare(b.gate)
    );

    const outro: Gate = {
      id: dataReq.length + 2,
      gate: "Outro",
      deletado: false,
    };

    const comOutrosAoFinalArray: Gate[] = [...dataReq, outro];

    setGateState(comOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovo() {
    if (novaOpcao !== "") {
      const novoAdicionado: Gate = {
        id: gateState.length + 1,
        gate: novaOpcao,
        deletado: false,
      };

      const semOpcaoOutros = gateState.filter(
        (gate: Gate) => gate.gate !== "Outro"
      );

      const comNovaOpcao: Gate[] = [...semOpcaoOutros, novoAdicionado];

      const outro: Gate = {
        id: comNovaOpcao.length + 2,
        gate: "Outro",
        deletado: false,
      };

      const novoState = [...comNovaOpcao, outro];

      setGateState(novoState);
      setNovaOpcao("");

      projectsForm.projectsForm.values.gateId = novoAdicionado.id;

      postNovoGate(novoAdicionado);
    }
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      {loading ? (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Ring speed={2} lineWeight={5} color="blue" size={24} />
        </Box>
      ) : (
        <>
          <FormLabel
            fontSize={"12px"}
            fontWeight={"700"}
            color={"#949494"}
            htmlFor="gateId"
          >
            GATE
          </FormLabel>
          {Number(projectsForm.projectsForm.values.gateId) ===
          gateState[gateState.length - 1].id ? (
            <>
              <Flex alignItems={"center"}>
                <Input
                  isRequired
                  placeholder="Adicione o gate"
                  id="add"
                  type="text"
                  name="add"
                  value={novaOpcao}
                  onChange={(e) => setNovaOpcao(e.target.value)}
                  mr={2}
                />
                <IconButton
                  aria-label="Plus sign"
                  icon={<BsPlusLg />}
                  background="origem.300"
                  variant="secondary"
                  color="white"
                  mr={2}
                  isRound={true}
                  size="sm"
                  onClick={handleNovo}
                />
              </Flex>
            </>
          ) : (
            <Select
              id="gateId"
              name="gateId"
              value={projectsForm.projectsForm.values.gateId}
              onChange={projectsForm.projectsForm.handleChange}
              placeholder="Selecione"
              mt={"-9px"}
              h={"56px"}
              w={"100%"}
              fontSize={"14px"}
              fontWeight={"400"}
            >
              {gateState.map((gate) => (
                <option key={gate.id} value={gate.id}>
                  {gate.gate}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
      {projectsForm.projectsForm.errors.gateId &&
        projectsForm.projectsForm.touched.gateId && (
          <TextError>{projectsForm.projectsForm.errors.gateId}</TextError>
        )}
    </FormControl>
  );
}

export default FormGate;
