import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { EditVehicleForm } from "../types/types";
import { useVehicle } from "../../../hooks/useVehicle.hook";

type EditVehicleProps = {
  id: number;
  model: string | null;
  make: string | null;
  year: number | null;
};

export default function EditVehicleForm(vehicle: EditVehicleProps) {
  const { register, handleSubmit, reset } = useForm<EditVehicleForm>();

  const { updateVehicle } = useVehicle();

  useEffect(() => {
    reset({
      model: vehicle.model ?? "",
      make: vehicle.make ?? "",
      year: vehicle.year ?? undefined,
    });
  }, [vehicle, reset]);

  const onSubmit: SubmitHandler<EditVehicleForm> = async (data) => {
    await updateVehicle(vehicle.id, data);
  };

  return (
    <form
      className="flex flex-col gap-2 w-[500px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Model</label>
      <input {...register("model")} />

      <label>Make</label>
      <input {...register("make")} />

      <label>Year</label>
      <input type="number" {...register("year", { valueAsNumber: true })} />

      <button type="submit">Save</button>
    </form>
  );
}
