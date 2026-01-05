import { useForm, type SubmitHandler } from "react-hook-form";
import type { RegisterForm } from "../types.ts";
import { useAuth } from "../../../hooks/useAuth.hook.tsx";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await register(
        data.email,
        data.name,
        data.password,
        data.confirmPassword
      );
      navigate("/login", { replace: true });
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
      <label htmlFor="name">Name</label>
      <input {...registerField("name", { required: true })} />
      {errors.name && (
        <span className="text-red-500">This field is required</span>
      )}

      <label htmlFor="email">Email</label>
      <input type="email" {...registerField("email", { required: true })} />
      {errors.email && (
        <span className="text-red-500">This field is required</span>
      )}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...registerField("password", { required: true, minLength: 6 })}
      />

      {errors.password && (
        <span className="text-red-500">
          This field is required (min 6 characters)
        </span>
      )}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        {...registerField("confirmPassword", { required: true, minLength: 6 })}
      />
      {errors.confirmPassword && (
        <span className="text-red-500">
          This field is required (min 6 characters)
        </span>
      )}

      <button type="submit">Register</button>
    </form>
  );
}
