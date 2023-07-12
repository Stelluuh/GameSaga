import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const PieChart = ({ games }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (games) {
      // Filter out games that are in the wishlist or not played
      const filteredGames = games.filter(game => game.status !== 'Wishlist' && game.status !== 'Not Played');
      // Get all genres from the filtered games
      const genres = filteredGames.map(game => game.genre);
      // Get unique genres
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
      const uniqueGenres = [...new Set(genres)]; //creates a new array with only unique genres

      // https://www.chartjs.org/docs/latest/charts/doughnut.html
      const data = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: []
          }
        ]
      };

      // Loop through each unique genre and get the count of each genre
      uniqueGenres.forEach(genre => {
        const genreName = genre.name;
        const count = genres.filter(g => g.name === genreName).length;

        // Add the genre name, count, and colors to the chart data
        if (!data.labels.includes(genreName)) {
          data.labels.push(genreName);
          data.datasets[0].data.push(count);
          data.datasets[0].backgroundColor.push(backgroundColor[data.labels.length - 1]);
          data.datasets[0].borderColor.push(borderColor[data.labels.length - 1]);
        }
      });

      setChartData(data);
    }
  }, [games]);

  const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 99, 255, 0.2)',
    'rgba(255, 159, 0, 0.2)',
    'rgba(255, 205, 0, 0.2)',
    'rgba(0, 128, 0, 0.2)',
    'rgba(128, 128, 128, 0.2)',
    'rgba(0, 0, 255, 0.2)',
    'rgba(255, 0, 0, 0.2)',
    'rgba(128, 0, 128, 0.2)',
    'rgba(0, 255, 0, 0.2)'
  ];
  
  const borderColor = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(255, 99, 255)',
    'rgb(255, 159, 0)',
    'rgb(255, 205, 0)',
    'rgb(0, 128, 0)',
    'rgb(128, 128, 128)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(128, 0, 128)',
    'rgb(0, 255, 0)'
  ];

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center', color: 'white' }}>Genres in Library</h2>
      {chartData && (
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Different Genres in Library'
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default PieChart;
