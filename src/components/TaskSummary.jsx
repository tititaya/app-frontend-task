import React from "react";

const TaskSummary = ({ tasks }) => {
  const totalValide = tasks ? tasks.filter((task) => task.statut === "Valide").length : 0;
  const totalClose = tasks ? tasks.filter((task) => task.statut === "Close").length : 0;
  const totalEnCours = tasks ? tasks.filter((task) => task.statut === "En Cours").length : 0;
  const totalTasks = tasks ? tasks.length : 0;

  const cardStyle =
    "w-full sm:w-1/2 lg:w-1/4 p-4";

  const innerCard =
    "h-full p-6 border rounded-lg shadow text-center dark:border-gray-700";

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className={cardStyle}>
        <div className={`${innerCard} bg-white dark:bg-gray-800`}>
          <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Total de toutes les tâches
          </h4>
          <p className="text-4xl font-semibold text-gray-700 dark:text-gray-300">{totalTasks}</p>
        </div>
      </div>

      <div className={cardStyle}>
        <div className={`${innerCard} bg-green-200 dark:bg-green-900`}>
          <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Tâches Validées
          </h4>
          <p className="text-4xl font-semibold text-gray-800 dark:text-gray-100">{totalValide}</p>
        </div>
      </div>

      <div className={cardStyle}>
        <div className={`${innerCard} bg-gray-200 dark:bg-gray-700`}>
          <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Tâches En Cours
          </h4>
          <p className="text-4xl font-semibold text-gray-800 dark:text-gray-100">{totalEnCours}</p>
        </div>
      </div>

      <div className={cardStyle}>
        <div className={`${innerCard} bg-red-200 dark:bg-red-900`}>
          <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Tâches Fermées
          </h4>
          <p className="text-4xl font-semibold text-gray-800 dark:text-gray-100">{totalClose}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
