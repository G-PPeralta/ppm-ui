import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import Dropzone from 'components/Dropzone';
import Sidebar from 'components/SideBar';
import { TextError } from 'components/TextError';

import { convertImageToBase64 } from 'utils/convertBase64';
import formatCellphone from 'utils/formatCellphone';

import { usePermissions } from 'hooks/usePermissions';

const wd = window.innerWidth;

export function Permissions() {
  const { permissionsForm } = usePermissions();

  return (
    <>
      <Sidebar>
        <Stack spacing="8">
          <Box
            py={{ base: '0', sm: '16' }}
            px={{ base: '4', sm: '10' }}
            bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                permissionsForm.handleSubmit(e);
              }}
            >
              <Box display={wd > 800 ? 'flex' : ''}>
                <Stack spacing="5" w="100%">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel
                        htmlFor="name"
                        justifyContent="space-between"
                        display="flex"
                      >
                        Nome
                      </FormLabel>
                      <Input
                        isRequired
                        id="name"
                        type="name"
                        name="name"
                        onChange={permissionsForm.handleChange}
                        value={permissionsForm.values.name}
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        isRequired
                        id="email"
                        type="email"
                        name="email"
                        value={permissionsForm.values.email}
                        onChange={permissionsForm.handleChange}
                      />
                      <FormErrorMessage>
                        {permissionsForm.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <FormControl>
                    <FormLabel htmlFor="access">Nivel de Acesso</FormLabel>
                    <Select
                      id="access"
                      placeholder="Selecione o nível de acesso"
                      name="accessLevel"
                      value={permissionsForm.values.accessLevel}
                      onChange={permissionsForm.handleChange}
                    >
                      <option>Administrador</option>
                      <option>Intervenções</option>
                      <option>Projetos</option>
                    </Select>
                    {permissionsForm.errors.accessLevel &&
                      permissionsForm.touched.accessLevel && (
                        <TextError>
                          {permissionsForm.errors.accessLevel}
                        </TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="telephone">Telefone</FormLabel>
                    <Input
                      isRequired
                      placeholder="(00)00000-0000"
                      id="telephone"
                      type="text"
                      name="telephone"
                      maxLength={15}
                      value={formatCellphone(permissionsForm.values.telephone)}
                      onChange={permissionsForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '100%' })}
                    />
                    {permissionsForm.errors.telephone &&
                      permissionsForm.touched.telephone && (
                        <TextError>
                          {permissionsForm.errors.telephone}
                        </TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      htmlFor="name"
                      justifyContent="space-between"
                      display="flex"
                    >
                      Area
                    </FormLabel>
                    <Input
                      isRequired
                      id="name"
                      type="name"
                      name="name"
                      onChange={permissionsForm.handleChange}
                      value={permissionsForm.values.area}
                    />
                  </FormControl>
                </Stack>
                <Stack
                  w="100%"
                  display={'flex'}
                  align="center"
                  justify="center"
                >
                  <Dropzone
                    onFileUploaded={(file) => {
                      convertImageToBase64(file).then((base64) => {
                        permissionsForm.setFieldValue('avatar', base64);
                      });
                    }}
                  />
                </Stack>
              </Box>
              <Stack spacing="6" mt="6">
                <Button
                  disabled={!permissionsForm.values.email}
                  type="submit"
                  background="origem.300"
                  variant="primary"
                  color="white"
                  _hover={{
                    background: 'origem.500',
                    transition: 'all 0.4s',
                  }}
                >
                  Salvar
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}
