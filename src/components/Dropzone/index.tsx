import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiCamera } from 'react-icons/fi';

import { Flex, Image } from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import { DropzoneProps } from 'interfaces/Components';

import styles from './Dropzone.module.scss';

const Dropzone: React.FC<DropzoneProps> = ({
  onFileUploaded,
  avatar,
  nome,
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    maxSize: 5000000,
  });

  return (
    <div className={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />

      {selectedFileUrl ? (
        <div className={styles.profile}>
          <p>
            <Image
              src={selectedFileUrl}
              alt="Point thumbnail"
              className={styles.preview}
            />
          </p>
          <Flex
            align="center"
            justifyContent="center"
            bg="origem.100"
            w="10"
            h="10"
            zIndex={1}
            position="absolute"
            borderRadius={10}
            marginLeft="125"
            cursor="pointer"
          >
            <FiCamera color="#FFF" />
          </Flex>
        </div>
      ) : (
        <div className={styles.profile}>
          <p>
            {avatar ? (
              <Image src={avatar} alt="Perfil" className={styles.preview} />
            ) : (
              <Avvvatars value={nome || ''} size={160} />
            )}
          </p>
          <Flex
            align="center"
            justifyContent="center"
            bg="origem.100"
            w="10"
            h="10"
            zIndex={1}
            position="absolute"
            borderRadius={10}
            marginLeft="125"
            cursor="pointer"
          >
            <FiCamera color="#FFF" />
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
