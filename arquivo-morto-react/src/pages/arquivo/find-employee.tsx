import React from "react";
import type { findEmployeeProps } from "../../interfaces";
import { Link } from "react-router-dom";

export const FindEmployee: React.FC<findEmployeeProps> = ({ resultado }) => {
  return (
    <div className="space-y-2.5">
      {resultado.length > 0 ? (
        <div className="px-4 py-2.5 bg-zinc-100  shadow flex items-center gap-3">
          <span className="text-zinc-900">Nome Funcionario</span>
          <span className="text-zinc-900 text-sm ml-auto">Nascimento</span>
          <span className="text-zinc-900 text-sm ml-auto">Admissão</span>
          <span className="text-zinc-900 text-sm ml-auto">Rescisão</span>
        </div>
      ) : (
        ""
      )}
      {resultado.map((res) => {
        return (
            <Link to={`/arquivo/${res.id}`} key={res.id}>
            <div className="px-4 py-2.5 bg-zinc-100 shadow flex items-center gap-3 hover:cursor-pointer">
              <span className="text-zinc-900">{res.name}</span>{" "}
              <span className="text-zinc-900 text-sm ml-auto">
                {new Date(res.birthDate).toLocaleDateString()}
              </span>{" "}
              <span className="text-zinc-900 text-sm ml-auto">
                {new Date(res.admissionDate).toLocaleDateString()}
              </span>{" "}
              <span className="text-zinc-900 text-sm ml-auto">
                {res.terminationDate
                  ? new Date(res.terminationDate).toLocaleDateString()
                  : "Ativo"}
              </span>{" "}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
