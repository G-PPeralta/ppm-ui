import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";

import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { regexCaracteresEspeciais } from "utils/regex";

import { useFinanceiroProjetos } from "hooks/useFinanceiroProjetos";

import Tabela from "./Components/Tabela";

export function FinanceiroProjetos() {
  const { loading } = useFinanceiroProjetos();
  const [allData, setAllData] = useState<any[]>([]);
  const [filter, setFilter] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const mockData = [
    {
      idProjeto: 1,
      projeto: "Carteira de Projeto",
      elementoPep: "OGAL.P0029.FS",
      denominacaoDeObjeto: "40. PAL- Automação dos poços IeA",
      mes: "06",
      textoDoPedido: 'Tê reto WPB DN8x8x8" sch 40',
      totalPrevisto: 30000.4,
      totalRealizado: 30000.4,
      custoRealizado: [
        {
          idCusto: 1,
          prestadorDeServico: "Prestador de Serviço",
          classeDoServico: "Classe do Serviço",
          dataPagamento: "01/01/2021",
          previsto: 10000.4,
          realizado: 10000.4,
          descricaoDoServico: "Descrição do Serviço",
        },
        {
          idCusto: 2,
          prestadorDeServico: "Prestador de Serviço",
          classeDoServico: "Classe do Serviço",
          dataPagamento: "01/01/2021",
          previsto: 10000,
          realizado: 10000,
          descricaoDoServico: "Descrição do Serviço",
        },
        {
          idCusto: 3,
          prestadorDeServico: "Prestador de Serviço",
          classeDoServico: "Classe do Serviço",
          dataPagamento: "01/01/2021",
          previsto: 10000,
          realizado: 10000,
          descricaoDoServico: "Descrição do Serviço",
        },
      ],
    },
  ];

  const handleGetAllData = async () => {
    setAllData(mockData);
    setFilter(mockData);
  };

  const filterData = (search: string) => {
    let filtered;
    if (search && search.length > 1) {
      filtered = allData?.filter(
        (searched) =>
          searched.projeto.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          searched.elementoPep.toLowerCase().indexOf(search.toLowerCase()) > -1
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
                <Button
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
                </Button>
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
