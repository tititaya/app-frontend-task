import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import Card from "./card";

function TaskTermine() {
    const baseUrl = "http://localhost:3001";

    const [values, setValues] = useState();
    const [tasks, settasks] = useState();

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
    }, []); // Ajoutez un tableau de dépendances vide pour éviter de recharger à chaque rendu

    return (
        <div className="App">
            <div className="container">
                <h1 className="title">Liste des tâches terminées</h1>
        
                <br />
                <div className="cards">
                    {typeof tasks !== "undefined" &&
                        tasks
                            .filter((task) => task.statut === "Valide") // Filtre les tâches terminées
                            .map((task) => {
                                return (
                                    <Card
                                        key={task.idtasks}
                                        id={task.idtasks}
                                        name={task.name}
                                        description={task.description}
                                        priorite={task.priorite}
                                        statut={task.statut}
                                    ></Card>
                                );
                            })}
                </div>
            </div>
        </div>
    );
}

export default TaskTermine;
