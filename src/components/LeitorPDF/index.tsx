import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight, FiPrinter } from "react-icons/fi";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";

import { Button, Flex, IconButton, Text } from "@chakra-ui/react";

interface Props {
  registerForm: any;
  index: number;
  propName: string;
}

function LeitorPDF({ registerForm, index, propName }: Props) {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, []);
  return (
    <>
      {registerForm.values[propName][index].isOpen && (
        <Flex
          border={"1px"}
          borderColor={"origem.500"}
          borderRadius={"md"}
          direction={"column"}
          align={"center"}
          justify={"center"}
          p={5}
          w={"100%"}
        >
          <Flex flex={1} w={"100%"} align={"start"} justify={"space-between"}>
            <IconButton
              isRound
              variant={"ghost"}
              size={"xs"}
              aria-label="Botão excluir anexo"
              color={"red.500"}
              _hover={{
                background: "transparent",
                transition: "all 0.4s",
                color: "red.600",
                size: "md",
              }}
              icon={<AiFillCloseCircle size={24} />}
              onClick={() =>
                registerForm.setFieldValue(
                  `${propName}[${index}].isOpen`,
                  false
                )
              }
            />

            <a
              href={`${registerForm.values[propName][index]?.anexo}`}
              download
              target="_blank"
              rel="noreferrer"
            >
              <Button
                h={"56px"}
                borderRadius={"10px"}
                background={"white"}
                color={"origem.500"}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                rightIcon={<FiPrinter />}
              >
                Exportar
              </Button>
            </a>
          </Flex>

          <Document
            file={{
              url: registerForm.values[propName][index]?.anexo,
            }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>

          <Flex justify={"center"} gap={4} w={"100%"}>
            <IconButton
              aria-label=""
              icon={<FiChevronLeft onClick={handlePreviousPage} />}
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
            <Text>
              Página {pageNumber} de {numPages}
            </Text>
            <IconButton
              aria-label=""
              icon={<FiChevronRight />}
              onClick={handleNextPage}
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
      )}
    </>
  );
}

export default LeitorPDF;
