"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import dynamic from "next/dynamic";

const Pagination = dynamic(() => import("@mui/material/Pagination"));
const Stack = dynamic(() => import("@mui/material/Stack"));

type PaginationControlsProps = {
  totalPages: number;
  currentPage: number;
};

export default function PaginationControls({
  totalPages,
  currentPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(value));
      router.push(`${pathname}?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, pathname, searchParams],
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mb-10">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="text"
          size="large"
        />
      </Stack>
    </div>
  );
}
