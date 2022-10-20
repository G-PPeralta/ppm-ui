import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  useEditableControls,
} from "@chakra-ui/react";
import { BudgetDetail } from "interfaces/Budgets";

import RealInput from "components/RealInput/input";

import { formatReal as FormatPrint } from "utils/formatReal";

import { postAatualizarValorPrevisto } from "services/post/Budget";

export default function CampoEditavel(props: { filho: BudgetDetail }) {
  const { planejado, projeto } = props.filho;

  const save = async (valor: string) => {
    const data = {
      valor: +valor,
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
      defaultValue={FormatPrint(planejado)}
      // fontSize="2xl"
      isPreviewFocusable={false}
      onSubmit={save}
    >
      <Flex>
        <EditablePreview />
        {/* Here is the custom input */}
        <RealInput as={EditableInput} value={planejado.toString()} />
        <EditableControls />
      </Flex>
    </Editable>
  );
}
