import { useState } from 'react'

const WeatherApp = () => {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const API_KEY = "a88a7ac3f95caef31324147c7433a2d3";


    const getWeather = async () => {

        try {
            const res =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)

            const data = await res.json();

            if (data.cod=== 200) {
                setWeather(data)
            }
            else if (data.cod == 401){
                setWeather(null);
                alert("Bad Request");
            } else {
                setWeather(null);
                alert("City not exist")
            }
        }
        catch(error){
            console.error("Error fetching weather:",error)
        }
    }
    return (
        <>
            <div>WeatherApp</div>
            <input type='text' placeholder='Enter city name' value={city}
                onChange={(e) => setCity(e.target.value)} />
            <button onClick={getWeather}>Search</button>

            {weather && (
                <div>
                    <h2>Temparature: {weather.main.temp}°C</h2>
                    <h2>Humidity: {weather.main.humidity}</h2>
                    <h2>Wind Speed: {weather.wind.speed}</h2>
                </div>
            )}
        </>
    )
}

export default WeatherApp