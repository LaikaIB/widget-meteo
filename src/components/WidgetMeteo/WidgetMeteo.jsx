/* eslint-disable prettier/prettier */
import axios from 'axios';
import { useEffect, useState } from 'react';
import './WidgetMeteo.scss';

const WidgetMeteo = () => {
  const [temperature, setTemperature] = useState("-");
  const [zipcode, setZipcode] = useState("-");
  const [city, setCity] = useState("-");

  useEffect(() => {
    axios
    .get(
      'https://ip-geo-location.p.rapidapi.com/ip/check',
      {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
        }
      }
    )
    .then((response) => {
      // console.log(response.data);
      setZipcode(response.data.postcode);
      setCity(response.data.city.name);

      const latitudeFromApi = (response.data.location.latitude).toFixed(4);
      const longitudeFromApi = (response.data.location.longitude).toFixed(4);

      return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitudeFromApi}&longitude=${longitudeFromApi}&hourly=temperature_2m`);
    })
      .then((response) => {
        console.log(response.data);
        const temperatureFromApi = response.data.hourly.temperature_2m[0];
        const temperatureToDisplay = temperatureFromApi.toFixed(1);
        setTemperature(`${temperatureToDisplay} °C`);
      })
  }, []);

  return(
    <div className="app-container">
      <h1>Meteo widget</h1>
      <div className="weather-container">
        <div className="weather-info">
          <p className="weather-city">{city}</p>
          <p className="weather-zipcode">{zipcode}</p>
        </div>
        <div className="weather-temperature">
          <p>{temperature}</p>
        </div>
      </div>
    </div>
  )
};

export default WidgetMeteo;