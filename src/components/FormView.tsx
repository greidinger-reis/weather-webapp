import { MagnifyingGlass } from "phosphor-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  cityName: string;
}

const FormView: FC<{ setCity: (cityName: string) => void }> = ({ setCity }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    //remove accents from data.cityName
    const cityName = data.cityName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setCity(cityName);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-[95vw] max-w-[400px] items-center self-center rounded outline-amber-600 focus-within:outline xs:mt-0"
    >
      <input
        className="w-full rounded px-4 py-2 outline-none"
        type="text"
        placeholder="Insira aqui o nome da cidade"
        {...register("cityName", { required: true })}
      />
      <button type="submit" className="z-10 -ml-2 h-full rounded bg-white px-2">
        <MagnifyingGlass size={20} />
      </button>
    </form>
  );
};

export default FormView;
