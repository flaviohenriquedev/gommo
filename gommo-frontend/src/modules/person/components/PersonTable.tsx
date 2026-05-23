"use client";

import clsx from "clsx";
import {motion} from "framer-motion";
import type {Person} from "@/modules/person/dto/person.dto";

type PersonTableProps = {
    persons: Person[];
};

export function PersonTable({persons}: PersonTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-sm">
                <thead>
                <tr className="border-b border-base-300/60 text-[10px] font-bold uppercase tracking-wider text-base-content/40">
                    <th className="bg-transparent">Nome</th>
                    <th className="bg-transparent">CPF</th>
                    <th className="bg-transparent">Nascimento</th>
                    <th className="bg-transparent">Status</th>
                </tr>
                </thead>
                <tbody>
                {persons.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="py-14 text-center text-xs font-medium text-base-content/40">
                            Nenhuma pessoa cadastrada.
                        </td>
                    </tr>
                ) : (
                    persons.map((p, i) => (
                        <motion.tr
                            key={p.id}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.2, delay: Math.min(i * 0.02, 0.15)}}
                            className="border-base-300/40 hover:bg-base-200/60"
                        >
                            <td className="text-xs font-semibold">{p.fullName}</td>
                            <td className="text-xs tabular-nums text-base-content/60">{p.cpf}</td>
                            <td className="text-xs text-base-content/60">{p.birthDate}</td>
                            <td>
                  <span
                      className={clsx(
                          "badge badge-sm rounded-field border-0 font-bold",
                          p.status === "ACTIVE" ? "badge-success" : "bg-base-300 text-base-content/70",
                      )}
                  >
                    {p.status}
                  </span>
                            </td>
                        </motion.tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
