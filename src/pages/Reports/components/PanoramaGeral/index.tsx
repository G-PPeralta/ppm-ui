import { useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import CurvaS from "components/CurvaS";

import { getProjetosPrevistoRealizado } from "services/get/Dashboard";

import { Gantt } from "../Gantt";

export function PanoramaGeral() {
  const [data, setData] = useState([]);
  const [loadingCurva, setLoadingCurva] = useState(true);

  const getData = async () => {
    const res = await getProjetosPrevistoRealizado();
    setData(res.data);
    setLoadingCurva(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"} marginTop={"24px"}>
        {loadingCurva ? (
          <Flex justify={"center"} gap={4} w={"100%"}>
            <Ring speed={2} lineWeight={5} color="blue" size={24} />
          </Flex>
        ) : (
          <CurvaS data={data} />
        )}
        <Gantt />
      </Flex>
    </>
  );
}
