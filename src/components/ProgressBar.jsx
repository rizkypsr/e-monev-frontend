import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import formatToRupiah from '../utils/formatRupiah';

ChartJS.register(ArcElement, Tooltip);

const ProgressBar = ({ data }) => {
  const MIN_PERCENTAGE = 1;
  const totalCompleted = data.reduce((acc, item) => acc + item.completed, 0);

  const generateColors = (num) => {
    const colors = [];
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
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const percentage = tooltipItem.raw || 0;
            const label = data[index].label;
            const completed = data[index].completed;
            const total = data[index].total;

            return [
              ` ${label}`,
              `Completed: ${formatToRupiah(completed.toString())}`,
              `Total: ${formatToRupiah(total.toString())}`,
              `Percentage: ${percentage.toFixed(1)}%`,
            ];
          },
          title: function () {
            return '';
          },
        },

        itemSort: (a, b) => b.raw - a.raw,
        displayColors: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: '#fff',
      },
    },
  };

  return (
    <div className="w-full flex justify-center mt-20 mb-20">
      <div className="grid grid-cols-2 w-full min-w-0 items-center">
        <div
          className="relative col-span-1 max-w-full overflow-hidden"
          style={{ width: '100%', height: '400px', minWidth: '300px' }}
        >
          <Pie data={chartData} options={options} />
        </div>

        <div className="col-span-1 flex flex-col justify-center flex-1">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-4 h-4">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      chartData.datasets[0].backgroundColor[index],
                  }}
                ></span>
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
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
