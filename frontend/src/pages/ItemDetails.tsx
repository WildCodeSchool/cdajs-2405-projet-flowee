import {
  useGetDeliverableByIdQuery,
  useGetTaskByIdQuery,
} from "@generated/graphql-types";
import { Tag } from "@components/atoms/Tag";

interface ItemDetailsProps {
  id: number;
  type: "deliverable" | "task";
  onClose: () => void;
}

const ItemDetails = ({ id, type, onClose }: ItemDetailsProps) => {
  const isDeliverable = type === "deliverable";

  const { data: deliverableData, loading: loadingDeliverable } =
    useGetDeliverableByIdQuery({
      skip: !isDeliverable,
      variables: { id },
    });

  const { data: taskData, loading: loadingTask } = useGetTaskByIdQuery({
    skip: isDeliverable,
    variables: { id },
  });

  const deliverable = deliverableData?.getDeliverable;
  const task = taskData?.getTask;
  const item = isDeliverable
    ? deliverableData?.getDeliverable
    : taskData?.getTask;

  if (!item || loadingDeliverable || loadingTask) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end h-full">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end h-full">
      <div className="bg-white shadow-xl w-full h-full max-w-lg p-8 relative">
        <section>
          <h1 className="text-xl font-bold mb-2">{item?.name}</h1>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3"
          >
            X
          </button>
        </section>

        <section className="flex gap-4">
          <Tag
            text={
              isDeliverable ? deliverable?.status ?? "" : task?.status ?? ""
            }
          />
          <Tag text={isDeliverable ? "DELIVERABLE" : "TASK"} />
        </section>

        <section className="flex flex-col gap-4 mt-4 bg-theme-lightGray p-6 rounded-md text-sm font-medium text-gray-800">
          {isDeliverable ? (
            <>
              {deliverable?.status && (
                <p className="flex justify-between">
                  <strong>Status :</strong> {deliverable?.status}
                </p>
              )}
              <p className="flex justify-between">
                <strong>Deadline:</strong>
                {deliverable?.endDate
                  ? new Date(deliverable?.endDate).toLocaleDateString("fr-FR")
                  : "No date"}
              </p>

              <p className="flex justify-between">
                <strong>Review :</strong> {deliverable?.reviewTimes ?? 0}
              </p>
            </>
          ) : (
            <>
              <p className="flex justify-between">
                <strong>Status :</strong>{" "}
                {task?.status ? task?.status : "No status"}
              </p>

              <p className="flex justify-between">
                <strong>Deadline:</strong>
                {task?.endDate
                  ? new Date(task?.endDate).toLocaleDateString("fr-FR")
                  : "No date"}
              </p>
              <p className="flex justify-between">
                <strong>Deliverable: </strong>
                {task?.deliverable?.name ?? "Can't find deliverable"}
              </p>
            </>
          )}
        </section>

        <section>
          <h2 className="mt-4 font-semibold">Perimeter</h2>
          <p className="text-sm text-gray-600">
            {deliverable?.perimeter ?? task?.description ?? "No Perimter added"}
          </p>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
