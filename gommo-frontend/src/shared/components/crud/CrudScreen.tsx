"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/shared/components/ui/Button";

export const CRUD_TAB_LIST = "list";
export const CRUD_TAB_FORM = "form";

export type CrudExtraTab = {
  id: string;
  label: string;
  content: ReactNode;
};

type CrudScreenContextValue = {
  activeTab: string;
  editingId: string | null;
  isEditing: boolean;
  goToList: () => void;
  goToForm: () => void;
  goToTab: (tabId: string) => void;
  startCreate: () => void;
  startEdit: (id: string) => void;
};

const CrudScreenContext = createContext<CrudScreenContextValue | null>(null);

export function useCrudScreen(): CrudScreenContextValue {
  const ctx = useContext(CrudScreenContext);
  if (!ctx) throw new Error("useCrudScreen deve ser usado dentro de CrudScreen");
  return ctx;
}

export type CrudScreenProps = {
  list: ReactNode;
  form: ReactNode;
  extraTabs?: CrudExtraTab[];
  listTabLabel?: string;
  formTabLabel?: string;
  formTabLabelEdit?: string;
  listToolbar?: ReactNode;
  showListToFormButton?: boolean;
  listToFormLabel?: string;
  defaultTab?: string;
};

export function CrudScreen({
  list,
  form,
  extraTabs = [],
  listTabLabel = "Listagem",
  formTabLabel = "Cadastro",
  formTabLabelEdit = "Editar",
  listToolbar,
  showListToFormButton = true,
  listToFormLabel = "Novo cadastro",
  defaultTab = CRUD_TAB_LIST,
}: CrudScreenProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [editingId, setEditingId] = useState<string | null>(null);

  const isEditing = editingId != null;

  const tabs = useMemo(
    () => [
      { id: CRUD_TAB_LIST, label: listTabLabel },
      {
        id: CRUD_TAB_FORM,
        label: isEditing && activeTab === CRUD_TAB_FORM ? formTabLabelEdit : formTabLabel,
      },
      ...extraTabs.map((t) => ({ id: t.id, label: t.label })),
    ],
    [activeTab, extraTabs, formTabLabel, formTabLabelEdit, isEditing, listTabLabel],
  );

  const goToList = useCallback(() => { setEditingId(null); setActiveTab(CRUD_TAB_LIST); }, []);
  const goToForm = useCallback(() => setActiveTab(CRUD_TAB_FORM), []);
  const startCreate = useCallback(() => { setEditingId(null); setActiveTab(CRUD_TAB_FORM); }, []);
  const startEdit = useCallback((id: string) => { setEditingId(id); setActiveTab(CRUD_TAB_FORM); }, []);
  const goToTab = useCallback((tabId: string) => setActiveTab(tabId), []);

  const ctx = useMemo(
    () => ({ activeTab, editingId, isEditing, goToList, goToForm, startCreate, startEdit, goToTab }),
    [activeTab, editingId, goToForm, goToList, goToTab, isEditing, startCreate, startEdit],
  );

  const panel =
    activeTab === CRUD_TAB_LIST
      ? list
      : activeTab === CRUD_TAB_FORM
        ? form
        : extraTabs.find((t) => t.id === activeTab)?.content ?? null;

  return (
    <CrudScreenContext.Provider value={ctx}>
      <div className="flex flex-col">

        {/* ── Tab bar ── */}
        <div
          className="flex items-center gap-0.5 overflow-x-auto overflow-y-hidden border-b border-digital-blue-100/70 px-4 pt-0.5"
          role="tablist"
          aria-label="Seções do cadastro"
        >
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`crud-panel-${tab.id}`}
                id={`crud-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "relative shrink-0 rounded-t-[6px] px-3 py-2 text-[13px] transition-colors duration-150",
                  selected
                    ? "font-semibold text-digital-blue-600"
                    : "font-medium text-base-content/40 hover:text-base-content/70",
                )}
              >
                {tab.label}
                {selected && (
                  <motion.span
                    layoutId="crud-tab-indicator"
                    className="absolute inset-x-1.5 -bottom-px h-[2px] rounded-full bg-digital-blue-500"
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Panel ── */}
        <div
          id={`crud-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`crud-tab-${activeTab}`}
          className="min-h-[12rem]"
        >
          {activeTab === CRUD_TAB_LIST && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-digital-blue-100/50 bg-digital-blue-50/30 px-4 py-2.5">
              <div className="text-[13px] text-base-content/45">
                {listToolbar ?? "Consulte os registros ou inicie um novo cadastro."}
              </div>
              {showListToFormButton && (
                <Button
                  size="sm"
                  leftIcon={<Plus className="size-3.5" strokeWidth={2.5} />}
                  onClick={startCreate}
                >
                  {listToFormLabel}
                </Button>
              )}
            </div>
          )}

          {panel}
        </div>
      </div>
    </CrudScreenContext.Provider>
  );
}
