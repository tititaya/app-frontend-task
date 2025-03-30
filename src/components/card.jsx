import React from "react";
import "./card.css";
import FormDialog from "./dialog/dialog";
import FormDialogo from "./dialog/dialo";

const Card = (props) => {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);

  const cardOpen = () => {
    setOpen(true);
  };

  const cardOpens = () => {
    setOpens(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Appeler la fonction de suppression passée par les props
  const handleDeleteGame = () => {
    props.onDelete(props.id); // Utilise la fonction de suppression du composant parent
  };

  const StatusBadge = ({ statut }) => {
    return (
      <div>
        {statut === "Valide" && (
          <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Valide
          </span>
        )}
        {statut === "Close" && (
          <span className="bg-red-200 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Close
          </span>
        )}
        {statut === "En Cours" && (
          <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
            En Cour
          </span>
        )}
      </div>
    );
  };

  const PrioriteBadge = ({ priorite }) => {
    return (
      <div>
        {priorite === "Basse" && (
          <span className="bg-pink-200 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Basse
          </span>
        )}
        {priorite === "Haute" && (
          <span className="bg-yellow-200 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Haute
          </span>
        )}
        {priorite === "Moyenne" && (
          <span className="bg-blue-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
            Moyenne
          </span>
        )}
      </div>
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
      <div className="game-card">
        <div className="info">
          <h4>{props.name}</h4>
          <p>{props.description}</p>
          <div className="flex gap-8">
            <p className="flex gap-1">
              Priorite : <PrioriteBadge priorite={props.priorite} />
            </p>
            <p className="flex gap-1">
              Status : <StatusBadge statut={props.statut} />
            </p>
          </div>
        </div>
        <div className="actions flex">
          <button className="action flex gap-3" onClick={cardOpens}>
            <svg
              className="w-4 h-6 text-gray-100 dark:text-white"
              aria-hidden="true"
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
          <button className="edit" onClick={cardOpen}>
            Edit
          </button>
          <button className="delete" onClick={handleDeleteGame}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
