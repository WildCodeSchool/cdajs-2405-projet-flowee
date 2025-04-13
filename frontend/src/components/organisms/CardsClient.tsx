import { useEffect, useRef, useState } from "react";
import { ClientStatus } from "@generated/graphql-types";
import EllipsesIcon from "@icons/Ellipses";
import ModalClient from "@components/ModalClient";
import type { ClientUI } from "@interfaces/client.types";

// Function for formatting status
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

interface CardsClientProps {
  client: ClientUI;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
}

export default function CardsClient({
  client,
  onEdit,
  onDelete,
  onArchive,
}: CardsClientProps) {
  const { id, clientName, status, account } = client;
  const email = account?.email || "N/A";

  const initials = (clientName ?? "")
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  let statusColor = "text-theme-success";
  if (status === ClientStatus.Inactive) statusColor = "text-theme-warning";
  if (status === ClientStatus.Archived) statusColor = "text-theme-error";

  const containerBg = status === ClientStatus.Archived ? "bg-lightgray" : "bg-white";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close menu when click upside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`box-border relative w-full md:w-[330px] h-[160px] rounded-[5px] border border-theme-gray
      ${containerBg} px-[13px] py-[7px] flex flex-col justify-between mt-4 font-quicksand`}
    >
      <div className="flex items-center justify-between">
        <input type="checkbox" className="w-3 h-3 cursor-pointer" />
        {(onEdit || onDelete || onArchive) && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={toggleMenu}
              className="text-theme-Gray"
            >
              <EllipsesIcon className="h-4 w-4 text-theme-darkGray" />
            </button>
            {isMenuOpen && (
              <div className=" absolute right-0 w-20 bg-white border rounded border-gray shadow-lg z-30">
                {onEdit && (
                  <button
                    type="button"
                    className="block w-full text-center px-2 pt-1 text-sm hover:bg-theme-gray"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    className="block w-full text-center px-2 pt-1 text-sm hover:bg-theme-gray"
                    onClick={() => {
                      onDelete();
                      setIsMenuOpen(false);
                    }}
                  >
                    Delete
                  </button>
                )}
                {onArchive && (
                  <button
                    type="button"
                    className="block w-full text-center px-2 py-1 text-sm hover:bg-theme-gray"
                    onClick={() => {
                      onArchive();
                      setIsMenuOpen(false);
                    }}
                  >
                    Archive
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[55px] h-[55px] rounded-full bg-theme-veryLight flex items-center justify-center text-orange-600  text-xl font-semibold">
          {initials}
        </div>
        <h2 className="text-lg font-semibold mt-3 text-center">{clientName}</h2>
        <p className={`text-sm ${statusColor}`}>{capitalize(status ?? "")}</p>
      </div>
      {isEditModalOpen && (
        <ModalClient
          id={Number(id)}
          currentName={clientName}
          currentEmail={email}
          currentStatus={status}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
