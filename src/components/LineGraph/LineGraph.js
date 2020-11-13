import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import './LineGraph.css'

const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
                ticks: {
                    fontColor: "white",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontColor: "white",
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

const LineGraph = ({ casesType }) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data.cases)
                    setDailyData(buildChartData(data, casesType));
                })
        }
        fetchData();

    }, [casesType])

    const buildChartData = (data, casesType = 'cases') => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data[casesType]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }
    return (
        <div className="line__graph">
            {dailyData?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                data: dailyData,
                                backgroundColor: casesType == 'cases' ? 'rgba(204, 16, 52, 0.5)' : casesType == 'recovered' ? 'rgba(22, 165, 150, 0.5)' : 'rgba(236, 82, 75, 0.5)',
                                borderColor: casesType == 'cases' ? '#CC1034' : casesType == 'recovered' ? '#16a596' : '#ec524b',
                            }
                        ]
                    }}
                />
            )}

        </div>
    )
}

export default LineGraph
