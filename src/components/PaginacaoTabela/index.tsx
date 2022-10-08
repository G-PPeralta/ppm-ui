import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

import { Flex, IconButton, Select, Text } from "@chakra-ui/react";

interface FromTo {
  from: number;
  to: number;
  setFrom: React.Dispatch<React.SetStateAction<number>>;
  setTo: React.Dispatch<React.SetStateAction<number>>;
}

interface Props {
  data: any;
  fromTo: FromTo;
}

function PaginacaoTabela({ data, fromTo }: Props) {
  const { from, to, setFrom, setTo } = fromTo;

  const [pagAtual, setPagAtual] = useState(1);
  const [perPage, setPerPage] = useState<number>(5);

  const innerWidth = window.innerWidth;

  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / perPage);

  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * perPage;
    const y = (pag - 1) * perPage + perPage;
    setFrom(x);
    setTo(y);
  };

  const changePerPage = (value: number) => {
    setPerPage(value);
    const x = perPage;
    const y = perPage + perPage;
    setFrom(x);
    setTo(y);
  };

  const advance = () => {
    if (pagAtual == maxPage) {
      return;
    }

    const pag = pagAtual + 1;

    paginate(pag);
  };

  const back = () => {
    if (pagAtual == 1) {
      return;
    }
    const pag = pagAtual - 1;
    paginate(pag);
  };

  useEffect(() => {
    paginate(pagAtual);
  }, [from, to]);

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={innerWidth > 428 ? "end" : "center"}
        gap={2}
        flex={1}
        wrap={innerWidth > 428 ? "nowrap" : "wrap"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"14px"}>Per page:</Text>
          <Select
            h={"32px"}
            w={"120px"}
            onChange={(e) => changePerPage(+e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Select>

          <Text fontSize={"14px"}>
            {from === 0 ? "1" : from} - {to} de {data.length}
          </Text>
        </Flex>
        <Flex gap={2}>
          <IconButton
            aria-label=""
            icon={<FiChevronsLeft />}
            onClick={() => paginate(1)}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />
          <IconButton
            aria-label=""
            icon={<FiChevronLeft onClick={back} />}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />

          <IconButton
            aria-label=""
            icon={<FiChevronRight />}
            onClick={advance}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />
          <IconButton
            aria-label=""
            icon={<FiChevronsRight />}
            onClick={() => paginate(maxPage)}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default PaginacaoTabela;
