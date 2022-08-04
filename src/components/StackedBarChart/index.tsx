import { StackedBarChartProps } from 'interfaces/Components';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

import style from './StackedBarChart.module.scss';

function getMonthNumber(monthNumber: Number) {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  return months[Number(monthNumber) - 1];
}

function getMonthNames(startDate: String, monthsAmount: Number) {
  const months = [];
  let actualYear = Number(startDate.split('/')[2]) - 2000;
  let monthNumber = Number(startDate.split('/')[1]);

  for (let index = 0; index < monthsAmount; index += 1) {
    months.push(`${getMonthNumber(monthNumber)}/${actualYear}`);
    monthNumber += 1;
    if (monthNumber > 12) (monthNumber = 1) && (actualYear += 1);
  }
  return months;
}

export default function StackedBarChart({
  sizeW,
  sizeH,
  numberBars,
  barW,
  showY,
}: StackedBarChartProps) {
  const totalBudget = 269273328.18;
  const startDate = '01/01/2022';
  const monthsAmount = numberBars;

  const arrayOfMonthsNames = getMonthNames(startDate, monthsAmount);

  let foreseenPercentage = 0;
  let accomplishedPercentage = 0;

  const foreseenData = arrayOfMonthsNames.map((mes) => {
    foreseenPercentage += (totalBudget / monthsAmount / totalBudget) * 100;
    return {
      month: mes,
      monthlyForecast: foreseenPercentage,
    };
  });

  const accomplishedData = arrayOfMonthsNames.map((mes) => {
    accomplishedPercentage += Number(Math.round((Math.random() * 100) / 10));
    return {
      month: mes,
      monthlyAchieved: accomplishedPercentage,
    };
  });

  const data = foreseenData.map((item, index) => ({
    ...item,
    ...accomplishedData[index],
  }));

  const dataPercentage = data.map((item) => {
    const total = item.monthlyForecast;
    const accomplished = Math.floor(Math.random() * total);
    const remaining = Number((total - accomplished).toFixed(2));
    const Realizado = Number(((accomplished / total) * 100).toFixed(2));
    const Previsto = Number(((remaining / total) * 100).toFixed(2));
    return { Realizado, Previsto };
  });

  const dataFinal = data.map((item, index) => ({
    YAxis: 100,
    ...item,
    ...dataPercentage[index],
  }));

  return (
    <ResponsiveContainer width={sizeW} height={sizeH}>
      <BarChart data={dataFinal} className={style.chart}>
        <XAxis dataKey="month" fontSize={10} />
        {showY ? <YAxis dataKey="YAxis" /> : undefined}
        <Tooltip />
        <Bar
          dataKey="Realizado"
          stackId="a"
          fill="#2E69FD"
          legendType="circle"
          isAnimationActive={true}
          animationDuration={1300}
          barSize={barW}
        />
        <Bar
          dataKey="Previsto"
          stackId="a"
          fill="#93E01B"
          legendType="circle"
          isAnimationActive={true}
          animationDuration={1000}
          barSize={barW}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
