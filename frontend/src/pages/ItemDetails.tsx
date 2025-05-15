import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useGetDeliverableByIdQuery,
  useGetTaskByIdQuery,
} from "@generated/graphql-types";
import { Tag } from "@components/atoms/Tag";
import { useLocation } from "react-router-dom";
const ItemDetails = () => {
  const { type, id } = useParams();
  const parseId = Number(id);
  const { pathname } = useLocation();
  const isDeliverable = pathname.includes("/deliverables/");
  const { data: deliverableData } = useGetDeliverableByIdQuery({
    skip: !isDeliverable || !id,
    variables: { id: parseId ?? 0 },
    onCompleted: (data) => {
      console.info("Deliverable details data:", data);
    },
  });
  console.log("ID =", parseId, "type =", type);

  const { data: taskData } = useGetTaskByIdQuery({
    skip: isDeliverable || !id,
    variables: { id: parseId ?? 0 },
  });
  const item = isDeliverable
    ? deliverableData?.getDeliverable
    : taskData?.getTask;
  const deliverable = deliverableData?.getDeliverable;
  // console.log("item", item);
  console.log("deliverable", deliverableData);
  const navigate = useNavigate();
  const task = taskData?.getTask;
  // console.log("task", task);
  if (!item) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end h-full">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
          <p className="text-center text-gray-600">Chargement...</p>
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
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3"
          >
            X
          </button>
        </section>

        <section className="flex gap-4">
          <Tag text={item?.status ?? ""} />
          <Tag text={isDeliverable ? "DELIVERABLE" : "TASK"} />
        </section>

        <section className="flex flex-col gap-4 mt-4 bg-theme-lightGray p-6 rounded-md text-sm font-medium text-gray-800">
          {isDeliverable ? (
            <>
              {deliverable?.status && (
                <p className="flex justify-between">
                  <strong>Statut :</strong> {deliverable?.status}
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
                <strong>Statut :</strong>{" "}
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
            {deliverable?.perimeter ?? task?.description ?? "No Permter added"}
          </p>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
