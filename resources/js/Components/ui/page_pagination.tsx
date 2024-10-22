import type React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import type { PaginationData } from "@/types";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PagePaginationData = {
  meta: PaginationData;
};

export const PagePagination: React.FC<PagePaginationData> = ({ meta }) => {
  const { current_page, last_page, links, path, per_page, to, total } = meta;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            asChild
            data-current={current_page === 1}
            size="default"
            className="data-[current=true]:disabled data-[current=treu]:cursor-not-allowed data-[current=true]:bg-muted data-[current=true]:text-gray-600/90 data-[current=true]:opacity-70"
          >
            <Link
              preserveScroll
              href={current_page === 1 ? null : (links.at(0)?.url ?? "")}
            >
              <span className="flex items-center gap-1 align-between">
                <ChevronLeft className="h-4 w-4" /> Previous
              </span>
            </Link>
          </PaginationLink>
        </PaginationItem>
        {links.map((link, index) => {
          if (index !== 0 && index !== links.length - 1) {
            return (
              <PaginationItem key={link.label}>
                <PaginationLink asChild isActive={link.active}>
                  <Link preserveScroll href={link.url ?? ""}>
                    {link.label}
                  </Link>
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        <PaginationItem>
          <PaginationLink
            asChild
            data-current={current_page === last_page}
            size="default"
            className="data-[current=true]:disabled data-[current=treu]:cursor-not-allowed data-[current=true]:bg-muted data-[current=true]:text-gray-600/90 data-[current=true]:opacity-70 "
          >
            <Link
              preserveScroll
              href={
                current_page === last_page ? null : (links.at(-1)?.url ?? "")
              }
            >
              <span className="flex items-center gap-1 align-between">
                Next <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
