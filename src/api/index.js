import axios from 'axios';
const URL = 'https://covid19.mathdro.id/api';

export async function getData(country)
{
	let url = URL;
	if (country) {
		url = `${URL}/countries/${country}`;
	}

	try
	{
		const {data: data} = await axios.get(url);
		return data;
	}
	catch (err)
	{
		return err;
	}
}

export async function getCountries()
{
	try
	{
		const {data: { countries: countries }} = await axios.get(`${URL}/countries`);
		return countries;
	}
	catch (err)
	{
		return err;
	}
}

export async function getDailyData(country) 
{
	let url = "https://api.covidtracking.com/v1/states/ca/daily.json";
	if (country) {
		let _country = country.toLowerCase();
		url = `https://api.covidtracking.com/v1/states/${_country}/daily.json`;
	}

	try
	{
		const { data } = await axios.get(url);
		return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
	}
	catch (err)
	{
		return null;
	}
}