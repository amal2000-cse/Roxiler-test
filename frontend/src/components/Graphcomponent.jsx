import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Graphcomponent = ({ month }) => {
    const [chartData, setChartData] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const filteredTransactions = data.filter(transaction => {
                    const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
                    return transactionMonth === month;
                });
                setTransactions(filteredTransactions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [month]);
    console.log(transactions)

    useEffect(() => {
        const chartData = {
            labels: transactions.map(item => item.dateOfSale),
            datasets: [
                {
                    label: 'Total Sale Amount',
                    data: transactions.map(item => item.price),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Total Sold Items',
                    data: transactions.map(item => item.sold ? 1 : 0),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        };
        setChartData(chartData);
    }, [transactions]);

    return (
        <div className='chart'>
            {transactions.length > 0 && (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                            title: {
                                display: true,
                                text: "Total Sale Amount and Total Sold Items"
                            }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Graphcomponent;
