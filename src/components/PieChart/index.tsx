import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data01 = [
  {
    name: 'Group A',
    value: 400,
    color: '#00ff00',
  },
  {
    name: 'Group B',
    value: 300,
    color: '#ff0000',
  },
  {
    name: 'Group C',
    value: 300,
    color: '#0000ff',
  },
  {
    name: 'Group D',
    value: 200,
    color: '#fff000',
  },
  {
    name: 'Group E',
    value: 278,
    color: '#aaff00',
  },
  {
    name: 'Group F',
    value: 189,
    color: '#00af00',
  },
];

export default function PieChartComponent() {
  return (
    <PieChart width={730} height={250}>
      <Pie
        data={data01}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        label
      >
        {data01.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
