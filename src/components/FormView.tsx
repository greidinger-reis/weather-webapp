import { MagnifyingGlass } from "phosphor-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { trpc } from "../utils/trpc";
import Spinner from "./Spinner";

interface FormData {
  cityName: string;
}

interface FormViewProps {
  setCity: (city: string) => void;
}

const FormView: FC<FormViewProps> = ({ setCity }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [input, setInput] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [debouncedCityQuery] = useDebounce(cityQuery, 600);
  const { data, isLoading } = trpc.useQuery(
    ["weather.getCities", { query: debouncedCityQuery }],
    { enabled: !!debouncedCityQuery }
  );

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    setShowDropdown(false)
    const cityName = data.cityName;

    setCity(cityName);
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex w-[95vw] max-w-[400px] items-center self-center rounded outline-amber-600 focus-within:outline xs:mt-0"
      >
        <input
          className="w-full rounded px-4 py-2 outline-none"
          type="text"
          value={input}
          placeholder="Insira aqui o nome da cidade"
          {...register("cityName", {
            required: true,
            onChange(e) {
              setCityQuery(e.target.value);
              setInput(e.target.value);
              setShowDropdown(true);
            },
          })}
        />

        <button
          type="submit"
          className="z-10 -ml-2 h-full rounded bg-white px-2"
        >
          <MagnifyingGlass size={20} />
        </button>
      </form>
      {showDropdown && debouncedCityQuery && (
        <div>
          {isLoading ? (
            <div className="absolute mt-2 flex h-[100px] w-[400px] justify-center rounded bg-white px-4 py-2 text-sm md:text-base">
              <Spinner />
            </div>
          ) : (
            data &&
            data.length > 0 && (
              <ul className="absolute mt-2 w-full max-w-[400px] rounded bg-white px-4 py-2 text-sm md:text-base">
                {data?.map((city, index) => (
                  <li
                    key={index}
                    className="mt-1 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setCity(city.name);
                      setInput(city.name);
                      setShowDropdown(false);
                    }}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FormView;
