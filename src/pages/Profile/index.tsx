import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';
import Avvvatars from 'avvvatars-react';

import Sidebar from 'components/SideBar';
import { TextError } from 'components/TextError';

import formatCellphone from 'utils/formatCellphone';

import { usePermissions } from 'hooks/usePermissions';
import { useProfile } from 'hooks/useProfile';

const wd = window.innerWidth;

export function Profile() {
  const { profileForm, loading } = useProfile();
  const { roles } = usePermissions();

  return (
    <>
      <Sidebar>
        {loading && (
          <Flex display={'flex'} align={'center'} justify={'center'} h={'90vh'}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
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
                profileForm.handleSubmit(e);
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
                        onChange={profileForm.handleChange}
                        value={profileForm.values.name}
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
                        value={profileForm.values.email}
                        onChange={profileForm.handleChange}
                      />
                      <FormErrorMessage>
                        {profileForm.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <FormControl>
                    <FormLabel htmlFor="access">Nivel de Acesso</FormLabel>
                    <Select
                      id="access"
                      placeholder="Selecione o nível de acesso"
                      name="accessLevel"
                      value={profileForm.values.accessLevel}
                      onChange={profileForm.handleChange}
                      disabled
                    >
                      {roles?.map((role) => (
                        <option key={role?.id} value={role?.id}>
                          {role?.nome_role}
                        </option>
                      ))}
                    </Select>
                    {profileForm.errors.accessLevel &&
                      profileForm.touched.accessLevel && (
                        <TextError>{profileForm.errors.accessLevel}</TextError>
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
                      value={formatCellphone(profileForm.values.telephone)}
                      onChange={profileForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '100%' })}
                    />
                    {profileForm.errors.telephone &&
                      profileForm.touched.telephone && (
                        <TextError>{profileForm.errors.telephone}</TextError>
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
                      onChange={profileForm.handleChange}
                      value={profileForm.values.area}
                    />
                  </FormControl>
                </Stack>
                <Stack
                  w="100%"
                  display={'flex'}
                  align="center"
                  justify="center"
                >
                  <Avvvatars value={profileForm.values.name || ''} size={160} />
                </Stack>
              </Box>
              <Stack spacing="6" mt="6">
                <Button
                  disabled={!profileForm.values.email}
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
