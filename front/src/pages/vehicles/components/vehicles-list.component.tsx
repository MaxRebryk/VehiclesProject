import { useEffect, useState } from "react";
import { useVehicle } from "../../../hooks/useVehicle.hook";
import { useVehicleStore } from "../../../store/vehicle-store";
import EditVehicleModal from "./edit-vehicle-modal.component";

export default function VehiclesList() {
  const { vehicles } = useVehicleStore();
  const { getVehicles } = useVehicle();
  const [selectedVehicleId, setSelectedVehicleId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    getVehicles();
  }, []);

  if (!vehicles) return <p>Loading...</p>;

  return (
    <div className="flex justify-center">
      <ul className="flex flex-col items-center">
        {vehicles.length === 0 && <p>No Vehicles...</p>}

        {vehicles.map((vehicle) => (
          <li key={vehicle.id} className="mb-2 w-[500px] border bg-blue-900">
            <button
              className="w-full flex gap-2 justify-between p-2"
              onClick={() => setSelectedVehicleId(vehicle.id)}
            >
              <span>Id: {vehicle.id}</span>
              <span>Model: {vehicle.model ?? "no info"}</span>
              <span>Make: {vehicle.make ?? "no info"}</span>
              <span>Year: {vehicle.year ?? "no info"}</span>
            </button>
          </li>
        ))}
      </ul>

      <EditVehicleModal
        open={selectedVehicleId !== undefined}
        vehicleId={selectedVehicleId}
        onClose={() => setSelectedVehicleId(undefined)}
      />
    </div>
  );
}
