export interface WeatherProps {
  name: string;
  main: {
    temp: string;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
}

export type WeatherState = {
  weather: WeatherProps | null;
  isLoading: boolean;
  error: string | null;
  searchCity: string;
};

type WeatherAction =
  | { type: "SET_WEATHER"; payload: WeatherProps }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SEARCH_CITY"; payload: string };

export const weatherReducer = (state: WeatherState, action: WeatherAction) => {
  switch (action.type) {
    case "SET_WEATHER":
      return {
        ...state,
        weather: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_SEARCH_CITY":
      return { ...state, searchCity: action.payload };
    default:
      return state;
  }
};
