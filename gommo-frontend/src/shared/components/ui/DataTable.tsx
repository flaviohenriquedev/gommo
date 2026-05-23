"use client";

import clsx from "clsx";
import get from "lodash/get";
import type { MouseEvent, ReactNode } from "react";
import { badgeClassForStatus, formatCellValue } from "@/shared/lib/table/format-cell-value";
import { TableDataType, type TableColumnConfig } from "@/shared/types/table.types";

export type DataTableProps<T extends object> = {
  data: T[];
  columns: TableColumnConfig[];
  rowKey?: string;
  emptyMessage?: string;
  compact?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
  onRowClick?: (row: T) => void;
  renderActions?: (row: T) => ReactNode;
  actionsHeader?: string;
  actionsClassName?: string;
};

function alignClass(align?: TableColumnConfig["align"]) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

function renderCellContent(value: unknown, dataType?: TableDataType): ReactNode {
  if (dataType === TableDataType.EMAIL && value) {
    const email = String(value);
    return (
      <a
        href={`mailto:${email}`}
        className="text-digital-blue-600 underline-offset-2 hover:underline"
      >
        {email}
      </a>
    );
  }

  if (dataType === TableDataType.BADGE && value != null && value !== "") {
    return (
      <span
        className={clsx(
          "badge badge-sm rounded-lg border-0 px-2 py-0.5 font-semibold",
          badgeClassForStatus(value),
        )}
      >
        {formatCellValue(value, TableDataType.BADGE)}
      </span>
    );
  }

  const formatted = formatCellValue(value, dataType);
  const isNumeric =
    dataType === TableDataType.CPF ||
    dataType === TableDataType.PHONE ||
    dataType === TableDataType.FLOAT ||
    dataType === TableDataType.CURRENCY ||
    dataType === TableDataType.PERCENT;

  return (
    <span className={clsx("text-sm", isNumeric && "tabular-nums")}>{formatted}</span>
  );
}

export function DataTable<T extends object>({
  data,
  columns,
  rowKey = "id",
  emptyMessage = "Nenhum registro encontrado.",
  compact = true,
  striped = false,
  stickyHeader = true,
  onRowClick,
  renderActions,
  actionsHeader = "Ações",
  actionsClassName,
}: DataTableProps<T>) {
  const hasActions = Boolean(renderActions);
  const colSpan = columns.length + (hasActions ? 1 : 0);
  const stopRowClick = (e: MouseEvent) => e.stopPropagation();

  return (
    <div className="overflow-x-auto">
      <table
        className={clsx(
          "table w-full min-w-[640px]",
          compact && "table-sm",
          striped && "table-zebra",
        )}
      >
        <thead
          className={clsx(
            stickyHeader && "sticky top-0 z-[1]",
            "bg-digital-blue-50/60 backdrop-blur-sm",
          )}
        >
          <tr className="border-b border-digital-blue-100/70">
            {columns.map((col) => (
              <th
                key={col.id}
                className={clsx(
                  "bg-transparent",
                  alignClass(col.align),
                  col.headerClassName,
                )}
              >
                {col.columnName}
              </th>
            ))}
            {hasActions && (
              <th className={clsx("bg-transparent text-right", actionsClassName)}>
                {actionsHeader}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={colSpan}
                className="py-20 text-center text-sm text-base-content/38"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const key = String(get(row, rowKey) ?? index);
              const clickable = Boolean(onRowClick);

              return (
                <tr
                  key={key}
                  onClick={clickable ? () => onRowClick?.(row) : undefined}
                  className={clsx(
                    "border-digital-blue-50/80 transition-colors duration-100",
                    striped && index % 2 === 0 && "bg-digital-blue-50/30",
                    clickable && "cursor-pointer hover:bg-digital-blue-50/60",
                    !striped && !clickable && "hover:bg-base-200/50",
                  )}
                >
                  {columns.map((col) => {
                    const raw = get(row, col.fieldValue);
                    const isPrimary = col.fieldValue === columns[0]?.fieldValue;

                    return (
                      <td
                        key={col.id}
                        className={clsx(
                          alignClass(col.align),
                          isPrimary && "font-semibold text-base-content",
                          !isPrimary && "text-base-content/70",
                          col.className,
                        )}
                      >
                        {renderCellContent(raw, col.dataType)}
                      </td>
                    );
                  })}
                  {hasActions && (
                    <td className={clsx("text-right", actionsClassName)}>
                      <div className="flex justify-end gap-1" onClick={stopRowClick}>
                        {renderActions?.(row)}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
