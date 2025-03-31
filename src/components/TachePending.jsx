import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import Card from "./card";

function TaskPending() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [values, setValues] = useState();
  const [tasks, settasks] = useState([]);

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post(`${baseUrl}/register`, {
      name: values.name,
      description: values.description,
      priorite: values.priorite,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/tasks`).then((response) => {
      settasks(response.data);
    });
  }, []);

  return (
    <div className="App py-6 px-4 sm:px-8 lg:px-16">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Tâches en Cours ⏳
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks &&
          tasks
            .filter((task) => task.statut === "En Cours")
            .map((task) => (
              <Card
                key={task.idtasks}
                id={task.idtasks}
                name={task.name}
                description={task.description}
                priorite={task.priorite}
                statut={task.statut}
              />
            ))}
      </div>
    </div>
  );
}

export default TaskPending;
