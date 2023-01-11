import { useEffect, useState } from "react";

import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Cell, Pie, PieChart, Sector } from "recharts";

import { getGates } from "services/get/Dashboard";

interface Data {
  gate: string;
  qtde: number;
  pct: number;
}

export default function NaoPrevistoComponent() {
  const [data, setData] = useState<Data[]>([]);
  const [active, setActive] = useState<number>(0);
  const [render, setRender] = useState<boolean>(true);

  const getData = async () => {
    const gates = await getGates();
    const newData: any[] = [];
    for (const gate of gates.data) {
      const newItem = {
        value: Number(gate.qtde),
        name: gate.gate,
        color:
          // eslint-disable-next-line no-nested-ternary
          gate.gate == "A definir"
            ? "#FEB144"
            : gate.gate == "Não Iniciado"
            ? "#FEB144"
            : "#9EE09E",
      };
      newData.push(newItem);
    }
    setData(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  // const RenderCustomizedLabel = (props: any) => {
  //   const { value } = props;

  //   return (
  //     <text fill="#000" textAnchor="middle" dominantBaseline="middle">
  //       {value}
  //     </text>
  //   );
  // };

  const handleActive = (index: number) => {
    setActive(index);
    setRender(!render);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >
          {payload.name}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <Flex
      align="center"
      justify="center"
      flex={1}
      h={"370px"}
      py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      w={"100%"}
      bg={"white"}
      boxShadow={{
        base: "none",
        sm: useColorModeValue("md", "md-dark"),
      }}
      borderRadius={"xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Text
        mb={1}
        sx={{
          fontSize: 18,
          fontWeight: "700",
          fontFamily: "Mulish",
          alignSelf: innerWidth >= 428 ? "center" : "flex-start",
        }}
        color="#000000"
      >
        Fase dos Projetos
      </Text>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          activeIndex={active}
          activeShape={renderActiveShape}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
        >
          <>
            {data.map((entry: any, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                onMouseEnter={() => handleActive(index)}
              />
            ))}
          </>
        </Pie>
      </PieChart>
    </Flex>
  );
}
