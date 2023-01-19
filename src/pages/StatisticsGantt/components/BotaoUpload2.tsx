//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Subir arquivo

import { useEffect, useState } from "react";
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
  const [arquivoBase64, setArquivoBase64] = useState<any>("");
  const [arquivoSelecionado, setArquivoSelecionado] = useState("");

  const [payloadS3, setPayloadS3] = useState({
    base64data: "" as any,
    path: "",
    fileName: "",
    fileType: "application",
    extension: "pdf",
  });

  const convertToBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  const handleNomeArquivo = (nomeArquivo: string) =>
    nomeArquivo.replace(/\s/g, "_");

  const onDrop = async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const base64 = await convertToBase64(file);
    setArquivoBase64(base64);
    //
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
        arquivoBase64
      );
      registerForm.setFieldValue(
        `${propName}[${index}].anexo`,
        fileRenomeado.name
      );
    } else if (propName === "mocs") {
      const getUrlInS3 =
        registerForm.values[propName][index].arquivoS3.fileName;
      registerForm.setFieldValue(`${propName}[${index}].url`, getUrlInS3);
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
        const getUrlInS3 =
          registerForm.values[propName][index].arquivoS3.fileName;
        registerForm.setFieldValue(`${propName}[${index}].url`, getUrlInS3);
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

  useEffect(() => {
    if (propName === "mocs") {
      setPayloadS3({
        ...payloadS3,
        base64data: arquivoBase64.split(",")[1],
        fileName: nomeArquivoSelecionado.split(".pdf")[0],
        path: "moc",
      });
    } else if (propName === "aprs") {
      setPayloadS3({
        ...payloadS3,
        base64data: arquivoBase64.split(",")[1],
        fileName: nomeArquivoSelecionado.split(".pdf")[0],
        path: "apr",
      });
    }
  }, [arquivoBase64]);

  useEffect(() => {
    registerForm.setFieldValue(`mocs[${index}].arquivoS3`, payloadS3);
  }, [payloadS3]);

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
              {nomeArquivoSelecionado.substring(
                nomeArquivoSelecionado.lastIndexOf("/") + 1
              )}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default BotaoUploadArquivo;
