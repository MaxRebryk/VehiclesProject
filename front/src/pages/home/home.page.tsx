import { useAuthStore } from "../../store/auth-store";

export default function HomePage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="text-2xl font-bold">Vehicle Service Platform</h1>
      <h2>Welcome back {user?.name}</h2>
    </div>
  );
}
