import React, { useEffect } from "react";

const TaskSummary = ({ tasks }) => {
  // Calculer les totaux dynamiquement en fonction des tâches reçues
  const totalValide = tasks ? tasks.filter((task) => task.statut === "Valide").length : 0;
  const totalClose = tasks ? tasks.filter((task) => task.statut === "Close").length : 0;
  const totalEnCours = tasks ? tasks.filter((task) => task.statut === "En Cours").length : 0;
  const totalTasks = tasks ? tasks.length : 0;

  return (
    <div className="flex gap-8 justify-center">
      {/* Total de toutes les tâches */}
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Total de toutes les tâches
        </h4>
        <p className="mb-3 text-center text-5xl font-normal text-gray-700 dark:text-gray-400">
          {totalTasks}
        </p>
      </div>

      {/* Tâches validées */}
      <div className="max-w-sm p-6 bg-green-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Toutes les tâches Validées
        </h4>
        <p className="mb-3 text-center text-5xl font-normal text-gray-700 dark:text-gray-400">
          {totalValide}
        </p>
      </div>

      {/* Tâches en cours */}
      <div className="max-w-sm p-6 bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Toutes les tâches En Cours
        </h4>
        <p className="mb-3 font-normal text-center text-5xl text-gray-700 dark:text-gray-400">
          {totalEnCours}
        </p>
      </div>

      {/* Tâches fermées */}
      <div className="max-w-sm p-6 bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Toutes les tâches Close
        </h4>
        <p className="mb-3 text-center text-5xl font-normal text-gray-700 dark:text-gray-400">
          {totalClose}
        </p>
      </div>
    </div>
  );
};

export default TaskSummary;
