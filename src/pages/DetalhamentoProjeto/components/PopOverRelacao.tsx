import { useState } from "react";

import {
  Button,
  Checkbox,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";

interface Props {
  registerForm: any;
}

function PopOverRelacao({ registerForm }: Props) {
  // const mock = [
  //   {
  //     id: 1,
  //     checked: false,
  //     nome: "Macro Projeto 1",
  //     atividades: [
  //       {
  //         id: 2,
  //         checked: false,
  //         nome: "Atividade 1",
  //         atividades: [
  //           {
  //             id: 3,
  //             checked: false,
  //             nome: "Atividade 2",
  //           },
  //           {
  //             id: 4,
  //             checked: false,
  //             nome: "Atividade 3",
  //           },
  //           {
  //             id: 3,
  //             checked: false,
  //             nome: "Atividade 4",
  //           },
  //           {
  //             id: 4,
  //             checked: false,
  //             nome: "Atividade 5",
  //           },
  //         ],
  //       },
  //       {
  //         id: 5,
  //         checked: false,
  //         nome: "Atividade 6",
  //         atividades: [
  //           {
  //             id: 6,
  //             checked: false,
  //             nome: "Atividade 7",
  //           },
  //           {
  //             id: 7,
  //             checked: false,
  //             nome: "Atividade 8",
  //           },
  //           {
  //             id: 8,
  //             checked: false,
  //             nome: "Atividade 9",
  //           },
  //           {
  //             id: 9,
  //             checked: false,
  //             nome: "Atividade 10",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  // const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <Popover>
      <PopoverTrigger>
        <Button h={"56px"} variant="outline">
          Selecione
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Selecione a atividade pai</PopoverHeader>
        <PopoverBody>
          <Checkbox
            isChecked={allChecked}
            // isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems([e.target.checked, e.target.checked])
            }
          >
            Parent Checkbox
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1]])
              }
            >
              Child Checkbox 1
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              Child Checkbox 2
            </Checkbox>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PopOverRelacao;
