import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCloudArrowUpFill } from "react-icons/bs";

import { Button, Flex, IconButton, Text } from "@chakra-ui/react";

import { useToast } from "contexts/Toast";

import { uploadArquivoS3 } from "services/post/Upload";

interface Props {
  registerForm: any;
  index: number;
  propName: "mocs" | "aprs";
  keyName: "numero_moc" | "codigo_apr";
}

function BotaoUploadArquivo({ registerForm, index, propName, keyName }: Props) {
  const { toast } = useToast();

  const [payload, setPayload] = useState({
    base64data: "" as any, // base64 da imagem
    path: "", // moc OU apr
    fileName: "", // tanto faz
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

  const onDrop = async (acceptedFiles: any) => {
    const arquivo = acceptedFiles[0];

    const nomeArquivo = `${arquivo.name.split(".pdf")[0]}`;

    // Converter arquivo para base64
    const base64: any = await convertToBase64(arquivo);

    // Setar payload para envio ao S3
    setPayload({
      ...payload,
      base64data: base64.split(",")[1],
      fileName: nomeArquivo,
      path: `moc_${registerForm.values.id_atividade}_${registerForm.values[propName][index][keyName]}`,
    });
  };

  // Formatação do nome do arquivo recebido pelo backend:
  const respostaBackend = registerForm.values[propName][index].anexo;
  const nomeArquivo = respostaBackend.substring(
    respostaBackend.lastIndexOf("/") + 1
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      pdf: [".pdf"],
    },
    maxFiles: 1,
    maxSize: 99999999999999,
  });

  async function enviarArquivoS3() {
    try {
      const { data: url, status } = await uploadArquivoS3(payload);
      registerForm.setFieldValue(`${propName}[${index}].url`, url);
      registerForm.setFieldValue(`${propName}[${index}].anexo`, url);
      if (status === 200 || status === 201) {
        toast.success("Operação editada com sucesso!", {
          id: "toast-principal",
        });
      }
    } catch (error) {
      toast.error("Erro ao enviar arquivo!", {
        id: "toast-principal",
      });
    }
  }

  const isButtonDisabled = registerForm.values[propName][index][keyName] === "";

  useEffect(() => {
    if (payload.base64data !== "") {
      enviarArquivoS3();
    }
  }, [payload]);

  return (
    <Flex direction={"column"} gap={6}>
      <Flex direction={"row-reverse"} gap={6} align={"center"}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button
            isDisabled={isButtonDisabled}
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
        {registerForm.values[propName][index].anexo !== "" && (
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
                registerForm.setFieldValue(`[${propName}][${index}].anexo`, "");
              }}
            />
            <a
              href={registerForm.values[propName][index].anexo}
              target="_blank"
              rel="noreferrer"
            >
              <Text
                fontSize={"12px"}
                fontWeight={"semibold"}
                cursor={"pointer"}
              >
                {nomeArquivo}
              </Text>
            </a>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default BotaoUploadArquivo;
