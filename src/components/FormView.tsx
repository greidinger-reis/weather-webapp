import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";

const FormView = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log("hello");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center rounded outline-blue-900 focus-within:outline"
    >
      <input
        className="w-fit rounded px-4 py-2 outline-none"
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
