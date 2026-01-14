"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import BackButton from '@/app/components/BackButton';
import styles from './styles.module.css';
import { monthlyExpenses, incomeData, savingsHistory, categoryColors } from './data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function FinanceDashboard() {
  // Calculate total income and expenses
  const totalIncome = Object.values(incomeData).reduce((acc, curr) => acc + curr, 0);
  const totalExpenses = Object.values(monthlyExpenses.march).reduce((acc, curr) => acc + curr, 0);
  const netSavings = totalIncome - totalExpenses;

  // Prepare data for monthly expenses chart
  const expenseChartData = {
    labels: Object.keys(monthlyExpenses.march).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [{
      label: 'March expenses',
      data: Object.values(monthlyExpenses.march),
      backgroundColor: Object.values(categoryColors),
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 28,
    }]
  };

  // Prepare data for income breakdown
  const incomeChartData = {
    labels: Object.keys(incomeData).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [{
      data: Object.values(incomeData),
      backgroundColor: ['#007aff', '#1d1d1f', '#86868b'],
      borderWidth: 0,
    }]
  };

  // Prepare data for savings trend
  const savingsChartData = {
    labels: savingsHistory.map(item => item.month),
    datasets: [{
      label: 'Monthly savings',
      data: savingsHistory.map(item => item.amount),
      borderColor: '#007aff',
      backgroundColor: 'rgba(0, 122, 255, 0.1)',
      tension: 0.4,
      fill: true,
      borderWidth: 2.5,
      pointRadius: 5,
      pointBackgroundColor: '#007aff',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#007aff',
      pointHoverBorderColor: 'white',
    }]
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <header className={styles.header}>
        <h1 className={styles.title}>Financial Dashboard</h1>
      </header>

      <div className={styles.dashboard}>
        <div className={styles.overviewCard}>
          <div className={styles.overviewContent}>
            <div className={styles.metricGroup}>
              <span className={styles.metricLabel}>Income</span>
              <div className={styles.metricValue}>
                <span className={styles.totalIncome}>${totalIncome.toLocaleString()}</span>
              </div>
            </div>
            <div className={styles.metricGroup}>
              <span className={styles.metricLabel}>Expenses</span>
              <div className={styles.metricValue}>
                <span className={styles.totalExpenses}>${totalExpenses.toLocaleString()}</span>
              </div>
            </div>
            <div className={styles.metricGroup}>
              <span className={styles.metricLabel}>Net Savings</span>
              <div className={styles.metricValue}>
                <span className={styles.netSavings}>${netSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Expenses</h2>
          <div className={styles.chartContainer}>
            <Bar 
              data={expenseChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    titleFont: {
                      family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      size: 13,
                      weight: 600,
                    },
                    bodyFont: {
                      family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      size: 13,
                    },
                    callbacks: {
                      label: (context) => `$${context.parsed.y}`,
                    }
                  }
                },
                scales: {
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      color: 'rgba(60, 60, 67, 0.12)',
                      lineWidth: 0.5,
                      drawTicks: false,
                    },
                    ticks: {
                      color: '#8e8e93',
                      font: {
                        size: 11,
                        weight: 400,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      },
                      padding: 8,
                      maxTicksLimit: 5,
                      callback: function(value) {
                        return '$' + value;
                      }
                    }
                  },
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: '#000',
                      font: {
                        size: 12,
                        weight: 400,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      },
                      padding: 8,
                    }
                  }
                },
                layout: {
                  padding: {
                    top: 8,
                    right: 8,
                  }
                }
              }}
            />
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Income</h2>
          <div className={styles.chartContainer}>
            <Doughnut 
              data={incomeChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    align: 'start',
                    labels: {
                      padding: 16,
                      color: '#000',
                      font: {
                        size: 14,
                        weight: 400,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      },
                      usePointStyle: true,
                      pointStyle: 'circle',
                      boxWidth: 8,
                      boxHeight: 8,
                      generateLabels: (chart) => {
                        const data = chart.data;
                        return data.labels.map((label, i) => ({
                          text: `${label}  $${data.datasets[0].data[i].toLocaleString()}`,
                          fillStyle: data.datasets[0].backgroundColor[i],
                          hidden: false,
                          index: i,
                        }));
                      }
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    titleFont: {
                      family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      size: 13,
                      weight: '600',
                    },
                    bodyFont: {
                      family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      size: 13,
                    },
                    callbacks: {
                      label: (context) => `$${context.parsed.toLocaleString()}`,
                    }
                  }
                },
                cutout: '65%',
              }}
            />
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Savings</h2>
          <div className={styles.chartContainer}>
            <Line 
              data={savingsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    titleFont: {
                      family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      size: 13,
                      weight: 600,
                    },
                    bodyFont: {
                      family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      size: 13,
                    },
                    callbacks: {
                      label: (context) => `$${context.parsed.y}`,
                    }
                  }
                },
                scales: {
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      color: 'rgba(60, 60, 67, 0.12)',
                      lineWidth: 0.5,
                      drawTicks: false,
                    },
                    ticks: {
                      color: '#8e8e93',
                      font: {
                        size: 11,
                        weight: 400,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      },
                      padding: 8,
                      maxTicksLimit: 5,
                      callback: function(value) {
                        return '$' + value;
                      }
                    }
                  },
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: '#000',
                      font: {
                        size: 12,
                        weight: 400,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      },
                      padding: 8,
                    }
                  }
                },
                layout: {
                  padding: {
                    top: 8,
                    right: 8,
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 