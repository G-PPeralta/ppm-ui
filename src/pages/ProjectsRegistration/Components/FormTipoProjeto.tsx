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
import { TipoProjeto } from "interfaces/Services";

import { TextError } from "components/TextError";

import { getTipoProjeto } from "services/get/Projetos";
import { postNovoTipoProjeto } from "services/post/AdicionarOpcaoSelect";

function FormTipoProjeto(projectsForm: any) {
  const [tipoProjetoState, setTipoProjetoState] = useState<TipoProjeto[]>(
    [] as TipoProjeto[]
  );

  const [loading, setLoading] = useState(true);
  const [novaOpcao, setNovaOpcao] = useState("");

  async function handleGetProjetos() {
    const reqGet = await getTipoProjeto();

    const dataReq: TipoProjeto[] = reqGet.data.sort(
      (a: TipoProjeto, b: TipoProjeto) => a.tipo.localeCompare(b.tipo)
    );

    const outro: TipoProjeto = {
      id: dataReq.length + 2,
      tipo: "Outro",
      deletado: false,
    };

    const comOutrosAoFinalArray: TipoProjeto[] = [...dataReq, outro];

    setTipoProjetoState(comOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovo() {
    if (novaOpcao !== "") {
      const novoAdicionado: TipoProjeto = {
        id: tipoProjetoState.length + 1,
        tipo: novaOpcao,
        deletado: false,
      };

      const semOpcaoOutros = tipoProjetoState.filter(
        (tipo: TipoProjeto) => tipo.tipo !== "Outro"
      );

      const comNovaOpcao: TipoProjeto[] = [...semOpcaoOutros, novoAdicionado];

      const outro: TipoProjeto = {
        id: comNovaOpcao.length + 2,
        tipo: "Outro",
        deletado: false,
      };

      const novoState = [...comNovaOpcao, outro];

      setTipoProjetoState(novoState);
      setNovaOpcao("");

      projectsForm.projectsForm.values.tipoProjetoId = novoAdicionado.id;

      postNovoTipoProjeto(novoAdicionado);
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
            style={{ fontSize: "12px", color: "#A7A7A7" }}
            htmlFor="tipoProjetoId"
          >
            TIPO
          </FormLabel>
          {Number(projectsForm.projectsForm.values.tipoProjetoId) ===
          tipoProjetoState[tipoProjetoState.length - 1].id ? (
            <>
              <Flex alignItems={"center"}>
                <Input
                  isRequired
                  placeholder="Adicione o tipo"
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
              id="tipoProjetoId"
              name="tipoProjetoId"
              value={projectsForm.projectsForm.values.tipoProjetoId}
              onChange={projectsForm.projectsForm.handleChange}
              w={"95%"}
              placeholder="Selecione"
              style={{ color: "#A7A7A7", fontSize: "14px" }}
            >
              {tipoProjetoState.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.tipo}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
      {projectsForm.projectsForm.errors.tipoProjetoId &&
        projectsForm.projectsForm.touched.tipoProjetoId && (
          <TextError>
            {projectsForm.projectsForm.errors.tipoProjetoId}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormTipoProjeto;
