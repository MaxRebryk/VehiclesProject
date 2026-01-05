import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginForm } from "../types";
import { useAuth } from "../../../hooks/useAuth.hook";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await login(data.email, data.password);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="flex flex-col gap-2 w-[500px] justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="email">Email</label>
      <input defaultValue="email" {...register("email")} />

      {/* include validation with required or other standard HTML validation rules */}
      <label htmlFor="password">Password</label>
      <input {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && (
        <span className="text-red-500">This field is required</span>
      )}

      <button type="submit">Login</button>
    </form>
  );
}
