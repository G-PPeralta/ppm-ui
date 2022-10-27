import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

function DatePicker({ setDate, data, label, required }: any) {
  // const [dataMin, setDataMin] = useState<any>("");

  const TriggerDatePickerInicio = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        h={"56px"}
        onClick={onClick}
        ref={ref}
        w={{ sm: "100%", md: "232px" }}
        fontSize={"14px"}
        fontWeight={"400"}
        _placeholder={{ color: "#2D2926" }}
        variant="outline"
        borderRadius={"8px"}
        color="#949494"
        textColor={"gray.600"}
        justifyContent={"space-between"}
        rightIcon={<FaRegCalendarAlt color="#2D2926" size={"20px"} />}
        px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
        minW={useBreakpointValue({ base: "180px", sm: "180px", md: "220px" })}
      >
        {value === "" ? "Selecione a data" : value}
      </Button>
    )
  );

  return (
    <Flex direction={"column"}>
      <Flex gap={1}>
        {required && <RequiredField />}
        <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
          {label}
        </Text>
      </Flex>
      <ReactDatePicker
        selected={data}
        // minDate={dataMin}
        onChange={(date) => setDate(date)}
        // locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        customInput={<TriggerDatePickerInicio />}
        // isClearable={dataInicio !== ""}
      />
    </Flex>
  );
}

export default DatePicker;
