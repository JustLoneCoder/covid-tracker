import React, {  } from 'react';
import styles from './Cards.module.css';

function Card(props) 
{
	return (
		<div className={styles.card}>
			<div className={styles.medium}>{ props.case }</div>
			{props.children ? props.children : <div className={styles.big}>{ props.value }</div> }
			{props.children ? props.children : <div className={styles.medium}>{ props.lastUpdate }</div> }
			<div>{ props.description }</div>
			<div className={styles.cardFooter} style={props.style}></div>
		</div>
	);
}

function Cards(props) 
{
	let confirmed, deaths, recovered, lastUpdate;
	if(Object.keys(props.data).length !== 0) {
		confirmed = props.data.confirmed.value;
		deaths = props.data.deaths.value;
		recovered = props.data.recovered.value;
		lastUpdate = props.data.lastUpdate
		lastUpdate = new Date(lastUpdate).toDateString();
	}

	return (
		<div className={styles.container}>
			<Card 
				value={confirmed}
				case="confirmed"
				description="number of confirmed case"
				lastUpdate={lastUpdate}
				style={{backgroundColor: 'blue'}}
			>{Object.keys(props.data).length !== 0 ? '' : <div className={styles.medium}>{ 'Loading...' }</div>}</Card>
			<Card 
				value={deaths}
				case="deaths"
				description="number of deaths"
				lastUpdate={lastUpdate}
				style={{backgroundColor: 'red'}}
			>{Object.keys(props.data).length !== 0 ? '' : <div className={styles.medium}>{ 'Loading...' }</div>}</Card>
			<Card 
				value={recovered}
				case="recovered"
				description="number of recovered"
				lastUpdate={lastUpdate}
				style={{backgroundColor: 'green'}}
			>{Object.keys(props.data).length !== 0 ? '' : <div className={styles.medium}>{ 'Loading...' }</div>}</Card>
		</div>
	);
}

export default Cards;
