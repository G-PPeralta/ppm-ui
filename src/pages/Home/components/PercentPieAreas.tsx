import { PieChart, Pie, Cell } from "recharts";

// const data2 = [
//   { name: "OPE", value: 50 },
//   { name: "Reservatórios", value: 25 },
//   { name: "teste", value: 25 },
// ];
// console.log("mock", data2);

const COLORS = ["#FF6663", "#9EC1CF", "#9EE09E"];

export default function PercentPieChart(data: any) {
  // console.log("dataFinal", data.data);
  return (
    <PieChart width={220} height={300}>
      <Pie
        data={data.data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.data.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      {/* <Pie
          data={data}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie> */}
    </PieChart>
  );
}
