import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";

import { Flex, IconButton, Text } from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

interface Props {
  arquivoPdf: File;
}

function LeitorPDF({ arquivoPdf }: Props) {
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
    <Flex
      border={"1px"}
      borderColor={"origem.500"}
      borderRadius={"md"}
      direction={"column"}
      align={"center"}
      justify={"center"}
      p={5}
    >
      <Document
        file={{ url: arquivoPdf }}
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
  );
}

export default LeitorPDF;
