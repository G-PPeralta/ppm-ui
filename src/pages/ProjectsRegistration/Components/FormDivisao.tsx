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
import { Divisao } from "interfaces/Services";

import { TextError } from "components/TextError";

import { getDivisao } from "services/get/Projetos";
import { postNovaDivisao } from "services/post/AdicionarOpcaoSelect";

function FormDivisao(projectsForm: any) {
  const [divisaoState, setDivisaoState] = useState<Divisao[]>([] as Divisao[]);

  const [loading, setLoading] = useState(true);
  const [novaOpcao, setNovaOpcao] = useState("");

  async function handleGetProjetos() {
    const reqGet = await getDivisao();

    const dataReq: Divisao[] = reqGet.data.sort((a: Divisao, b: Divisao) =>
      a.divisao.localeCompare(b.divisao)
    );

    const outro: Divisao = {
      id: dataReq.length + 2,
      divisao: "Outro",
      deletado: false,
    };

    const comOutrosAoFinalArray: Divisao[] = [...dataReq, outro];

    setDivisaoState(comOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovo() {
    if (novaOpcao !== "") {
      const novoAdicionado: Divisao = {
        id: divisaoState.length + 1,
        divisao: novaOpcao,
        deletado: false,
      };

      const semOpcaoOutros = divisaoState.filter(
        (divisao: Divisao) => divisao.divisao !== "Outro"
      );

      const comNovaOpcao: Divisao[] = [...semOpcaoOutros, novoAdicionado];

      const outro: Divisao = {
        id: comNovaOpcao.length + 2,
        divisao: "Outro",
        deletado: false,
      };

      const novoState = [...comNovaOpcao, outro];

      setDivisaoState(novoState);
      setNovaOpcao("");

      projectsForm.projectsForm.values.divisaoId = novoAdicionado.id;

      postNovaDivisao(novoAdicionado);
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
          <FormLabel htmlFor="divisaoId">DIVISÃO</FormLabel>
          {Number(projectsForm.projectsForm.values.divisaoId) ===
          divisaoState[divisaoState.length - 1].id ? (
            <>
              <Flex alignItems={"center"}>
                <Input
                  isRequired
                  placeholder="Adicione a divisão"
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
              id="divisaoId"
              name="divisaoId"
              value={projectsForm.projectsForm.values.divisaoId}
              onChange={projectsForm.projectsForm.handleChange}
              w={"95%"}
            >
              {divisaoState.map((divisao) => (
                <option key={divisao.id} value={divisao.id}>
                  {divisao.divisao}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
      {projectsForm.projectsForm.errors.divisaoId &&
        projectsForm.projectsForm.touched.divisaoId && (
          <TextError>{projectsForm.projectsForm.errors.divisaoId}</TextError>
        )}
    </FormControl>
  );
}

export default FormDivisao;
