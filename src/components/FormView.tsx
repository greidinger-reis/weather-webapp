import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";

const FormView = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log("hello");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
      <input
        className="rounded px-4 py-2"
        type="text"
        placeholder="Insira aqui o nome da cidade"
        {...register("cityName", { required: true })}
      />
      <button type="submit" className="-ml-10 h-full rounded bg-white px-2">
        <MagnifyingGlass size={20} />
      </button>
    </form>
  );
};

export default FormView;
