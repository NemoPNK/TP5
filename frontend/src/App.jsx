import { useState, useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL;
import './App.scss'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(response => response.json())
      .then(data => { setTasks(data.task) })
  })

  const toogleTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}/completed`, {
      method: 'PATCH'
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
            <div className='tasks'>
              {tasks.map((task) => (
                <p key={task.id}>
                  {task.titre}

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
