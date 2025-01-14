import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "./ChartDisplay.css";
import HeatmapGrid from "react-heatmap-grid";

const ChartDisplay = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/chart-data")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);

        // Feature Importance Chart
        const featureCtx = document.getElementById("featureImportanceChart");
        new Chart(featureCtx, {
          type: "bar",
          data: {
            labels: data.feature_importance.labels,
            datasets: [
              {
                label: "Feature Importance",
                data: data.feature_importance.values,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
            },
          },
        });

        // Outcome Distribution Chart
        const outcomeCtx = document.getElementById("outcomeDistributionChart");
        new Chart(outcomeCtx, {
          type: "pie",
          data: {
            labels: data.outcome_distribution.labels,
            datasets: [
              {
                data: data.outcome_distribution.values,
                backgroundColor: ["#FF6384", "#36A2EB"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
            },
          },
        });
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, []);

  if (!chartData) {
    return <div className="chart-container">Loading charts...</div>;
  }

  return (
    <div className="chart-container">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text chart-title">Diabetes Prediction Analysis</h1>
      <div className="chart-wrapper">
        <canvas id="featureImportanceChart"></canvas>
      </div>
      <div className="chart-wrapper">
        <canvas id="outcomeDistributionChart"></canvas>
      </div>
    </div>
  
  );
};

export default ChartDisplay;



export const CorrelationHeatmap = () => {
  const [correlationMatrix, setCorrelationMatrix] = useState(null);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the correlation matrix from Flask API
    fetch("http://127.0.0.1:5000/correlation-heatmap")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.correlation_matrix) {
          const matrix = data.correlation_matrix;
          const featureLabels = Object.keys(matrix).sort(); // Sort for consistent ordering
          const matrixValues = featureLabels.map((rowKey) =>
            featureLabels.map((colKey) => matrix[rowKey][colKey])
          );
          setLabels(featureLabels);
          setCorrelationMatrix(matrixValues);
        } else {
          throw new Error(data.error || "Invalid response format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Correlation Heatmap
      </h2>
      <div className="overflow-auto w-full lg:w-[100%] rounded-lg shadow-lg border border-gray-200 p-4 bg-white">
        <HeatmapGrid
          xLabels={labels} // Horizontal labels
          yLabels={labels} // Vertical labels
          data={correlationMatrix} // Correlation matrix values
          square
          xLabelWidth={150} // Adjust width for longer labels
          yLabelWidth={150} // Adjust width for longer labels
          cellStyle={(value) => ({
            background: `rgba(0, 123, 255, ${Math.abs(value)})`,
            color: Math.abs(value) > 0.6 ? "#fff" : "#000", // High contrast for better readability
            fontSize: "0.9rem",
          })}
          cellRender={(value) => value && value.toFixed(2)} // Display cell value
          xLabelsStyle={(index) => ({
            color: "#333",
            fontSize: "0.9rem",
            transform: "rotate(-45deg)", // Rotate for better fit
            textAlign: "left",
          })}
          yLabelsStyle={(index) => ({
            color: "#333",
            fontSize: "0.9rem",
          })}
        />
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Correlation values range from -1 to 1, where 1 indicates perfect positive correlation and -1 indicates perfect negative correlation.
      </p>
    </div>
  );
};