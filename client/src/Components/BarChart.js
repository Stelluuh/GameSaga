import React from 'react'
import { Bar } from 'react-chartjs-2'


const BarChart = ({ gameLogs }) => {
    // first get the counts of each status of game 
    const getStatusCounts = () => {
        const statusCounts = {
            'Abandoned': 0,
            'Complete': 0,
            'In Progress': 0,
            'Not Played': 0,
            'Wishlist': 0,
        }
    // loop through gameLogs and increment the count for each status
    gameLogs.forEach( log => statusCounts[log.status]++)
    // return the statusCounts object
    return statusCounts

    }
    // call getStatusCounts and save the returned object to a variable
    const statusCounts = getStatusCounts()
    // console.log(statusCounts)

    // create the chart data object
    // https://www.youtube.com/watch?v=RF57yDglDfE
    //https://www.chartjs.org/docs/latest/charts/bar.html
    const chartData = {
        labels:['Abandoned', 'Complete', 'In Progress', 'Not Played', 'Wishlist'],
        datasets: [{
            label: 'Game Statuses',
            data: [
                statusCounts['Abandoned'],
                statusCounts['Complete'],
                statusCounts['In Progress'],
                statusCounts['Not Played'],
                statusCounts['Wishlist'],
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)', //red
                'rgba(75, 192, 192, 0.5)', // green
                'rgba(54, 162, 235, 0.5)', // blue
                'rgba(255, 205, 86, 0.5)', // yellow
                'rgba(153, 102, 255, 0.5)', // purple
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)', //red
                'rgba(75, 192, 192, 1)', // green
                'rgba(54, 162, 235, 1)', // blue
                'rgba(255, 205, 86, 1)', // yellow
                'rgba(153, 102, 255, 1)', // purple
              ],
            borderWidth: 1,
        },
    ],
}
    const chartOptions = {
        scales: {
        y: {
            beginAtZero: true,
            precision: 0,
            stepSize: 1,
        },
        },
        plugins: {
        title: {
            display: true,
            text: 'Game Status Counts',
        },
        },
    };


  return (
    <div>
        <h2 style={{ textAlign: "center", color: 'white' }}>Game statuses</h2>
        <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default BarChart
