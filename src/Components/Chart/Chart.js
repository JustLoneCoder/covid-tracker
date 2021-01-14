import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

import { getDailyData } from './../../api';

function useDailyData(country) 
{
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		(
			async function () {
				let _dailyData = await getDailyData(country);
				setDailyData(_dailyData);
			}
		)();
	}, [country]);

	return dailyData;
}

function Chart(props) 
{
	let dailyData = useDailyData(props.iso2);
	console.log(props.iso2);

	let dataChart = 
		dailyData ? (
		<Line 
			width={770}
			height={385}
			data={{
		        labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
		        datasets: [{
		            label: 'Infected',
		            data: dailyData.map((data) => data.confirmed),
		            borderColor: '#3333ff',
		            fill: true
		        },
		        {
		        	label: 'Deaths',
		        	data: dailyData.map((data) => data.deaths),
		        	borderColor: 'red',
		        	backgroundColor: 'rgba(255, 0, 0, 0.5)',
		        	fill: true
		        },
		        {
		        	label: 'Recovered',
		        	data: dailyData.map((data) => data.recovered),
		        	borderColor: 'green',
		        	backgroundColor: 'rgba(0, 255, 0, 0.5)',
		        	fill: true
		        }]
		    }}
		    options={{
	          legend: { display: false },
	          title: { display: true, text: 'Current state in ' + (props.country ? props.country : 'Global') },
	        }}
		/>
	) : (
		<Bar
	        data={{
	          labels: ['Infected', 'Recovered', 'Deaths'],
	          datasets: [
	            {
	              label: 'People',
	              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
	              data: [props.data.confirmed.value, props.data.recovered.value, props.data.deaths.value],
	            },
	          ],
	        }}
	        options={{
	          legend: { display: false },
	          title: { display: true, text: `Current state in ${props.country}` },
	        }}
	    />
	);

	return (
		<div className={styles.chart}>
			{ dataChart }
		</div>
	);
}

export default Chart;
