//  CRIADO EM: 07/2022
//  AUTOR: Felipe Mateus
//  DESCRIÇÃO DO ARQUIVO: Imput para atualizar valor previsto.

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import { BudgetDetail } from "interfaces/Budgets";

import { formatReal } from "utils/formatReal";

import { postAatualizarValorPrevisto } from "services/post/Budget";

export default function CampoEditavel(props: { filho: BudgetDetail }) {
  const { planejado, projeto, id_projeto } = props.filho;
  const save = async (valor: string) => {
    const data = {
      valor: +valor,
      projetoId: id_projeto,
      atividadeId: projeto.id,
    };
    const { status } = await postAatualizarValorPrevisto(data);

    if (status == 200 || status == 201) {
      location.reload();
    }
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center">
        <IconButton
          aria-label="Send btn"
          icon={<AiFillCheckCircle />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="Close"
          icon={<AiFillCloseCircle />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <IconButton
        aria-label="Edit btn"
        variant={"outline"}
        icon={<FiEdit />}
        {...getEditButtonProps()}
      />
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={formatReal(planejado)}
      isPreviewFocusable={false}
      onSubmit={save}
    >
      <Flex>
        <EditablePreview />
        <Input as={EditableInput} type="number" />
        <EditableControls />
      </Flex>
    </Editable>
  );
}
