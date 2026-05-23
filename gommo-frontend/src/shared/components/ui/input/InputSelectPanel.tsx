"use client";

import clsx from "clsx";
import {Check} from "lucide-react";
import type {SelectItem} from "@/shared/components/ui/input/select-item.types";

type InputSelectPanelProps = {
    listId: string;
    items: SelectItem[];
    activeIndex: number;
    selectedValue?: string;
    onPick: (item: SelectItem) => void;
    onHighlight: (index: number) => void;
    emptyMessage?: string;
    footer?: React.ReactNode;
    className?: string;
};

export function InputSelectPanel({
                                     listId,
                                     items,
                                     activeIndex,
                                     selectedValue,
                                     onPick,
                                     onHighlight,
                                     emptyMessage = "Nenhum item encontrado",
                                     footer,
                                     className,
                                 }: InputSelectPanelProps) {
    return (
        <div
            className={clsx(
                "absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-base-300/80 bg-base-100 shadow-lg shadow-base-content/5",
                className,
            )}
        >
            {items.length === 0 ? (
                <p className="px-3 py-2.5 text-xs text-base-content/50">{emptyMessage}</p>
            ) : (
                <ul id={listId} role="listbox" className="max-h-60 overflow-y-auto py-1">
                    {items.map((item, index) => {
                        const selected = item.value === selectedValue;
                        const active = index === activeIndex;
                        return (
                            <li
                                key={item.value}
                                role="option"
                                aria-selected={selected}
                                aria-disabled={item.disabled}
                                id={`${listId}-opt-${index}`}
                                className={clsx(
                                    "flex cursor-pointer items-start gap-2 px-3 py-2 text-sm transition-colors",
                                    item.disabled && "pointer-events-none opacity-45",
                                    active && "bg-primary/10 text-primary",
                                    !active && "hover:bg-base-200",
                                )}
                                onMouseEnter={() => onHighlight(index)}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => !item.disabled && onPick(item)}
                            >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{item.label}</span>
                    {item.description && (
                        <span className="mt-0.5 block truncate text-[11px] text-base-content/50">
                      {item.description}
                    </span>
                    )}
                </span>
                                {selected && <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden/>}
                            </li>
                        );
                    })}
                </ul>
            )}
            {footer}
        </div>
    );
}
