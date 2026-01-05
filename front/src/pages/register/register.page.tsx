import RegisterForm from "./components/register-form.component";
export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-2 justify-start items-center h-screen">
      <h1 className="text-2xl font-bold">Register</h1>
      <RegisterForm />
    </div>
  );
}
