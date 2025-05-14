import { useParams } from "react-router-dom";
// import {
//   useGetDeliverableByIdQuery,
//   useGetTaskByIdQuery,
// } from "@generated/graphql-types";

const ItemDetails = () => {
  //   const { slug, type } = useParams();
  //   const id = Number(slug?.split("-").pop());

  //   if (!id || (type !== "deliverables" && type !== "tasks")) {
  //     return <p>Not found</p>;
  //   }

  //   const { data: deliverableData } = useGetDeliverableByIdQuery({
  //     skip: type !== "deliverables",
  //     variables: { id },
  //   });

  //   const { data: taskData } = useGetTaskByIdQuery({
  //     skip: type !== "tasks",
  //     variables: { id },
  //   });

  //   const item =
  //     type === "deliverables"
  //       ? deliverableData?.getDeliverableById
  //       : taskData?.getTaskById;

  //   if (!item) return <p>Loading...</p>;

  return (
    <section className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-2">item details</h1>
      {/*
      <p className="text-sm text-gray-500 capitalize mb-4">
        {type.slice(0, -1)}
      </p>

      <div className="grid grid-cols-2 gap-2 text-sm bg-gray-100 p-2 rounded">
        {item.status && (
          <p>
            <strong>Status:</strong> {item.status}
          </p>
        )}
        {"endDate" in item && item.endDate && (
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(item.endDate).toLocaleDateString("fr-FR")}
          </p>
        )}
        {"reviewTimes" in item && (
          <p>
            <strong>Review #:</strong> {item.reviewTimes}
          </p>
        )}
      </div>

      {"perimeter" in item && (
        <>
          <h2 className="mt-4 font-semibold">Perimeter</h2>
          <p className="text-sm text-gray-600">{item.perimeter}</p>
        </>
      )}

      {"description" in item && (
        <>
          <h2 className="mt-4 font-semibold">Description</h2>
          <p className="text-sm text-gray-600">{item.description}</p>
        </>
      )} */}
    </section>
  );
};

export default ItemDetails;
