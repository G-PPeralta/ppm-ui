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
import { Classificacao } from "interfaces/Services";

import { TextError } from "components/TextError";

import { getClassificacao } from "services/get/Projetos";
import { postNovaClassificacao } from "services/post/AdicionarOpcaoSelect";

function FormClassificacao(projectsForm: any) {
  const [classificacaoState, setClassificacaoState] = useState<Classificacao[]>(
    [] as Classificacao[]
  );

  const [loading, setLoading] = useState(true);
  const [novaOpcao, setNovaOpcao] = useState("");

  async function handleGetProjetos() {
    const reqGet = await getClassificacao();

    const dataReq: Classificacao[] = reqGet.data.sort(
      (a: Classificacao, b: Classificacao) =>
        a.classificacao.localeCompare(b.classificacao)
    );

    const outro: Classificacao = {
      id: dataReq.length + 2,
      classificacao: "Outro",
      deletado: false,
    };

    const comOutrosAoFinalArray: Classificacao[] = [...dataReq, outro];

    setClassificacaoState(comOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovo() {
    if (novaOpcao !== "") {
      const novoAdicionado: Classificacao = {
        id: classificacaoState.length + 1,
        classificacao: novaOpcao,
        deletado: false,
      };

      const semOpcaoOutros = classificacaoState.filter(
        (classificacao: Classificacao) =>
          classificacao.classificacao !== "Outro"
      );

      const comNovaOpcao: Classificacao[] = [...semOpcaoOutros, novoAdicionado];

      const outro: Classificacao = {
        id: comNovaOpcao.length + 2,
        classificacao: "Outro",
        deletado: false,
      };

      const novoState = [...comNovaOpcao, outro];

      setClassificacaoState(novoState);
      setNovaOpcao("");

      projectsForm.projectsForm.values.tipoProjetoId = novoAdicionado.id;

      postNovaClassificacao(novoAdicionado);
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
          <FormLabel htmlFor="classificacaoId">CLASSIFICAÇÃO</FormLabel>
          {Number(projectsForm.projectsForm.values.classificacaoId) ===
          classificacaoState[classificacaoState.length - 1].id ? (
            <>
              <Flex alignItems={"center"}>
                <Input
                  isRequired
                  placeholder="Adicione o classificacao"
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
              id="classificacaoId"
              name="classificacaoId"
              value={projectsForm.projectsForm.values.classificacaoId}
              onChange={projectsForm.projectsForm.handleChange}
              w={"95%"}
              placeholder="Selecione"
            >
              {classificacaoState.map((classificacao) => (
                <option key={classificacao.id} value={classificacao.id}>
                  {classificacao.classificacao}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
      {projectsForm.projectsForm.errors.classificacaoId &&
        projectsForm.projectsForm.touched.classificacaoId && (
          <TextError>
            {projectsForm.projectsForm.errors.classificacaoId}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormClassificacao;
