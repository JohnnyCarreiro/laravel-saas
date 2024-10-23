import type React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import type { PaginationMeta, QueryParams } from "@/types";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PagePaginationData = {
  meta: PaginationMeta;
  queryParams?: Partial<QueryParams>;
};

export const PagePagination: React.FC<PagePaginationData> = ({
  meta,
  queryParams,
}) => {
  const { current_page, last_page, links, path, per_page, to, total } = meta;
  queryParams = queryParams || {};
  if (queryParams.page) {
    // biome-ignore lint/performance/noDelete: <explanation>
    delete queryParams.page;
  }
  const urlSearchParams = new URLSearchParams(
    queryParams as Record<string, string>,
  );
  return (
    // TODO: Handle pagination in a better way , it should have more efficient page links,
    // also go to first and last page.
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            asChild
            data-current={current_page === 1}
            size="default"
            className="data-[current=true]:cursor-disabled data-[current=true]:cursor-not-allowed data-[current=true]:bg-muted data-[current=true]:text-gray-600/90 data-[current=true]:opacity-70"
          >
            <Link
              preserveScroll
              onClick={(e) => {
                if (current_page === 1 || path === window.location.href) {
                  e.preventDefault();
                }
              }}
              href={`${links.at(0)?.url ?? ""}&${urlSearchParams}`}
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
                  <Link
                    preserveScroll
                    href={`${link.url ?? ""}&${urlSearchParams}`}
                  >
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
            className="data-[current=true]:cursor-disabled data-[current=true]:cursor-not-allowed data-[current=true]:bg-muted data-[current=true]:text-gray-600/90 data-[current=true]:opacity-70 "
          >
            <Link
              preserveScroll
              onClick={(e) => {
                if (current_page === last_page) {
                  e.preventDefault();
                }
              }}
              href={`${links.at(-1)?.url ?? ""}&${urlSearchParams}`}
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
