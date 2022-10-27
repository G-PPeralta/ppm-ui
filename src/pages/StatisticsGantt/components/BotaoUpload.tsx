import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { BsFillCloudArrowUpFill } from "react-icons/bs";

import { Button, Flex, Text } from "@chakra-ui/react";

interface Props {
  registerForm: any;
  index: number;
}

function BotaoUploadArquivo({ registerForm, index }: Props) {
  const [arquivoSelecionadoPath, setArquivoSelecionadoPath] = useState("");

  const onDrop = (acceptedFiles: any) => {
    // console.log("acceptedFiles", acceptedFiles);
    const nomeArquivo = acceptedFiles[0].name;
    const extensaoArquivo = nomeArquivo.split(".")[1];
    const novoNomeArquivo = `${registerForm.values.id_atividade}_${registerForm.values.mocs[index].numero_moc}.${extensaoArquivo}`;
    const novoArquivo = new File([acceptedFiles[0]], novoNomeArquivo, {
      type: acceptedFiles[0].type,
    });
    registerForm.setFieldValue(`mocs[${index}].arquivo`, novoArquivo);
    setArquivoSelecionadoPath(novoArquivo.name);

    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      registerForm.setFieldValue(`mocs[${index}].anexo`, base64);
    };

    reader.onerror = (_error) => {
      toast.error("Erro ao carregar arquivo");
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 99999999999999,
  });

  // console.log("arquivoSelecionadoPath", arquivoSelecionadoPath);

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
