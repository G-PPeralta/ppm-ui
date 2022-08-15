import { Flex } from '@chakra-ui/react';
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

function getNumeroMes(numeroDoMes: Number) {
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
  return months[Number(numeroDoMes) - 1];
}

function getNomesMeses(dataInicio: String, qtdMeses: Number) {
  const meses = [];
  let anoAtual = Number(dataInicio.split('/')[2]);
  let numeroMes = Number(dataInicio.split('/')[1]);

  for (let index = 0; index < qtdMeses; index++) {
    meses.push(`${getNumeroMes(numeroMes)}/${anoAtual}`);
    numeroMes++;
    if (numeroMes > 12) (numeroMes = 1) && anoAtual++;
  }
  return meses;
}

function GraficoCurvaS() {
  const totalBudget = 50000;
  const dataInicio = '01/10/2022';
  const qtdeMeses = 8;

  const totalNomeMeses = getNomesMeses(dataInicio, qtdeMeses);

  let porcentagem = 0;
  // let porcentagemRealizado = 0;

  const previsto = totalNomeMeses.map((mes) => {
    porcentagem += (totalBudget / qtdeMeses / totalBudget) * 100;
    return {
      month: mes,
      budget: porcentagem,
    };
  });

  // const atual = [
  //   { month: 'Out/2022', spent: 6 },
  //   { month: 'Nov/2022', spent: 30 },
  //   { month: 'Dez/2022', spent: 35 },
  //   { month: 'Jan/2023', spent: 40 },
  //   { month: 'Fev/2023', spent: 55 },
  //   // { month: 'Mar/2023', spent: 82 },
  //   // { month: 'Abr/2023', spent: 90 },
  //   // { month: 'Mai/2023', spent: 95 },
  // ];

  return (
    <>
      <Flex
        backgroundColor={'white'}
        p={4}
        alignItems={'center'}
        justify={'center'}
        borderRadius={4}
        mt={4}
      >
        <LineChart
          width={730}
          height={250}
          data={previsto}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Flex>
    </>
  );
}

export default GraficoCurvaS;
