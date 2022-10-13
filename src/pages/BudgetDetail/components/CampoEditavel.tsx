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
  const { planejado, projeto } = props.filho;

  const save = async (valor: string) => {
    const data = {
      valor,
      atividadeId: projeto.id,
    };
    const { status } = await postAatualizarValorPrevisto(data);

    if (status == 200 || status == 201) {
      location.reload();
    }
  };

  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
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
        size="sm"
        icon={<FiEdit />}
        {...getEditButtonProps()}
      />
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={formatReal(planejado)}
      // fontSize="2xl"
      isPreviewFocusable={false}
      onSubmit={save}
    >
      <Flex>
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} type="number" />
        <EditableControls />
      </Flex>
    </Editable>
  );
}
