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
  console.log(
    "🚀 ~ file: index.tsx ~ line 18 ~ FinanceiroProjetos ~ listaFinanceiroProjetos",
    listaFinanceiroProjetos
  );
  const [allData, setAllData] = useState<any[]>(listaFinanceiroProjetos);
  const [filter, setFilter] = useState<any[]>(listaFinanceiroProjetos);
  console.log(
    "🚀 ~ file: index.tsx ~ line 24 ~ FinanceiroProjetos ~ filter",
    filter
  );
  const [search, setSearch] = useState("");

  const handleGetAllData = async () => {
    setAllData(listaFinanceiroProjetos);
    setFilter(listaFinanceiroProjetos);
  };

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

  useEffect(() => {
    handleGetAllData();
  }, []);

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
                mb={4}
                wrap={"wrap"}
                align={"center"}
              >
                <Heading as="h3" size="md" textAlign={"center"}>
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
              <Flex gap={2} align={"end"}>
                <Flex gap={1} direction={"column"}>
                  <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
                    PROJETO OU ELEMENTO PEP
                  </Text>
                  <Input
                    h={"56px"}
                    isRequired
                    placeholder="Projeto ou Elemento PEP"
                    type="text"
                    name="pesquisar"
                    onChange={(event) => handleSearch(event)}
                    maxLength={50}
                  />
                </Flex>
                <Button
                  h={"56px"}
                  borderRadius={"10px"}
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
              <Tabela data={filter} />
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
