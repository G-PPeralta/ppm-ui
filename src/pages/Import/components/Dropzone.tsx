//  CRIADO EM: 8/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Componente dropzone genérico.

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { MdDriveFolderUpload } from "react-icons/md";

import { Icon } from "@chakra-ui/react";

export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
  name?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded, name }) => {
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      onFileUploaded(file);
    },
    [onFileUploaded]
  );
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
        ".csv",
        ".xls",
      ],
    },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      {isDragReject ? (
        <p>
          <FiUpload />
          Arquivo não suportado, envie um arquivo .csv ou .xlsx
        </p>
      ) : (
        <>
          <p className="icon-text">
            Importar planilha{" "}
            {<Icon as={MdDriveFolderUpload} fontSize="25px" ml={2} />}
          </p>
        </>
      )}
    </div>
  );
};

export default Dropzone;
