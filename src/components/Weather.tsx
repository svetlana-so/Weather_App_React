import React, { useCallback, useEffect, useReducer, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import {
  weatherReducer,
  WeatherProps,
  WeatherState,
} from "../weatherState/weatherState";
import { ThemeContext } from "../context/darkMode";
import { ThemeBtn } from "./ThemeBtn";

const initialState: WeatherState = {
  weather: null,
  isLoading: false,
  error: null,
  searchCity: "",
};

export const Weather = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  const url = process.env.REACT_APP_URL;
  const { themeMode } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const renderIcon = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#c8e8ed";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#f7fdb1";
        break;

      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#d1d1d1";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#d1d1d1";
        break;

      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#f7fdb1";
    }
    return <span style={{ color: iconColor, fontSize: '84px' }} > {iconElement}</span>;
  };

  const fetchCurrentWeather = useCallback(
    async (lat: number, lon: number) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const fullURL = `${url}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const response = await axios.get(fullURL);
        return response.data;
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch weather data.",
        });
        console.error(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [api_key, url],
  );

  const fetchWeatherData = async (city: string) => {
    try {
      const fullURL = `${url}weather?q=${city}&appid=${api_key}&units=metric`;
      const response = await axios.get(fullURL);
      return response.data as WeatherProps;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch weather data." });
      console.error(error);
    }
  };

  const handleSearch = async () => {
    if (state.searchCity.trim() === "") {
      return;
    }
    try {
      const currentResult = await fetchWeatherData(state.searchCity);
      if (currentResult) {
        dispatch({ type: "SET_WEATHER", payload: currentResult });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch weather data.",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch weather data." });
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
          ([currentWeather]) => {
            console.log(currentWeather);
            dispatch({ type: "SET_WEATHER", payload: currentWeather });
          },
        );
      });
    };
    fetchData();
  }, [fetchCurrentWeather]);

  return (
    <div className={`font-mono w-full h-screen flex flex-col justify-start  ${themeMode === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className="m-2 flex justify-end">
         <ThemeBtn  />
         </div>
     
      <div className="flex flex-row gap-2 m-4 p-4 justify-center items-center">
      <div className="">
        <input
        className={`px-2 border border-gray-200 ${themeMode === 'light' ? 'text-gray-600' : 'text-gray-800 bg-gray-200'} text-sm rounded-lg`}
          type="text"
          placeholder="city"
          value={state.searchCity}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_CITY", payload: e.target.value })
          }
        />
      </div>
      <div className="searchCircle">
        <AiOutlineSearch onClick={handleSearch} style={{ fontSize: '20px', color: '#5c5470' }}/>
      </div>
      </div>
      
      {state.isLoading && <RiLoaderFill className="loader" /> }
      {state.error && <p className="text-red-600">{state.error}</p>}
      {state.weather && (
        <div className="flex flex-col gap-6 justify-center text-center">
          <div className="weatherArea flex flex-col gap-4">
            <h1 className={`text-2xl  ${themeMode === 'light' ? 'text-gray-800' : 'text-gray-300'}`} >{state.weather.name}</h1>
            <span className={`${themeMode === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>{state.weather.sys.country}</span>
            <div className="icon flex justify-center" >
              {renderIcon(state.weather.weather[0].main)}
            </div>
            <h1 className={`text-4xl  ${themeMode === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>{parseFloat(state.weather.main.temp).toFixed(0)}°C</h1>
            <h2 className={` ${themeMode === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>{state.weather.weather[0].main}</h2>
          </div>
          <div className="buttomInfoArea flex flex-row justify-center gap-8">
            <div className={`humidity ${themeMode === 'light' ? 'text-gray-800' : 'text-gray-300'} flex flex-row items-center`}>
              <WiHumidity style={{ fontSize: '50px', color: '#79c2d0' }}/>
              <div className="m-2 humidInfo flex flex-col items-start">
                <h1>{state.weather.main.humidity}%</h1>
                <p>Humidity</p>
              </div>
            </div>
            <div className="text-2xl flex items-center text-gray-500">|</div>
            <div className={`wind ${themeMode === 'light' ? 'text-gray-800' : 'text-gray-300'} flex flex-row items-center`}>
                <FaWind style={{ fontSize: '30px', color: '#79c2d0' }}/>
                <div className="m-2 p-2 windInfo flex flex-col items-start text-left">
                  <h1>{state.weather.wind.speed.toFixed(0)} km/h</h1>
                  <p>Wind speed</p>
                </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
