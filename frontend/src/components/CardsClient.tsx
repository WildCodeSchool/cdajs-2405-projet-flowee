import { useEffect, useRef, useState } from "react";
import { ClientStatus } from "../__generated__/graphql-types";
import EllipsesIcon from "./Icons/Ellipses";

// Function for formatting status
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

interface CardsClientProps {
  name: string;
  status?: ClientStatus;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
}

export default function CardsClient({
  name,
  status = ClientStatus.Active,
  onEdit,
  onDelete,
  onArchive,
}: CardsClientProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  let statusColor = "text-theme-success";
  if (status === ClientStatus.Inactive) statusColor = "text-theme-warning";
  if (status === ClientStatus.Archived) {
    statusColor = "text-theme-darkGray line-through";
  }

  // Handler menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
      className="box-border relative w-full md:w-[300px] lg:w-[320px] h-[180px] md:h-[160px] rounded-[5px] border border-gray
      bg-white px-[13px] py-[7px] mr-1 flex flex-col justify-between font-quicksand"
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
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                {onEdit && (
                  <button
                    type="button"
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={() => {
                      onEdit();
                      setIsMenuOpen(false);
                    }}
                  >
                    Modifier
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={() => {
                      onDelete();
                      setIsMenuOpen(false);
                    }}
                  >
                    Supprimer
                  </button>
                )}
                {onArchive && (
                  <button
                    type="button"
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={() => {
                      onArchive();
                      setIsMenuOpen(false);
                    }}
                  >
                    Archiver
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
        <h2 className="text-lg font-semibold mt-3 text-center">{name}</h2>
        <p className={`text-sm ${statusColor}`}>{capitalize(status)}</p>
      </div>
    </div>
  );
}
