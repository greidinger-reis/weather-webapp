import { FC } from "react";
import { CityMinMax } from "../types/CityWeatherMinMax";

const CapitalsView: FC<CityMinMax> = ({ name, temp_min, temp_max }) => {
  return (
    <tr>
      <td>{Math.round(temp_min)}°</td>
      <td>{Math.round(temp_max)}°</td>
      <td>{name}</td>
    </tr>
  );
};

export default CapitalsView;
