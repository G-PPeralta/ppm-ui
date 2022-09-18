import { PieChart, Pie, Cell } from "recharts";

const data01 = [
  {
    name: "Engenharia",
    value: 30,
    color: "#93E01B",
  },
  {
    name: "C&M",
    value: 30,
    color: "#F4DD06",
  },
  {
    name: "Suprimentos",
    value: 20,
    color: "#F94144",
  },
  {
    name: "Pré-projeto",
    value: 20,
    color: "#2E69FD",
  },
];

interface Props {
  size: number;
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export default function PieChartComponent({ size, data }: Props) {
  return (
    <PieChart width={size} height={size}>
      {data ? (
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={size / 2 - 20}
          outerRadius={size / 2}
          // label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      ) : (
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={size / 2 - 20}
          outerRadius={size / 2}
          // label
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      )}
      {/* <Tooltip /> */}
      {/* <Legend /> */}
    </PieChart>
  );
}
