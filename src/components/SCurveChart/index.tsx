import {
  Category,
  ChartComponent,
  DataLabel,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import styles from './SCurveChart.module.scss';

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

function getMonthNames(dataInicio: String, qtdMeses: Number) {
  const meses = [];
  let anoAtual = Number(dataInicio.split('/')[2]);
  let monthNumber = Number(dataInicio.split('/')[1]);

  for (let index = 0; index < qtdMeses; index++) {
    meses.push(`${getMonthNumber(monthNumber)}/${anoAtual}`);
    monthNumber++;
    if (monthNumber > 12) (monthNumber = 1) && anoAtual++;
  }
  return meses;
}

function SCurveChart() {
  const totalBudget = 50000;
  const dataInicio = '01/10/2022';
  const qtdeMeses = 8;

  const totalNomeMeses = getMonthNames(dataInicio, qtdeMeses);

  let porcentagem = 0;
  // let porcentagemRealizado = 0;

  const previsto = totalNomeMeses.map((mes) => {
    porcentagem += (totalBudget / qtdeMeses / totalBudget) * 100;
    return {
      month: mes,
      budget: porcentagem,
    };
  });

  // const atual = totalNomeMeses.map((mes) => {
  //   porcentagemRealizado += (((totalBudget / qtdeMeses)/totalBudget) * 90);
  //   return {
  //     month: mes,
  //     spent: porcentagemRealizado
  //   }
  // });

  const atual = [
    { month: 'Out/2022', spent: 6 },
    { month: 'Nov/2022', spent: 30 },
    { month: 'Dez/2022', spent: 35 },
    { month: 'Jan/2023', spent: 40 },
    { month: 'Fev/2023', spent: 55 },
    { month: 'Mar/2023', spent: 82 },
    { month: 'Abr/2023', spent: 90 },
    // { month: 'Mai/2023', spent: 95 },
  ];

  const palette = ['#F94144', '#F9C74F'];
  const markerPattern = {
    dataLabel: { visible: true },
    visible: true,
    width: 10,
    opacity: 1,
    height: 10,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chart}>
          <ChartComponent
            palettes={palette}
            primaryXAxis={{
              valueType: 'Category',
              title: 'Mês',
            }}
            primaryYAxis={{ title: 'Porcentagem', labelFormat: '{value}%' }}
            legendSettings={{ visible: true }}
            tooltip={{ enable: true }}
          >
            <Inject
              services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                type="Line"
                dataSource={previsto}
                xName="month"
                yName="budget"
                name="Previsto"
                marker={markerPattern}
                width={5}
              />
              <SeriesDirective
                type="Line"
                dataSource={atual}
                xName="month"
                yName="spent"
                name="Realizado"
                marker={markerPattern}
                width={5}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    </>
  );
}

export default SCurveChart;
