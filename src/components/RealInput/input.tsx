import { /* useRef, */ useState } from "react";

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

// import { formatReal } from "utils/formatReal";
import { regexSomenteNumeros } from "utils/regex";

export function RealInput(props: {
  onChange: any;
  id: string;
  name: string;
  placeholder: string;
  value: string;
}) {
  const { onChange, id, name, placeholder } = props;
  const [valor, setValor] = useState("");
  // const [display, setDisplay] = useState("");
  // const [, /* focus */ setFocus] = useState("");
  // const ref = useRef(null);
  const format = (val: string) => "R$" + val;
  const parse = (val: string) => regexSomenteNumeros(val);

  /* const handleChangeEvent = (e) => {
    const r = /\d/;
    if (!r.test(e.key)) {
      e.preventDefault();
    }
    let dirtyValue = "";
    if (e.key == "Backspace") {
      const str = e.target.value;

      dirtyValue = str.substring(0, str.length - 1);
    } else {
      dirtyValue =
        (+regexSomenteNumeros(e.target.value) / 100).toString() + e.key;
    }

    console.log(dirtyValue);
    const valor = +regexSomenteNumeros(dirtyValue) || 0;
    console.log(formatReal(+valor));

    setDisplay(formatReal(+valor));
    setValor(valor);
    // onChange(valor);
  }; */

  /* const handleChangeSubmitEvent = (e: any) => {
    const dirtyValue = e.target.value;
    const valor = +regexSomenteNumeros(dirtyValue) || 0;
    // console.log(formatReal(+valor));

    setDisplay(formatReal(+valor));
    // setValor(valor);
  };

  const handleFocus = () => {
    setFocus(display);
    setDisplay("");
  }; */
  return (
    <>
      <NumberInput
        isRequired
        onChange={(valueString) => {
          setValor(parse(valueString));
          onChange(valueString);
        }}
        value={format(valor)}
        id={id}
        name={name}
        placeholder={placeholder}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      d
    </>
  );
}

export default RealInput;
