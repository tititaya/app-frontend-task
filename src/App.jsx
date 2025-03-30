import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import de la barre de navigation
import Footer from './components/Footer'; // Import du footer
import TaskTermine from './components/TaskTermine';
import TaskFerme from './components/TaskFerme';
import TachePending from './components/TachePending';
import Task from './Task';

// Contexte pour gérer les rappels
export const NotificationContext = createContext();

const App = () => {
  const [notifications, setNotifications] = useState([]);

  // Demande de permission pour les notifications
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Fonction pour ajouter une nouvelle notification
  const scheduleNotification = (task) => {
    const now = new Date();
    const taskTime = new Date(task.deadline); // Supposons que `task.deadline` soit une date valide

    // Si la tâche est dans le futur, planifiez une notification
    if (taskTime > now) {
      const timeout = taskTime - now;

      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(`Rappel : ${task.title}`, {
            body: `La tâche "${task.title}" est proche de son échéance.`,
            icon: '/icon.png', // Remplacez par l'icône de votre application
          });
        }
      }, timeout);
    }
  };

  return (
    <NotificationContext.Provider value={{ scheduleNotification }}>
      <div className="App flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Router>
          <Navbar /> {/* Barre de navigation */}
          <main className="flex-grow p-4"> {/* Conteneur principal pour le contenu */}
            <Routes>
              <Route path="/" element={<Task />} />
              <Route path="/task-termine" element={<TaskTermine />} />
              <Route path="/task-pending" element={<TachePending />} />
              <Route path="/task-ferme" element={<TaskFerme />} />
            </Routes>
          </main>
          <Footer /> {/* Ajout du footer */}
        </Router>
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
