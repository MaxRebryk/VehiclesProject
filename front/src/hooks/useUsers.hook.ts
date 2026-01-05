import { userApi } from "../api/user.api";

export function useUsers() {
  const getUsers = async () => {
    const data = await userApi.getAll();
    return data.data;
  };

  return {
    getUsers,
  };
}
