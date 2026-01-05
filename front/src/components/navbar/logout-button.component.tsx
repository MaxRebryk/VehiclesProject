import { useAuth } from "../../hooks/useAuth.hook";

export default function LogoutButton() {
  const { logout } = useAuth();

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={() => onLogout()}>Logout</button>;
}
