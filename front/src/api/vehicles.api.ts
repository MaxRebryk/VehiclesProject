import { httpVehicle } from "./http";

export const vehicleApi = {
  fetchVehicles: () => {
    return httpVehicle.get("vehicle/all");
  },

  fetchVehicle: () => {
    return httpVehicle.get("vehicle");
  },
  createVehicle: (make: string, model: string, year: number) => {
    return httpVehicle.post("/vehicle", { make, model, year });
  },
  updateVehicle: (
    id: number,
    data: { make?: string; model?: string; year?: number }
  ) => {
    return httpVehicle.patch(`/vehicle/${id}`, data);
  },

  deleteVehicle: (id: number) => {
    return httpVehicle.delete(`/vehicle/${id}`);
  },
};
