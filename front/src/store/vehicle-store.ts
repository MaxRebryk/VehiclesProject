import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Vehicle = {
  id: number;
  make: string | null;
  model: string | null;
  year: number | null;
  userId: string;
};

type VehicleState = {
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
};

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set) => ({
      vehicles: [],
      setVehicles: (vehicles) => set({ vehicles }),
    }),
    {
      name: "vehicles-storage",
    }
  )
);
