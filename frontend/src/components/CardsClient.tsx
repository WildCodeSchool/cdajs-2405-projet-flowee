import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { ClientStatus } from "../__generated__/graphql-types";

interface CardsClientProps {
  name: string;
  email: string;
  status?: ClientStatus;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
}

export default function CardsClient({
  name,
  email,
  status = ClientStatus.Active,
  onEdit,
  onDelete,
  onArchive,
}: CardsClientProps) {
  // Calcul des initiales
  const initials = name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2); // limité à 2 lettres

  // Couleur en fonction du statut
  let statusColor = "text-theme-success";
  if (status === ClientStatus.Inactive) statusColor = "text-theme-warning";
  if (status === ClientStatus.Archived)
    statusColor = "text-theme-darkGray line-through";

  // Gestion de l'ouverture du menu à trois points
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Fermer le menu lorsqu'on clique à l'extérieur
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
    <div className="relative h-[180px] w-full min-w-[250px] max-w-[350px] md:h-[160px] rounded-lg overflow-hidden border border-gray p-5 flex flex-col justify-between font-quicksand">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-theme-veryLight flex items-center justify-center text-orange-600 font-semibold">
          {initials}
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="text-md font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
        {/* Bouton menu à trois points */}
        {(onEdit || onDelete || onArchive) && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={toggleMenu}
              className="text-theme-darkGray"
            >
              <FaEllipsisV />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                {onEdit && (
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
      <p className={`text-sm mt-2 ${statusColor}`}>{status}</p>
    </div>
  );
}
