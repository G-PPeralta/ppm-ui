// import { useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

// import PaginacaoTabela from "components/PaginacaoTabela";
import Sidebar from "components/SideBar";

import { useFinanceiroProjetos } from "hooks/useFinanceiroProjetos";

export function FinanceiroProjetos() {
  const { loading } = useFinanceiroProjetos();

  // const [from, setFrom] = useState<number>(0);
  // const [to, setTo] = useState<number>(5);

  // const fromTo = {
  //   from,
  //   to,
  //   setFrom,
  //   setTo,
  // };

  const header = [
    "ID",
    "Projeto",
    "Elemento PEP",
    "Previsto",
    "Realizado",
    "Denominação de Objeto",
    "Mês",
    "Texto do Pedido",
  ];

  const footer = ["Total", "xx Projeto", "", "xxxxxxx", "xxxxxxxxxx"];

  if (footer && footer.length < header.length) {
    const diferenca = header.length - footer.length;
    for (let index = 0; index < diferenca; index += 1) {
      footer.push("");
    }
  }

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "6" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex
                justify={"space-between"}
                mb={2}
                wrap={"wrap"}
                align={"center"}
              >
                <Heading as="h3" size="md" mb={2} textAlign={"center"}>
                  Financeiro
                </Heading>
              </Flex>
              <Flex direction={"column"} w={"100%"}>
                <TableContainer
                  mt={4}
                  mb={3}
                  borderRadius={"10px"}
                  overflowX={"scroll"}
                >
                  <Table variant="striped" colorScheme={"strippedGray"}>
                    <Thead>
                      <Tr background={"origem.500"}>
                        {header.map((item: string, index: number) => (
                          <Th color="white" textAlign={"center"} key={index}>
                            {item}
                          </Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody scrollBehavior={"smooth"}>{/* {body} */}</Tbody>
                    <Tfoot>
                      <Tr background={"origem.500"}>
                        {footer.map((item: string, index: number) => (
                          <Th color="white" key={index}>
                            {item}
                          </Th>
                        ))}
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
                {/* <PaginacaoTabela data={data} fromTo={fromTo} /> */}
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
