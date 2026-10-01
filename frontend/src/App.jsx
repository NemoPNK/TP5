import { useState, useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL;
import './App.scss'

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newId, setNewId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [showDeleteForm, setShowDeleteForm] = useState(false);

const loadTasks = () => {
  fetch(`${API_URL}/tasks`)
    .then(response => {
      if (!response.ok) {
        alert("Une erreur s'est produite")
      }

      return response.json()
    })
    .then(data => {
      setTasks(data.task)
    })
}

useEffect(() => {
  loadTasks()
}, [])

const toogleTask = (id) => {
  fetch(`${API_URL}/tasks/${id}/completed`, {
    method: 'PATCH'
  })
    .then(response => {
      if (!response.ok) {
        alert("Une erreur s'est produite")
        return
      }

      loadTasks()
    })
}

const filterTasks = (status) => {
  fetch(`${API_URL}/tasks?status=${status}`)
    .then(response => {
      if (!response.ok) {
        alert("Une erreur s'est produite")
      }

      return response.json()
    })
    .then(data => {
      setTasks(data.task)
    })
}

const addTask = () => {
  fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Number(newId),
      titre: newTitle,
      complete: false
    })
  })
    .then(response => {
      if (!response.ok) {
        alert("Une tâche est déjà associée à cet ID, veuillez mettre un autre ID.")
        return
      }

      loadTasks()
    })
}

const deleteTask = () => {
  fetch(`${API_URL}/tasks/${deleteId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        alert("Une erreur s'est produite")
        return
      }

      loadTasks()
    })
}

  return (
    <>
      <header>
        <div>
          <h1>Les taches cool qui se range et que vous pouvez ranger puis le rangement de ces tâches va devenir vraiment cool !</h1>
        </div>
      </header>
      <main>
        <section>
          <div>
            <h2 className='tasks-title' >Vos taches :</h2>
            <div className='edit-container' >
              <div className='button-manager'>
                <button id='green' onClick={() => filterTasks('all')}>Tous</button>
                <button id='green' onClick={() => filterTasks('completed')}>Complété</button>
                <button id='orange' onClick={() => filterTasks('pending')}>En attente</button>
              </div>
              <div className='button-manager'>
                <button id='blue' onClick={() => setShowAddForm(!showAddForm)}>Ajouter</button>
                <button id='red' onClick={() => setShowDeleteForm(!showDeleteForm)}>Supprimer</button>
              </div>
            </div>
            {showDeleteForm && (
              <div className="form">
                <select value={deleteId} onChange={(e) => setDeleteId(e.target.value)}>
                  <option value="">Choisir une tâche</option>

                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.titre}
                    </option>
                  ))}
                </select>

                <button onClick={() => { deleteTask(), setShowDeleteForm(false) }} >Confirmer</button>
              </div>
            )}
            {showAddForm && (
              <div className="form">
                <input type="number" placeholder="ID" value={newId} onChange={(e) => setNewId(e.target.value)} />
                <input type="text" placeholder="Titre" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <button onClick={() => { addTask(), setShowAddForm(false) }}>Appliquer</button>
              </div>
            )}
            <div className='tasks'>
              {tasks.map((task) => (
                <p key={task.id}>
                  {task.id} - {task.titre}

                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => toogleTask(task.id)}
                  />

                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
