import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from "@chakra-ui/react";

import AtividadesPorStatus from "./AtividadesPorStatus";
import TotalAtividades from "./TotalAtividades";

function AccordionArea() {
  return (
    <Accordion allowMultiple w={"100%"}>
      <AccordionItem>
        <AccordionButton py={0}>
          <Flex
            w={"100%"}
            justify={"space-between"}
            align={"center"}
            h={"120px"}
          >
            <Flex basis={"100%"} h={"100%"}>
              <Flex
                borderRight={"1px"}
                borderColor={"#E2E8F0"}
                grow={1}
                align={"center"}
                justify={"center"}
                h={"100%"}
              >
                <Text fontSize="lg" mr={5} fontWeight={600}>
                  Area 1
                </Text>
              </Flex>
              <Flex grow={30} align={"center"} justify={"space-around"}>
                <Text fontWeight={600}>0%</Text>
                <TotalAtividades />
                <AtividadesPorStatus />
              </Flex>
            </Flex>
            <Flex grow={1}>
              <AccordionIcon />
            </Flex>
          </Flex>
        </AccordionButton>

        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionArea;
