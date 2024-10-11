import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import formatToRupiah from '../utils/formatRupiah';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

const ProgressBar = ({ data }) => {
  const MIN_PERCENTAGE = 1;
  const totalCompleted = data.reduce((acc, item) => acc + item.completed, 0);

  const generateColors = (num) => {
    const colors = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < num; i++) {
      const hue = (i * 137.5) % 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => {
          const percentage = (item.completed / totalCompleted) * 100;
          return percentage < MIN_PERCENTAGE ? MIN_PERCENTAGE : percentage;
        }),
        backgroundColor: generateColors(data.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label(tooltipItem) {
            const index = tooltipItem.dataIndex;
            const percentage = tooltipItem.raw || 0;
            const { label, completed, total } = data[index];

            return [
              ` ${label}`,
              `Completed: ${formatToRupiah(completed.toString())}`,
              `Total: ${formatToRupiah(total.toString())}`,
              `Percentage: ${percentage.toFixed(1)}%`,
            ];
          },
          title() {
            return '';
          },
        },
        itemSort: (a, b) => b.raw - a.raw,
        displayColors: true,
      },
      datalabels: {
        formatter: (value) => {
          const percentage = value.toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: '#fff',
      },
    },
  };

  // if (data.length === 0) {
  //   return (
  //     <div className="text-center text-2xl font-semibold">
  //       Data tidak ditemukan
  //     </div>
  //   );
  // }

  // Calculate percentage for each item
  const dataWithPercentage = data.map((item) => ({
    ...item,
    percentage: (item.completed / totalCompleted) * 100,
  }));

  // Sort data by percentage in descending order
  const sortedData = dataWithPercentage.sort(
    (a, b) => b.percentage - a.percentage
  );

  // Get top 5 data
  const top5Data = sortedData.slice(0, 5);

  return (
    <div className="w-full grid grid-rows-2 items-center mt-20 mb-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 place-items-start">
        <div className="relative w-full h-64 md:h-96">
          <Pie data={chartData} options={options} />
        </div>

        <div className="flex flex-col justify-center w-full">
          {data.map((item, index) => (
            <div key={item} className="flex items-center mb-2">
              <div className="w-4 h-4">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      chartData.datasets[0].backgroundColor[index],
                  }}
                />
              </div>
              <div className="ml-2">
                <span
                  className="text-sm font-medium break-words"
                  style={{ maxWidth: '150px' }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}

          <div className="w-full max-w-md mt-10">
            <h2 className="text-lg font-bold mb-4">Top 5 Completed Data: </h2>
            {top5Data.map((item, index) => (
              <div key={item} className="flex items-center mb-2">
                <div className="w-4 h-4">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[index],
                    }}
                  />
                </div>
                <div className="ml-2">
                  <span className="text-sm font-medium break-words">
                    {index + 1}. {item.label} -{' '}
                    {formatToRupiah(item.completed.toString())}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
