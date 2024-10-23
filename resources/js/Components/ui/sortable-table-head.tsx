import type React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TableHead } from "./table";

type SortableHeadProps = {
  fieldName: string;
  sortField: string | null;
  sortDirection: string | null;
  children?: React.ReactNode;
  handleSortBy: (fieldName: string) => void;
};

// TODO: Change it to TableHeading and user it as default for sortable and unsortable head
// components
export const SortableTableHead: React.FC<SortableHeadProps> = ({
  fieldName,
  sortField,
  sortDirection,
  children,
  handleSortBy,
}) => {
  return (
    <TableHead
      onClick={() => {
        handleSortBy(fieldName);
      }}
      className="cursor-pointer px-3 py-2"
    >
      <span className="flex items-center justify-between gap-2">
        {children ?? fieldName}
        <div>
          <ChevronUp
            data-active={sortField === fieldName && sortDirection === "asc"}
            className="size-4 data-[active=true]:font-extrabold data-[active=true]:text-gray-900"
          />
          <ChevronDown
            data-active={sortField === fieldName && sortDirection === "desc"}
            className="size-4 data-[active=true]:font-extrabold data-[active=true]:text-gray-900"
          />
        </div>
      </span>
    </TableHead>
  );
};
