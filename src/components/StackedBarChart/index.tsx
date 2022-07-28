// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// import style from './StackedBarChart.module.scss';

// // const total = 2500;
// // const realizado = 1500;
// // const restante = total - realizado;

// // const total2 = 4000;
// // const realizado2 = 1500;
// // const restante2 = total2 - realizado2;

// // const data = [
// //   {
// //     name: 'Jan/2022',
// //     Previsto: (realizado / total) * 100,
// //     Realizado: (restante / total) * 100,
// //     Total: 100,
// //   },
// //   {
// //     name: 'Fev/2022',
// //     Previsto: (realizado2 / total2) * 100,
// //     Realizado: (restante2 / total2) * 100,
// //   },
// //   {
// //     name: 'Mar/2022',
// //     Previsto: 25,
// //     Realizado: 75,
// //   },
// //   {
// //     name: 'Abr/2022',
// //     Previsto: 25,
// //     Realizado: 75,
// //   },
// // ];

// function getMonthNumber(monthNumber: Number) {
//   const months = [
//     'Jan',
//     'Fev',
//     'Mar',
//     'Abr',
//     'Mai',
//     'Jun',
//     'Jul',
//     'Ago',
//     'Set',
//     'Out',
//     'Nov',
//     'Dez',
//   ];
//   return months[Number(monthNumber) - 1];
// }

// function getMonthNames(startDate: String, monthsAmount: Number) {
//   const months = [];
//   let actualYear = Number(startDate.split('/')[2]);
//   let monthNumber = Number(startDate.split('/')[1]);

//   for (let index = 0; index < monthsAmount; index += 1) {
//     months.push(`${getMonthNumber(monthNumber)}/${actualYear}`);
//     monthNumber += 1;
//     if (monthNumber > 12) (monthNumber = 1) && (actualYear += 1);
//   }
//   return months;
// }

// export default function StackedBarChart() {
//   const totalBudget = 50000;
//   const startDate = '01/10/2022';
//   const monthsAmount = 8;

//   const arrayOfMonthsNames = getMonthNames(startDate, monthsAmount);

//   let foreseenPercentage = 0;
//   let accomplishedPercentage = 0;

//   const foreseenData = arrayOfMonthsNames.map((mes) => {
//     foreseenPercentage += (totalBudget / monthsAmount / totalBudget) * 100;
//     return {
//       month: mes,
//       monthlyForecast: foreseenPercentage,
//     };
//   });

//   const accomplishedData = arrayOfMonthsNames.map((mes) => {
//     accomplishedPercentage += Number(Math.round((Math.random() * 100) / 10));
//     return {
//       month: mes,
//       monthlyAchieved: accomplishedPercentage,
//     };
//   });

//   const data = foreseenData.map((item, index) => ({
//     ...item,
//     ...accomplishedData[index],
//   }));

//   const dataPercentage = data.map((item) => {
//     const total = item.monthlyForecast;
//     const accomplished = Math.floor(Math.random() * total);
//     const remaining = Number((total - accomplished).toFixed(2));
//     const Realizado = Number(((accomplished / total) * 100).toFixed(2));
//     const Previsto = Number(((remaining / total) * 100).toFixed(2));
//     return { Realizado, Previsto };
//   });

//   const dataFinal = data.map((item, index) => ({
//     YAxis: 100,
//     ...item,
//     ...dataPercentage[index],
//   }));

//   console.log(dataFinal);

//   return (
//     <ResponsiveContainer aspect={2} className={style.container}>
//       <BarChart
//         data={dataFinal}
//         className={style.chart}
//         margin={{
//           top: 40,
//           right: 40,
//           left: 30,
//           bottom: 20,
//         }}
//       >
//         <XAxis dataKey="month" />
//         <YAxis dataKey="YAxis" />
//         <Tooltip />
//         <Legend />
//         <Bar
//           dataKey="Realizado"
//           stackId="a"
//           fill="#2E69FD"
//           legendType="circle"
//           isAnimationActive={true}
//           animationDuration={1300}
//         />
//         <Bar
//           dataKey="Previsto"
//           stackId="a"
//           fill="#93E01B"
//           legendType="circle"
//           isAnimationActive={true}
//           animationDuration={1000}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

import style from './StackedBarChart.module.scss';

// const total = 2500;
// const realizado = 1500;
// const restante = total - realizado;

// const total2 = 4000;
// const realizado2 = 1500;
// const restante2 = total2 - realizado2;

// const data = [
//   {
//     name: 'Jan/2022',
//     Previsto: (realizado / total) * 100,
//     Realizado: (restante / total) * 100,
//     Total: 100,
//   },
//   {
//     name: 'Fev/2022',
//     Previsto: (realizado2 / total2) * 100,
//     Realizado: (restante2 / total2) * 100,
//   },
//   {
//     name: 'Mar/2022',
//     Previsto: 25,
//     Realizado: 75,
//   },
//   {
//     name: 'Abr/2022',
//     Previsto: 25,
//     Realizado: 75,
//   },
// ];

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

export default function StackedBarChart() {
  const totalBudget = 50000;
  const startDate = '01/10/2022';
  const monthsAmount = 4;

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

  console.log(dataFinal);

  return (
    <ResponsiveContainer width={280} height={240}>
      <BarChart data={dataFinal} className={style.chart}>
        <XAxis dataKey="month" />
        <Tooltip />
        <Bar
          dataKey="Realizado"
          stackId="a"
          fill="#2E69FD"
          legendType="circle"
          isAnimationActive={true}
          animationDuration={1300}
          barSize={25}
        />
        <Bar
          dataKey="Previsto"
          stackId="a"
          fill="#93E01B"
          legendType="circle"
          isAnimationActive={true}
          animationDuration={1000}
          barSize={25}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
