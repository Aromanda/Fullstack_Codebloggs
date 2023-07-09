import React, { useEffect, useRef } from "react";
import { Chart } from 'chart.js/auto';

const GraphPage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Store chart instance in a useRef hook

  useEffect(() => {
    fetch("http://localhost:5050/record/")
      .then(response => response.json())
      .then(records => {
        const labels = records.map(record => record.email);
        const data = records.map(record => Number(record.sales));

        const config = {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: "Sales",
                data: data,
                backgroundColor: 'rgba(10, 101, 160, 0.8)',
              }
            ]
          },
          options: {
            indexAxis: 'y',
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,
                }
              }
            }
          }
        };

        // If there is an existing chart instance, destroy it before creating a new one
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        if (chartRef.current) { // Ensure that chartRef.current is not null before creating a new chart
          chartInstance.current = new Chart(chartRef.current, config);
        }
      })
      .catch(error => console.error('Error:', error));

      // Cleanup function to destroy chart instance when component unmounts
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card" style={{ width: "60rem" }}>
        <div className="card-body">
          <h3 className="card-title" style={{ fontStyle: 'italic', color: 'red', fontSize: '30px' }}>Agents Sales Graph</h3>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
