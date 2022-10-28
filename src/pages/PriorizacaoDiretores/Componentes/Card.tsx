import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Box } from "@chakra-ui/react";

interface Props {
  data: string;
  index: number;
}

function Card({ data, index }: Props) {
  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            w="150px"
            bg={"#f5f5f5"}
            px={5}
            py={4}
            borderRadius={"60px"}
            mb={2}
          >
            {data}
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
