import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskTermine from './components/TaskTermine';
import TaskFerme from './components/TaskFerme';
import TachePending from './components/TachePending';
import Task from './Task';
// Dans main.jsx ou App.jsx
import './components/index.css';


export const NotificationContext = createContext();

const App = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const scheduleNotification = (task) => {
    const now = new Date();
    const taskTime = new Date(task.deadline);

    if (taskTime > now) {
      const timeout = taskTime - now;

      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(`Rappel : ${task.title}`, {
            body: `La tâche "${task.title}" est proche de son échéance.`,
            icon: '/icon.png',
          });
        }
      }, timeout);
    }
  };

  return (
    <NotificationContext.Provider value={{ scheduleNotification }}>
      <div className="App flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Router>
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<Task />} />
              <Route path="/task-termine" element={<TaskTermine />} />
              <Route path="/task-pending" element={<TachePending />} />
              <Route path="/task-ferme" element={<TaskFerme />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
