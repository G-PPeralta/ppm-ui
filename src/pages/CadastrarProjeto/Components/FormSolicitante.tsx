//  CRIADO EM: 07/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Input de solicitante.

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
import { Solicitante } from "interfaces/Services";

import { TextError } from "components/TextError";

import { getSolicitante } from "services/get/Projetos";
import { postNovoSolicitante } from "services/post/AdicionarOpcaoSelect";

function FormSolicitante(projectsForm: any) {
  const [solicitanteState, setSolicitanteState] = useState<Solicitante[]>(
    [] as Solicitante[]
  );
  const [loading, setLoading] = useState(true);
  const [novoSolicitante, setNovoSolicitante] = useState("");

  async function handleGetProjetos() {
    const reqGet = await getSolicitante();

    const dataReq: Solicitante[] = reqGet.data.sort(
      (a: Solicitante, b: Solicitante) =>
        a.solicitante.localeCompare(b.solicitante)
    );

    const outro: Solicitante = {
      id: dataReq.length + 2,
      solicitante: "Outro",
      deletado: false,
    };

    const polosComOutrosAoFinalArray: Solicitante[] = [...dataReq, outro];

    setSolicitanteState(polosComOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovoSolicitante() {
    if (novoSolicitante !== "") {
      const novoSolicitanteAdicionado: Solicitante = {
        id: solicitanteState.length + 1,
        solicitante: novoSolicitante,
        deletado: false,
      };

      const solicitanteSemOpcaoOutros = solicitanteState.filter(
        (solicitante: Solicitante) => solicitante.solicitante !== "Outro"
      );

      const solicitanteComNovaOpcao: Solicitante[] = [
        ...solicitanteSemOpcaoOutros,
        novoSolicitanteAdicionado,
      ];

      const outro: Solicitante = {
        id: solicitanteComNovaOpcao.length + 2,
        solicitante: "Outro",
        deletado: false,
      };

      const novoSolicitanteState = [...solicitanteComNovaOpcao, outro];

      setSolicitanteState(novoSolicitanteState);
      setNovoSolicitante("");

      projectsForm.projectsForm.values.poloId = novoSolicitanteAdicionado.id;

      postNovoSolicitante(novoSolicitanteAdicionado);
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
            color={"#949494"}
            fontWeight={"700"}
            fontSize={"12px"}
            htmlFor="solicitanteId"
          >
            SOLICITANTE
          </FormLabel>
          {Number(projectsForm.projectsForm.values.solicitanteId) ===
          solicitanteState[solicitanteState.length - 1].id ? (
            <>
              <Flex alignItems={"center"}>
                <Input
                  isRequired
                  placeholder="Adicione o solicitante"
                  id="addSolicitante"
                  type="text"
                  name="addSolicitante"
                  value={novoSolicitante}
                  onChange={(e) => setNovoSolicitante(e.target.value)}
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
                  onClick={handleNovoSolicitante}
                />
              </Flex>
            </>
          ) : (
            <Select
              id="solicitanteId"
              name="solicitanteId"
              value={projectsForm.projectsForm.values.solicitanteId}
              onChange={projectsForm.projectsForm.handleChange}
              placeholder="Selecione"
              mt={"-9px"}
              h={"56px"}
              w={"100%"}
              fontSize={"14px"}
              fontWeight={"400"}
            >
              {solicitanteState.map((solicitante) => (
                <option key={solicitante.id} value={solicitante.id}>
                  {solicitante.solicitante}
                </option>
              ))}
            </Select>
          )}
        </>
      )}

      {projectsForm.projectsForm.errors.solicitanteId &&
        projectsForm.projectsForm.touched.solicitanteId && (
          <TextError>
            {projectsForm.projectsForm.errors.solicitanteId}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormSolicitante;
