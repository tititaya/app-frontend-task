import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Axios from "axios";
import Card from "./components/card";
import TaskSummary from "./components/TaskSummary";

function Task() {
  const baseUrl = "http://localhost:3001";

  const [values, setValues] = useState({});
  const [tasks, settasks] = useState([]);

  // Gérer les changements dans les champs du formulaire
  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  // Ajouter une tâche
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
      .then(() => {
        return Axios.get(`${baseUrl}/tasks`); // Recharger la liste des tâches
      })
      .then((response) => {
        settasks(response.data);
        setValues({}); // Réinitialiser les champs du formulaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout ou du rechargement des tâches :", error);
      });
  };

  // Supprimer une tâche
  const handleDeleteTask = (id) => {
    Axios.delete(`${baseUrl}/delete/${id}`)
      .then(() => {
        settasks((prevTasks) => prevTasks.filter((task) => task.idtasks !== id));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la tâche :", error);
      });
  };

  // Charger les tâches lors du premier rendu
  useEffect(() => {
    Axios.get(`${baseUrl}/tasks`)
      .then((response) => {
        settasks(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des tâches :", error);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Gestion des Tâches</h1>

        {/* Résumé des tâches */}
        <TaskSummary tasks={tasks} />

        {/* Formulaire pour ajouter une tâche */}
        <div className="register-box">
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Titre"
            value={values.name || ""}
            onChange={handleChangeValues}
          />
          <input
            className="register-input"
            type="text"
            name="description"
            placeholder="Description"
            value={values.description || ""}
            onChange={handleChangeValues}
          />
          <select
            className="register-inp"
            name="priorite"
            value={values.priorite || ""}
            onChange={handleChangeValues}
          >
            <option value="" disabled>
              Choisissez une priorité
            </option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="register-button" onClick={handleClickButton}>
            Ajouter une Tâche
          </button>
        </div>
        <br />

        {/* Liste des tâches avec animations */}
        <div className="cards">
          <AnimatePresence>
            {tasks &&
              tasks.map((task) => (
                <motion.div
                  key={task.idtasks}
                  initial={{ opacity: 0, y: -20 }}
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
    </div>
  );
}

export default Task;
