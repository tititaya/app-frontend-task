import React, { useState } from "react";
import FormDialog from "./dialog/dialog";
import FormDialogo from "./dialog/dialo";

const Card = (props) => {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  const cardOpen = () => setOpen(true);
  const cardOpens = () => setOpens(true);
  const handleClose = () => setOpen(false);
  const handleDeleteGame = () => props.onDelete(props.id);

  const StatusBadge = ({ statut }) => {
    const badgeStyles = {
      Valide:
        "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300",
      Close:
        "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300",
      "En Cours":
        "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeStyles[statut]}`}>{statut}</span>
    );
  };

  const PrioriteBadge = ({ priorite }) => {
    const badgeStyles = {
      Basse:
        "bg-pink-200 text-gray-900 dark:bg-green-900 dark:text-green-300",
      Moyenne:
        "bg-blue-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      Haute:
        "bg-yellow-200 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeStyles[priorite]}`}>{priorite}</span>
    );
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        id={props.id}
        name={props.name}
        description={props.description}
        priorite={props.priorite}
        statut={props.statut}
      />
      <FormDialogo
        open={opens}
        setOpen={setOpens}
        id={props.id}
        name={props.name}
        description={props.description}
        priorite={props.priorite}
        statut={props.statut}
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 p-4 border border-gray-400 rounded-lg bg-gray-50 shadow hover:shadow-lg transition-transform hover:scale-[1.02]">
        <div className="mb-2 md:mb-0">
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">{props.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{props.description}</p>
          <div className="flex gap-4 mt-2">
            <p className="flex items-center gap-1">
              Priorité: <PrioriteBadge priorite={props.priorite} />
            </p>
            <p className="flex items-center gap-1">
              Statut: <StatusBadge statut={props.statut} />
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={cardOpens}
            className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
              />
            </svg>
            Actions
          </button>
          <button
            onClick={cardOpen}
            className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm hover:bg-yellow-500 transition"
          >
            Modifier
          </button>
          <button
            onClick={handleDeleteGame}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;

