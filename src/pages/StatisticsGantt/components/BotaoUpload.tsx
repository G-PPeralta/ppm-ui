import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillCloudArrowUpFill } from "react-icons/bs";

import { Button, Flex, Text } from "@chakra-ui/react";

interface Props {
  registerForm: any;
  index: number;
}

function BotaoUploadArquivo({ registerForm, index }: Props) {
  const [arquivoSelecionadoPath, setArquivoSelecionadoPath] = useState("");

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    registerForm.setFieldValue(`mocs[${index}].anexo`, file);
    setArquivoSelecionadoPath(file.name);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      pdf: [".pdf"],
    },
    maxFiles: 1,
    maxSize: 99999999999999,
  });

  return (
    <Flex direction={"row-reverse"} gap={6} align={"center"}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
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
          colorScheme="blue"
          variant="ghost"
          rightIcon={<BsFillCloudArrowUpFill size={24} />}
        >
          Anexar
        </Button>
      </div>
      <Text>{arquivoSelecionadoPath}</Text>
    </Flex>
  );
}

export default BotaoUploadArquivo;
