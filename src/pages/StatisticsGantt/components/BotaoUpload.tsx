import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCloudArrowUpFill } from "react-icons/bs";

import { Button, Flex, IconButton, Text } from "@chakra-ui/react";

import { getArquivoPdf } from "services/get/Estatisticas";

interface Props {
  registerForm: any;
  index: number;
  nomeArquivo: string;
  setArquivoPdf: React.Dispatch<React.SetStateAction<any>>;
}

function BotaoUploadArquivo({
  registerForm,
  index,
  nomeArquivo,
  setArquivoPdf,
}: Props) {
  const [nomeArquivoSelecionado, setNomeArquivoSelecionado] =
    useState(nomeArquivo);
  const [arquivoSelecionado, setArquivoSelecionado] = useState("");

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setArquivoSelecionado(file.name);
    const nomeArquivo = `${registerForm.values.id_atividade}_${registerForm.values.mocs[index].numero_moc}.pdf`;
    const fileRenomeado = new File([file], nomeArquivo, {
      type: file.type,
    });
    registerForm.setFieldValue(`mocs[${index}].arquivo`, fileRenomeado);
    registerForm.setFieldValue(`mocs[${index}].anexo`, fileRenomeado.name);
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

  const handleTeste = async () => {
    try {
      if (arquivoSelecionado.length === 0) {
        const nomeArquivoSemExtensao = nomeArquivo.split(".")[0];
        const { data } = await getArquivoPdf(nomeArquivoSemExtensao);
        const arquivo = new File([data], nomeArquivo, {
          type: "application/pdf",
        });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onload = () => {
          setArquivoPdf(fileReader.result);
        };
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
                registerForm.setFieldValue(`mocs[${index}].arquivo`, "");
                registerForm.setFieldValue(`mocs[${index}].anexo`, "");
                setNomeArquivoSelecionado("");
              }}
            />
            <Text
              fontSize={"12px"}
              fontWeight={"semibold"}
              onClick={() => {
                handleTeste();
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
