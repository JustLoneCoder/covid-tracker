import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Cards, CountrySelector, Chart } from './Components';

import { getData, getCountries } from './api';

function useCountries() 
{
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (
      async function () {
        let _countries = await getCountries();
        setCountries(_countries);
      }
    )();
  }, [])

  return countries;
}

function App() 
{
  const [country, setCountry] = useState('');
  const [data, setData] = useState({});
  const [iso2, setIso2] = useState('');
  let countries = useCountries();

  useEffect(() => {
    let getdata = async () => {
      let _data = await getData(country);
      setData(_data);
    }
    getdata();
  }, [country]);

  function handleCountryChange(country, iso2) {
    setCountry(country);
    setIso2(iso2);
  }

  return (
    <div className={styles.container}>
      <img className={styles.img} src="image.png" />
      <Cards data={data} />
      <CountrySelector countries={countries} value={country} handleSelectChange={(country, iso2) => handleCountryChange(country, iso2)} />
      <Chart data={data} country={country} iso2={iso2} />
    </div>
  );
}

export default App;
