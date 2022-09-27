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
import { BudgetDetail } from "models/Budget.model";

export default function CampoEditavel(props: { filho: BudgetDetail }) {
  const brl = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

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
      defaultValue={brl.format(props.filho.planejado)}
      // fontSize="2xl"
      isPreviewFocusable={false}
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
