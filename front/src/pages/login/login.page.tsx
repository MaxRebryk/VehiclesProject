import LoginForm from "./components/login-form.component";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-2 justify-start items-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
    </div>
  );
}
