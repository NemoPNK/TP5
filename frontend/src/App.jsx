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
  const [message, setMessage] = useState('Je suis ben votre assitant personnel !');
  const [messageColor, setMessageColor] = useState('black');

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
        setMessage("Ben : J'ai bien toogle votre tache ! 😁");
        setMessageColor("#6ED500");

        setTimeout(() => {
          setMessage("Ben votre assistant personnel !");
          setMessageColor("black");
        }, 3000);
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

        setMessage("Ben : J'ai bien filtrer votre tache ! 😁");
        setMessageColor("#6ED500");

        setTimeout(() => {
          setMessage("Ben votre assistant personnel !");
          setMessageColor("black");
        }, 3000);
      })
  }

  const addTask = () => {
    if (newTitle.trim() === '') {
      setMessage("Ben : Le titre est obligatoire !! 😡");
      setMessageColor("#D50004");

      setTimeout(() => {
        setMessage("Ben votre assistant personnel !");
        setMessageColor("black");
      }, 3000);
      return
    }

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
          setMessage("Ben : Une taches a deja cette ID choisis en une autre !! 😡");
          setMessageColor("#D50004");

          setTimeout(() => {
            setMessage("Ben votre assistant personnel !");
            setMessageColor("black");
          }, 3000);
          return
        }

        loadTasks()
        setMessage("Ben : J'ai bien ajouter votre tache ! 😁");
        setMessageColor("#6ED500");

        setTimeout(() => {
          setMessage("Ben votre assistant personnel !");
          setMessageColor("black");
        }, 3000);
      })
  }

  const deleteTask = () => {
    fetch(`${API_URL}/tasks/${deleteId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          setMessage("Ben : Une erreur c'est produite");
          setMessageColor("#D50004");

          setTimeout(() => {
            setMessage("Ben votre assistant personnel !");
            setMessageColor("black");
          }, 3000);
          return
        }

        loadTasks()
        setMessage("Ben : J'ai bien supprimer votre tache ! 😁");
        setMessageColor("#6ED500");

        setTimeout(() => {
          setMessage("Ben votre assistant personnel !");
          setMessageColor("black");
        }, 3000);
      })
  }

  return (
    <>
      <header>
        <div>
          <h1>Range tes taches</h1>
        </div>
      </header>
      <main>
        <section>
          <div>
            <h2 className='tasks-title' >Vos taches :</h2>
            <p id='output' style={{ color: messageColor }}>{message}</p>
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
                <input type="text" placeholder="Titre (Obligatoire)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
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
