import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import LogoutButton from "./logout-button.component";

export default function Navbar() {
  const { accessToken } = useAuthStore();

  return (
    <div className="flex flex-row justify-between">
      <div className="w-[300px] ">
        <nav className="flex flex-row gap-4 p-4">
          {accessToken ? (
            <>
              <Link to="/home" className="hover:text-gray-400">
                Home
              </Link>
              <Link to="/users" className="hover:text-gray-400">
                Users
              </Link>
              <Link to="/vehicles" className="hover:text-gray-400">
                Vehicles
              </Link>{" "}
            </>
          ) : null}

          {!accessToken ? (
            <>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-400">
                Register
              </Link>
            </>
          ) : null}
        </nav>
      </div>
      {accessToken ? (
        <div className="flex justify-center">
          <LogoutButton />
        </div>
      ) : null}
    </div>
  );
}
