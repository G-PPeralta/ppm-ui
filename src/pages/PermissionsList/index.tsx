import { Flex, Grid, useBreakpointValue } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import CardProfile from "components/CardProfile";
import Sidebar from "components/SideBar";

import { usePending } from "hooks/usePending";

export function PermissionsList() {
  const { userPending, loading } = usePending();

  return (
    <>
      <Sidebar>
        {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}

        <Grid
          templateColumns={useBreakpointValue({
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          })}
          gap={6}
        >
          {userPending &&
            userPending?.map((pending) => (
              <CardProfile
                key={pending.id}
                name={pending.nome}
                avatar={pending.avatar}
                email={pending.email}
                telephone={pending.telefone}
                perfil={pending.nome_role}
                id={pending.id}
              />
            ))}
        </Grid>
      </Sidebar>
    </>
  );
}
