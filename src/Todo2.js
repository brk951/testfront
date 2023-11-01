import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // getter des taches 
  const fetchTasks = () => {
    axios.get('http://localhost:5000/post')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches:', error);
      });
  };

 // cree un titre grace a l input et l'envoi au serveur
  const createTask = () => {
    if (newTask.trim() === '') return;

    axios.post('http://localhost:5000/post', { title: newTask })
      .then((response) => {
        setNewTask('');
        fetchTasks();
      })
      .catch((error) => {
        console.error('Erreur lors de la création de la tâche:', error);
      });
  };

  // update la tache vers completed ou non
  const updateTask = (taskId, completed) => {
    axios.put(`http://localhost:5000/post/${taskId}`, { completed: completed }) // Remplacez par l'URL de votre backend
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
      });
  };

  // remove une tache puis les reaaffiche
  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/post/${taskId}`) // Remplacez par l'URL de votre backend
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la tâche:', error);
      });
  };

  return (
    <div className="App">
      <h1>Application de gestion des tâches</h1>
      <div>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={createTask}>Ajouter</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} -
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => updateTask(task.id, !task.completed)}
            />
            <button onClick={() => deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
