import React, { useState, useEffect } from 'react'
import {FetchData} from './Fetch'
import axios from 'axios'
import WeatherCard from './WeatherCard'
import { Weather } from './Weather'

export const Nav = () => {
    const [text, setText] = useState('')
    const [gpsCoords, setGpsCoords] = useState([])
    const [gps, setGps] = useState(false)
    const [cityKey, setCityKey] = useState([])
    const [weather, setWeather] = useState('')
    const [city, setCity] = useState([])



    const apikey = "RyXbAA7UNoCtgIyXBfGvYGauaRATt2cM" // `${process.env.REACT_APP_API_KEY}`
    const baseSearchUrl = `${process.env.REACT_APP_CITY_SEARCH_URL}`


    const handleSearch = () => {        
    }


    const handleChange = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {

        if (cityKey.length > 0)
            console.log('result loaded = ', city)
        else
            console.log('not loaded')       
        
        console.log('weatehr data', weather)
    }, [weather])




    async function getLocation() {
        if (!navigator.geolocation) {
            console.log('Geolocation not supported... please enable location service')
        }
        else {
            navigator.geolocation.getCurrentPosition((position) => {

                let lat = position.coords.latitude
                let lng = position.coords.longitude
           
                console.log('checking lat long', gpsCoords)
                const url  = baseSearchUrl + `geoposition/search?apikey=${apikey}&q=${lat},${lng}`    
                const result = fetch(url, { proxy: 'https://61d8cd7648a39c60fe746d47--flamboyant-allen-2e2a99.netlify.app/',
                cors: 'no-cors' })
                    .then(data => data.json())
                    .then(res => {
                        console.log(res);
                         setCityKey(res.Key)
                         fetchWeatherData(res.Key, res.EnglishName)
                        // setCity((prevCity)=>
                        //     [...prevCity,
                        //         {
                        //             name: res.EnglishName,
                        //             cityKey: res.Key
                        //         }
                        //     ])
                        // now fetch city weather with city key
                        console.log('noew city ', city, cityKey)
                       

                    })
                    .catch(err => console.log('err', err))


            })
        }
      
    } 


    async function fetchWeatherData(key, city) {
        console.log('city =>', city, key)
        const url = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${apikey}`
        const result = fetch(url, { proxy: 'https://61d8cd7648a39c60fe746d47--flamboyant-allen-2e2a99.netlify.app/',
        cors: 'no-cors' })
            .then(data => data.json())
            .then(res => {
                console.log('weather Data ', city);
                setWeather({weather:res, city:city})             
            })
            .catch(err => console.log('err', err))
        }

    const forecast = () => console.log('now weather = ', weather)
    return (
        <div>
            <div className='head-nav'>
                <div className="nav-logo">
                    <h2>Weather App</h2>
                </div>
                <form className="citybox" onSubmit={handleSearch}>
                    <label htmlFor="weather input">Search for</label>
                    <input
                        type="text"
                        className='searchBox'
                        placeholder="Enter name of city"
                        value={text}
                        onChange={(e) => handleChange}
                    />
                    <div className='GPS' onClick={getLocation}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt gps" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    </div>
                </form>
            </div>
            {forecast}
            
        </div>
    )
}
