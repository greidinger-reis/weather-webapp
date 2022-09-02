import {
  City,
  CityDetailedWeather,
  currentWeatherData,
} from "./../../types/CityWeather";
import axios, { AxiosResponse } from "axios";
import { env } from "../../env/server.mjs";
import { baseGeoUrl, proBaseUrl } from "../../utils/constants";
import { CityMinMax } from "../../types/CityWeather";
import { capitalCities, defaultParams } from "./../../utils/constants";
import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const getWeatherByCity = (city: string) =>
  axios.get(
    `${proBaseUrl}/weather?q=${city},BR${defaultParams}&APPID=${env.NEXT_PUBLIC_OWM_API_KEY}`
  );

const getDetailedWeatherByCity = (city: string) => {
  return axios.get(
    `${proBaseUrl}/forecast/daily?q=${city},BR${defaultParams}&APPID=${env.NEXT_PUBLIC_OWM_API_KEY}&cnt=6`
  );
};

const getCities = (query: string) =>
  axios.get(
    `${baseGeoUrl}/direct?q=${query},BR&limit=3&appid=${env.NEXT_PUBLIC_OWM_API_KEY}`
  );

export const weatherRouter = createRouter()
  .query("getCapitalsCurrentWeather", {
    async resolve() {
      const capitalCitiesWeatherData: CityMinMax[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const promises: Promise<AxiosResponse<any, any>>[] = [];
      capitalCities.map((city) => {
        promises.push(getWeatherByCity(city));
      });
      await Promise.all(promises).then((results) => {
        results.map((result) => {
          const { temp_max, temp_min } = result.data.main;
          const { name } = result.data;
          const weather = { name, temp_max, temp_min } as unknown as CityMinMax;
          capitalCitiesWeatherData.push(weather);
        });
      });
      console.log(capitalCitiesWeatherData);

      return capitalCitiesWeatherData;
    },
  })
  .query("getCityDetailedWeather", {
    input: z.object({
      city: z.string(),
    }),
    async resolve({ input }) {
      const { city } = input;
      if (!city)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "City is required",
        });

      return await getDetailedWeatherByCity(city).then(async (result) => {
        // gets the current time weather data
        const current = await getWeatherByCity(city).then((result) => {
          const {
            temp: temp_now,
            feels_like,
            humidity,
          }: currentWeatherData = result.data.main;
          const description: string = result.data.weather[0].description;
          const wind: number = result.data.wind.speed;
          const name: string = result.data.name;
          return {
            temp_now,
            feels_like,
            humidity,
            description,
            wind,
            name,
          };
        });

        // gets the forecast weather data
        const foreCastDays = result.data.list as [];
        const weekDaysForecast = foreCastDays.map(
          (day: { dt: number; temp: { min: number; max: number } }) => {
            const date = new Date(day.dt * 1000);
            const { min, max }: { min: number; max: number } = day.temp;
            return { date, min, max };
          }
        );
        const currentDayForecast = weekDaysForecast[0];
        if (!currentDayForecast)
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Current day forecast not found",
          });

        // get the min and max temp of the current day
        const { min: temp_min, max: temp_max } = currentDayForecast;

        // remove the current day forecast from the array
        weekDaysForecast.shift();

        const data: CityDetailedWeather = {
          current: { temp_max, temp_min, ...current },
          forecast: { weekDaysForecast },
        };

        return data;
      });
    },
  })
  .query("getCities", {
    input: z.object({
      query: z.string().min(1),
    }),
    async resolve({ input }) {
      const { query } = input;
      if (!query)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Query is required",
        });

      return await getCities(query).then((result) => {
        const cities: City[] = result.data.map((city: City) => {
          return { name: city.name };
        });
        return cities;
      });
    },
  });
