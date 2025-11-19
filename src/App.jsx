import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    setTodos([...todos, {
      id: Date.now(),
      text: inputValue,
      completed: false
    }])
    setInputValue('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>My Tasks</h1>
        
        <form onSubmit={addTodo} className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add</button>
        </form>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
                <span className="checkbox">{todo.completed ? '✔' : ''}</span>
                <span className="text">{todo.text}</span>
              </div>
              <button 
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete task"
              >
                ×
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="empty-state">No tasks yet. Add one above!</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
