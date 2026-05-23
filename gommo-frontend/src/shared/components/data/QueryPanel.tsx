"use client";

import { useQuery, type QueryKey, type UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { ExceptionCapture } from "@/shared/exceptions";
import { Button } from "@/shared/components/ui/Button";

export type QueryPanelRenderProps<T> = {
  data: T;
  refetch: UseQueryResult<T>["refetch"];
  isFetching: boolean;
};

type QueryPanelProps<T> = {
  queryKey: QueryKey;
  request: () => Promise<T>;
  children: (props: QueryPanelRenderProps<T>) => ReactNode;
  fallback?: ReactNode;
  errorFallback?: (error: Error, retry: () => void) => ReactNode;
  showRefresh?: boolean;
};

function TableSkeleton() {
  return (
    <div className="grid gap-2 p-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-shimmer h-10 w-full" style={{ animationDelay: `${i * 70}ms` }} />
      ))}
    </div>
  );
}

export function QueryPanel<T>({
  queryKey,
  request,
  children,
  fallback,
  errorFallback,
  showRefresh = true,
}: QueryPanelProps<T>) {
  const query = useQuery({ queryKey, queryFn: request });

  if (query.isLoading) {
    return fallback ?? <TableSkeleton />;
  }

  if (query.isError) {
    const ex = ExceptionCapture.fromUnknown(query.error);
    const error = new Error(ex.displayMessage);
    return (
      errorFallback?.(error, () => void query.refetch()) ?? (
        <div className="m-5 rounded-xl bg-error/8 p-5">
          <p className="text-sm font-semibold text-error">{ex.displayMessage}</p>
          <Button variant="primary" size="sm" className="mt-3" onClick={() => query.refetch()}>
            Tentar novamente
          </Button>
        </div>
      )
    );
  }

  if (query.data === undefined) return null;

  return (
    <div>
      {showRefresh && (
        <div className="flex justify-end border-b border-base-300/50 px-4 py-2.5">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<RefreshCw className={`size-3.5 ${query.isFetching ? "animate-spin" : ""}`} />}
            onClick={() => query.refetch()}
            disabled={query.isFetching}
          >
            Atualizar
          </Button>
        </div>
      )}
      {children({ data: query.data, refetch: query.refetch, isFetching: query.isFetching })}
    </div>
  );
}
