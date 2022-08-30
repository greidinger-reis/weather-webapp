import axios, { AxiosResponse } from "axios";
import { env } from "../../env/server.mjs";
import { proBaseUrl } from "../../utils/constants";
import { CityMinMax } from "./../../types/CityWeatherMinMax";
import { capitalCities, defaultParams } from "./../../utils/constants";
import { createRouter } from "./context";

export const weatherRouter = createRouter().query("getCapitalsCurrentWeather", {
  async resolve() {
    const capitalCitiesWeatherData: CityMinMax[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<AxiosResponse<any, any>>[] = [];
    capitalCities.map((city) => {
      promises.push(
        axios.get(
          `${proBaseUrl}?q=${city},BR${defaultParams}&APPID=${env.NEXT_PUBLIC_OWM_API_KEY}`
        )
      );
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
});
