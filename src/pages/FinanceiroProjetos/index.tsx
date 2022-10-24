import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
// import { MdCloudUpload } from "react-icons/md";

import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { regexCaracteresEspeciais } from "utils/regex";

import { useRequests } from "hooks/useRequests";

import Tabela from "./Components/Tabela";

export function FinanceiroProjetos() {
  const { loading, listaFinanceiroProjetos } = useRequests();
  const [allData, setAllData] = useState<any[]>(listaFinanceiroProjetos);
  const [filter, setFilter] = useState<any[]>(listaFinanceiroProjetos);
  const [search, setSearch] = useState("");

  const filterData = (search: string) => {
    let filtered;
    if (search && search.length > 1) {
      filtered = allData?.filter(
        (searched) =>
          searched.nomeprojeto.toLowerCase().indexOf(search.toLowerCase()) >
            -1 ||
          searched.elementopep.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    } else {
      filtered = allData;
    }

    if (filtered) {
      setFilter([...filtered]);
    }
  };

  const handleClick = () => {
    filterData(search);
  };

  const handleSearch = (e: any) => {
    const { value } = e.target;
    const regex = regexCaracteresEspeciais(value);
    setSearch(regex);
  };

  const handleGetAllData = () => {
    setAllData(listaFinanceiroProjetos);
    setFilter(listaFinanceiroProjetos);
  };

  useEffect(() => {
    handleGetAllData();
  }, [listaFinanceiroProjetos]);

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
                ml={-3}
                mt={-1}
                justify={"space-between"}
                mb={6}
                wrap={"wrap"}
                align={"center"}
              >
                <Heading
                  fontSize={"24px"}
                  color={"#2D2926"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  textAlign={"center"}
                >
                  Financeiro
                </Heading>
                {/* <Button
                  h={"56px"}
                  borderRadius={"10px"}
                  background={"white"}
                  border={"2px solid"}
                  color={"origem.500"}
                  _hover={{
                    border: "2px solid",
                    borderColor: "origem.500",
                    background: "origem.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  rightIcon={<MdCloudUpload size={24} />}
                >
                  Carregar Planilha
                </Button> */}
              </Flex>
              <Flex gap={4} align={"end"}>
                <Flex direction={"column"} ml={-3} mt={-1} mb={2}>
                  <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"}>
                    PROJETO OU ELEMENTO PEP
                  </Text>
                  <Input
                    // mt={"-5px"}
                    h={"56px"}
                    isRequired
                    fontWeight={"400"}
                    fontSize={"14px"}
                    _placeholder={{ color: "#949494" }}
                    placeholder="Projeto ou elemento PEP"
                    type="text"
                    name="pesquisar"
                    onChange={(event) => handleSearch(event)}
                    maxLength={50}
                  />
                </Flex>
                <Button
                  mb={2}
                  h={"56px"}
                  borderRadius={"8px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  background={"origem.500"}
                  variant="primary"
                  color="white"
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  rightIcon={<AiOutlineSearch size={24} />}
                  onClick={() => handleClick()}
                >
                  Filtrar
                </Button>
              </Flex>
              <Flex ml={-3} mt={-1} mr={-3}>
                {filter && <Tabela data={filter} />}
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
