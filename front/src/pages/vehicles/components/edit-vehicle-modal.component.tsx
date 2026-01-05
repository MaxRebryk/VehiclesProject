import Modal from "../../../components/modal/modal.component";
import EditVehicleForm from "./edit-vehicle-form.component";

type EditVehicleModalProps = {
  open: boolean;
  vehicleId?: number;
  onClose?: () => void;
};

export default function EditVehicleModal({
  open,
  vehicleId,
  onClose,
}: EditVehicleModalProps) {
  return (
    <Modal open={open}>
      <div className="w-[1000px] h-[800px] flex justify-center items-center bg-[#1a1a1a] relative rounded-[20px] ">
        <div className="flex flex-row justify-between absolute top-2 right-2">
          <div></div>
          <button onClick={onClose}>Close</button>
        </div>
        <div>
          {vehicleId && (
            <EditVehicleForm
              id={vehicleId}
              model={null}
              make={null}
              year={null}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
