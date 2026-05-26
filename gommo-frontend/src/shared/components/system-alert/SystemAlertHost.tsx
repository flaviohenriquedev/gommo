"use client";

import clsx from "clsx";
import {AlertCircle, AlertTriangle, CheckCircle2, Info, X} from "lucide-react";
import {useEffect, useRef} from "react";
import {Button} from "@/shared/components/ui/Button";
import {useSystemAlertStore} from "@/shared/system-alert/system-alert.store";
import type {SystemAlertVariant} from "@/shared/system-alert/system-alert.types";

const VARIANT_META: Record<
    SystemAlertVariant,
    {icon: typeof Info; alertClass: string; iconWrapClass: string}
> = {
    warning: {
        icon: AlertTriangle,
        alertClass: "alert-warning",
        iconWrapClass: "bg-warning/15 text-warning",
    },
    success: {
        icon: CheckCircle2,
        alertClass: "alert-success",
        iconWrapClass: "bg-success/15 text-success",
    },
    info: {
        icon: Info,
        alertClass: "alert-info",
        iconWrapClass: "bg-info/15 text-info",
    },
    error: {
        icon: AlertCircle,
        alertClass: "alert-error",
        iconWrapClass: "bg-error/15 text-error",
    },
};

export function SystemAlertHost() {
    const current = useSystemAlertStore((s) => s.current);
    const dismiss = useSystemAlertStore((s) => s.dismiss);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (current) {
            if (!dialog.open) dialog.showModal();
            return;
        }

        if (dialog.open) dialog.close();
    }, [current]);

    const handleClose = (confirmed: boolean) => {
        dismiss(confirmed);
        dialogRef.current?.close();
    };

    const meta = current ? VARIANT_META[current.variant] : null;
    const Icon = meta?.icon ?? Info;
    const isConfirm = current?.kind === "confirm";

    return (
        <dialog
            ref={dialogRef}
            className="system-alert-modal modal"
            aria-labelledby={current ? "system-alert-title" : undefined}
            aria-describedby={current?.message ? "system-alert-message" : undefined}
            onCancel={(e) => {
                e.preventDefault();
                handleClose(false);
            }}
            onClose={() => {
                if (useSystemAlertStore.getState().current) handleClose(false);
            }}
        >
            {current && meta ? (
            <div className="modal-box max-w-md gap-0 p-0">
                <div className={clsx("alert rounded-none border-0 shadow-none", meta.alertClass)}>
                    <span
                        className={clsx(
                            "flex size-10 shrink-0 items-center justify-center rounded-full",
                            meta.iconWrapClass,
                        )}
                    >
                        <Icon className="size-5" strokeWidth={2}/>
                    </span>
                    <div className="min-w-0 flex-1 pe-8">
                        <h3 id="system-alert-title" className="font-semibold text-base-content">
                            {current.title}
                        </h3>
                        {current.message ? (
                            <p id="system-alert-message" className="mt-1 text-sm opacity-90">
                                {current.message}
                            </p>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-circle absolute top-3 right-3"
                        aria-label="Fechar"
                        onClick={() => handleClose(false)}
                    >
                        <X className="size-4"/>
                    </button>
                </div>

                <div className="flex flex-wrap justify-end gap-2 border-t border-base-300/60 px-5 py-4">
                    {isConfirm ? (
                        <>
                            <Button variant="ghost" size="sm" onClick={() => handleClose(false)}>
                                {current.cancelLabel}
                            </Button>
                            <Button
                                variant={current.destructive ? "danger" : "primary"}
                                size="sm"
                                onClick={() => handleClose(true)}
                            >
                                {current.confirmLabel}
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" size="sm" onClick={() => handleClose(true)}>
                            {current.dismissLabel}
                        </Button>
                    )}
                </div>
            </div>
            ) : null}

            <form method="dialog" className="modal-backdrop">
                <button type="submit" aria-label="Fechar"/>
            </form>
        </dialog>
    );
}
