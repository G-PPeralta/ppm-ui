import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { MdDriveFolderUpload } from "react-icons/md";

import { Icon } from "@chakra-ui/react";

// import styles from "./Dropzone.module.scss";

export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
  name?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded, name }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
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
    <div
      // className={isDragReject === false ? styles.dropzone : styles.error}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {isDragReject ? (
        <p>
          <FiUpload />
          Arquivo não suportado, tente enviar um arquivo .csv ou .xlsx
        </p>
      ) : (
        <>
          {selectedFileUrl ? (
            <p>
              <img
                src="https://findicons.com/files/icons/2795/office_2013_hd/2000/excel.png"
                alt="Point thumbnail"
                // className={styles.thumbnail}
              />
              <span>{name}</span>
            </p>
          ) : (
            <p className="icon-text">
              Importar planilha{" "}
              {<Icon as={MdDriveFolderUpload} fontSize="25px" ml={2} />}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Dropzone;
