import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers.hook";

interface User {
  id: number;
  name?: string;
}

export default function VehiclesList() {
  const { getUsers } = useUsers();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  if (!users) return <p>Loading...</p>;

  return (
    <div className="flex justify-center">
      <ul className="flex flex-col items-center">
        {users.length === 0 && <p>No Users...</p>}

        {users.map((user) => (
          <li key={user.id} className="mb-2 w-[500px] border bg-blue-900">
            <button
              className="w-full flex gap-2 justify-between p-2"
              onClick={() => {}}
            >
              <span>Id: {user.id}</span>
              <span>Name: {user.name ?? "no info"}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
