import VehiclesList from "./components/vehicles-list.component";

export default function VehiclesPage() {
  return (
    <div className="flex flex-col justify-center gap-10">
      <h1>Vehicles</h1>
      <VehiclesList />
    </div>
  );
}
