import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Axios from "axios";
import Card from "./components/card";
import TaskSummary from "./components/TaskSummary";

function Task() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [values, setValues] = useState({});
  const [tasks, settasks] = useState([]);

  const handleChangeValues = (e) => {
    setValues((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickButton = () => {
    if (!values.name || !values.description || !values.priorite) {
      alert("Veuillez remplir tous les champs avant de soumettre !");
      return;
    }

    Axios.post(`${baseUrl}/register`, {
      name: values.name,
      description: values.description,
      priorite: values.priorite,
    })
      .then(() => Axios.get(`${baseUrl}/tasks`))
      .then((response) => {
        settasks(response.data);
        setValues({});
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout ou du rechargement des tâches :", error)
      );
  };

  const handleDeleteTask = (id) => {
    Axios.delete(`${baseUrl}/delete/${id}`)
      .then(() => {
        settasks((prevTasks) => prevTasks.filter((task) => task.idtasks !== id));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la tâche :", error);
      });
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/tasks`)
      .then((response) => settasks(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des tâches :", error)
      );
  }, []);

  return (
    <div className="App py-6 px-4 sm:px-8 lg:px-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Gestion des Tâches 📋
      </h1>

      <TaskSummary tasks={tasks} />

      {/* Formulaire d'ajout */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-8 mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="name"
          placeholder="Titre"
          value={values.name || ""}
          onChange={handleChangeValues}
        />
        <input
          className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="description"
          placeholder="Description"
          value={values.description || ""}
          onChange={handleChangeValues}
        />
        <select
          name="priorite"
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={values.priorite || ""}
          onChange={handleChangeValues}
        >
          <option value="" disabled>
            Priorité
          </option>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
          onClick={handleClickButton}
        >
          Ajouter
        </button>
      </div>

      {/* Liste des tâches */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.idtasks}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                id={task.idtasks}
                name={task.name}
                description={task.description}
                priorite={task.priorite}
                statut={task.statut}
                onDelete={handleDeleteTask}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Task;
