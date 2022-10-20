import { Input } from "@chakra-ui/react";

import { getMoney, formatReal } from "utils/regexCoinMask";

export function RealInput(props: {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  maxLength?: number;
  as?: any;
}) {
  const { onChange, id, name, placeholder, maxLength, value, as } = props;

  const valorFormatado = formatReal(getMoney(value || ""));

  return (
    <Input
      isRequired
      h={"56px"}
      placeholder={placeholder}
      type={"text"}
      id={id}
      name={name}
      value={valorFormatado}
      maxLength={maxLength}
      onChange={onChange}
      w={"100%"}
      as={as}
      // onKeyUp={(event) => maskMoney(event)}
    />
  );
}

export default RealInput;
