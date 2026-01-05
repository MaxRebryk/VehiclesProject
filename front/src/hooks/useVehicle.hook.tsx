import { vehicleApi } from "../api/vehicles.api";
import { useVehicleStore } from "../store/vehicle-store";

export function useVehicle() {
  const { setVehicles, vehicles } = useVehicleStore();

  const getVehicles = async () => {
    try {
      const res = await vehicleApi.fetchVehicles();
      setVehicles(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateVehicle = async (
    id: number,
    data: {
      model?: string;
      make?: string;
      year?: number;
    }
  ) => {
    try {
      const res = await vehicleApi.updateVehicle(id, data);

      setVehicles(
        vehicles.map((v) => (v.id === id ? { ...v, ...res.data } : v))
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getVehicles,
    updateVehicle,
  };
}
