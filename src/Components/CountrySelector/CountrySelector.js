import React, {  } from 'react';
import styles from './CountrySelector.module.css';

import { getCountries } from './../../api';


function CountrySelector(props) 
{
	return (
		<select className={styles.customSelect} 
			value={props.country} 
			onChange={(e) => {
				let index;
				if(e.target.selectedIndex === 0) {
					index = 0;
				} else {
					index = e.target.selectedIndex - 1;
				}
				let iso2 = props.countries[index].iso2;
				props.handleSelectChange(e.target.value, iso2)} 
			}>
		  <option value="">-- Select a Country --</option>
		  {props.countries.map((element, index, array) => {
		  	return (
		  		<option 
		  			key={index} 
		  			value={element.name}
		  			title={element.iso2}
		  		>{element.name}</option>
		  	);
		  })}
		</select>
	);
}

export default CountrySelector;
