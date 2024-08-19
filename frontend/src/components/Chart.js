import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map(item => `${item.offer_url} - ${item.offer_template}`),
    datasets: [
      {
        label: 'Total Value',
        data: data.map(item => item.totalValue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      // Add more datasets for other metrics if needed
    ],
  };

  return <Bar data={chartData} />;
};

export default Chart;
