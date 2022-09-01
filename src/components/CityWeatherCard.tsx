import { ArrowDown, ArrowUp } from "phosphor-react";
import { FC } from "react";
import { trpc } from "../utils/trpc";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Spinner from "./Spinner";

const CityWeatherCard: FC<{ city: string }> = ({ city }) => {
  const { data, isLoading } = trpc.useQuery([
    "weather.getCityDetailedWeather",
    { city },
  ]);

  if (isLoading) return <Spinner />;
  if (!data)
    return (
      <span className="text-2xl font-bold text-white">
        Cidade não encontrada.
      </span>
    );

  const {
    country,
    description,
    feels_like,
    humidity,
    name,
    temp_max,
    temp_min,
    temp_now,
    wind,
  } = data.current;

  const { weekDaysForecast } = data.forecast;

  return (
    <div className="flex w-full flex-col items-center bg-white py-4 px-4 text-gray-900 shadow-inner transition-all ease-in-out xs:w-fit xs:rounded xs:px-8">
      <div className="pb-2">
        <p className="text-center text-sm">
          {name}, {country}
        </p>
        <p className="text-3xl font-bold">
          {Math.round(temp_now)}°C{" "}
          <span className="capitalize">{description}</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center font-bold">
          <ArrowDown className="text-amber-600" />
          {Math.round(temp_min)}°
          <ArrowUp className="text-amber-600" />
          {Math.round(temp_max)}°
        </div>
        <p>
          Sensação <span className="font-bold">{Math.round(feels_like)}°C</span>
        </p>
        <p>
          Vento <span className="font-bold">{Math.round(wind)}km/h</span>
        </p>
        <p>
          Umidade <span className="font-bold">{humidity}%</span>
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        {weekDaysForecast.map(({ date, min, max }) => (
          <div
            className="flex flex-col font-bold capitalize"
            key={date.valueOf()}
          >
            <p className="text-sm xs:text-base">
              {format(date, "EEE", { locale: ptBR })}
            </p>
            <p className="flex justify-center text-[12px] text-amber-600 xs:text-sm">
              {Math.round(min)}° {Math.round(max)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityWeatherCard;
