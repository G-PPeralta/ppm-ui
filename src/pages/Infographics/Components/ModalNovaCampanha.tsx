//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Modal campanha de intervenção

import { useEffect, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import LoadingButton from "components/LoadingButton";
import SelectFiltragemLocal from "components/SelectFiltragemLocal";

import { useToast } from "contexts/Toast";

import { useAuth } from "hooks/useAuth";

import { postNovaCampanhaRQ } from "services/react-query/campanhasCRUD";
import { getAllSondasOperacaoRQ } from "services/react-query/sondasCRUD";

interface Props {
  refetch: Function;
}

function ModalNovaCampanha({ refetch }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [optionsServicoSonda, setOptionsServicoSonda] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>({
    sondaSelecionada: {
      value: "",
      label: "",
    },
    dsc_comentario: "",
    nova_campanha: false,
  });

  const reqGetProjetosSelectFeriado = useQuery({
    queryKey: ["sonda"],
    queryFn: getAllSondasOperacaoRQ,
  });

  const reqPostCadastroCampanhaRQ = useMutation({
    mutationFn: postNovaCampanhaRQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campanha"] });
      refetch();
      setIsButtonLoading(false);
      toast.success(`Campanha cadastrada com sucesso!`, {
        id: "toast-principal",
      });
      onClose();
    },
    onError: () => {
      setIsButtonLoading(false);
      toast.error(`Erro ao cadastrar campanha!`, {
        id: "toast-principal",
      });
      onClose();
    },
  });

  const handleClickCadastrar = () => {
    setIsButtonLoading(true);

    const payload: any = {
      nom_usu_create: user?.nome,
      id_projeto: formValues.sondaSelecionada.label,
      dsc_comentario: formValues.dsc_comentario,
      nova_campanha: formValues.nova_campanha,
    };

    reqPostCadastroCampanhaRQ.mutate(payload);

    setFormValues({
      sondaSelecionada: {
        value: "",
        label: "",
      },
      dsc_comentario: "",
      nova_campanha: false,
    });
  };

  const handleCloseModal = () => {
    setFormValues({
      sondaSelecionada: {
        value: "",
        label: "",
      },
      dsc_comentario: "",
      nova_campanha: false,
    });
    onClose();
  };

  const handleSelectSonda = (value: any) => {
    setFormValues({ ...formValues, sondaSelecionada: value });
  };

  const isButtonDisabled =
    formValues.id_projeto === "" || formValues.dsc_comentario === "";

  useEffect(() => {
    if (formValues.sondaSelecionada.label.split("-")[0] === "0 ") {
      setFormValues({ ...formValues, nova_campanha: true });
    } else {
      setFormValues({ ...formValues, nova_campanha: false });
    }
  }, [formValues.sondaSelecionada]);

  useEffect(() => {
    if (reqGetProjetosSelectFeriado.data) {
      const sondasSorted = reqGetProjetosSelectFeriado.data.sort(
        (a: any, b: any) => a.nom_sonda.localeCompare(b.nom_sonda)
      );
      const opcoesFormatadas = sondasSorted.map((sonda: any) => ({
        value: sonda.nom_sonda,
        label: sonda.nom_sonda,
      }));

      setOptionsServicoSonda(opcoesFormatadas);
    }
  }, [reqGetProjetosSelectFeriado.data]);

  return (
    <>
      <Button variant={"origemBlueOutline"} w={"fit-content"} onClick={onOpen}>
        Nova Campanha
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Cadastrar Nova Campanha
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={"column"} gap={4}>
                <Stack>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    gap={5}
                  >
                    <FormControl>
                      <SelectFiltragemLocal
                        options={optionsServicoSonda}
                        propName={"filtro"}
                        selectLabel={"FILTRAR POÇOS POR CAMPO:"}
                        value={formValues.sondaSelecionada}
                        onChangeFunction={handleSelectSonda}
                      />
                    </FormControl>
                  </Flex>
                </Stack>

                <Stack>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "column",
                    })}
                    gap={2}
                  >
                    <Flex direction={"column"}>
                      <Flex gap={1}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={"12px"}
                          color={"#949494"}
                        >
                          COMENTÁRIOS
                        </Text>
                      </Flex>
                      <Textarea
                        _placeholder={{ color: "#949494" }}
                        fontSize={"14px"}
                        fontWeight={"400"}
                        color={"black"}
                        isRequired
                        placeholder="Adicione comentários sobre a campanha"
                        id="dsc_comentario"
                        name="dsc_comentario"
                        value={formValues.dsc_comentario}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            dsc_comentario: e.target.value,
                          })
                        }
                        maxLength={255}
                      />
                    </Flex>
                  </Flex>
                </Stack>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant={"origemRedSolid"}
                onClick={() => handleCloseModal()}
              >
                <Text fontSize="18px" fontWeight={"700"} mx={12}>
                  Cancelar
                </Text>
              </Button>
              <Button
                variant={"origemBlueSolid"}
                disabled={isButtonDisabled}
                onClick={() => handleClickCadastrar()}
              >
                {isButtonLoading ? (
                  <LoadingButton />
                ) : (
                  <Text fontSize="18px" fontWeight={"700"} mx={12}>
                    Cadastrar
                  </Text>
                )}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalNovaCampanha;
