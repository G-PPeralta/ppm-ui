import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCloudArrowUpFill } from "react-icons/bs";

import { Button, Flex, IconButton, Text } from "@chakra-ui/react";

interface Props {
  registerForm: any;
  index: number;
  nomeArquivo: string;
  propName: string;
}

function BotaoUploadArquivo({
  registerForm,
  index,
  nomeArquivo,
  propName,
}: Props) {
  const [nomeArquivoSelecionado, setNomeArquivoSelecionado] =
    useState(nomeArquivo);
  const [arquivoSelecionado, setArquivoSelecionado] = useState("");

  const handleNomeArquivo = (nomeArquivo: string) =>
    nomeArquivo.replace(/\s/g, "_");

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setArquivoSelecionado(file.name);
    if (propName === "anexo") {
      const nomeArquivo = `${registerForm.values.id_poco}_${
        registerForm.values.id_sonda
      }_${handleNomeArquivo(registerForm.values.ocorrencia)}.pdf`;
      const fileRenomeado = new File([file], nomeArquivo, {
        type: file.type,
      });
      registerForm.setFieldValue(
        `${propName}[${index}].arquivo`,
        fileRenomeado
      );
      registerForm.setFieldValue(
        `${propName}[${index}].anexo`,
        fileRenomeado.name
      );
    } else if (propName === "mocs") {
      const nomeArquivo = `MOC_${registerForm.values.id_atividade}_${registerForm.values[propName][index].numero_moc}.pdf`;
      const fileRenomeado = new File([file], nomeArquivo, {
        type: file.type,
      });
      registerForm.setFieldValue(
        `${propName}[${index}].arquivo`,
        fileRenomeado
      );
      registerForm.setFieldValue(
        `${propName}[${index}].anexo`,
        fileRenomeado.name
      );
    } else {
      const nomeArquivo = `APR_${registerForm.values.id_atividade}_${registerForm.values[propName][index].codigo_apr}.pdf`;
      const fileRenomeado = new File([file], nomeArquivo, {
        type: file.type,
      });
      registerForm.setFieldValue(
        `${propName}[${index}].arquivo`,
        fileRenomeado
      );
      registerForm.setFieldValue(
        `${propName}[${index}].anexo`,
        fileRenomeado.name
      );
    }
    setNomeArquivoSelecionado(file.name);
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

  const handleClick = async () => {
    try {
      if (arquivoSelecionado.length === 0) {
        const nomeArquivoSemExtensao = nomeArquivo.split(".")[0];
        const url = `${process.env.REACT_APP_API_URL}pdf/${nomeArquivoSemExtensao}`;
        registerForm.setFieldValue(`${propName}[${index}].url`, url);
        registerForm.setFieldValue(`${propName}[${index}].isOpen`, true);
      } else {
        toast.error(
          "A pré visualização do arquivo só é possível para arquivos cadastrados anteriormente."
        );
      }
    } catch (error) {
      toast.error("Erro ao abrir arquivo");
    }
  };

  return (
    <Flex direction={"column"} gap={6}>
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
        {nomeArquivoSelecionado !== "" && (
          <Flex gap={1} align={"center"}>
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
                size: "sm",
              }}
              icon={<AiFillCloseCircle size={16} />}
              onClick={() => {
                registerForm.setFieldValue(
                  `[${propName}][${index}].arquivo`,
                  ""
                );
                registerForm.setFieldValue(`[${propName}][${index}].anexo`, "");
                setNomeArquivoSelecionado("");
              }}
            />
            <Text
              fontSize={"12px"}
              fontWeight={"semibold"}
              cursor={"pointer"}
              onClick={() => {
                handleClick();
              }}
            >
              {nomeArquivoSelecionado}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default BotaoUploadArquivo;
