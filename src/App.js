import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      const newTask = {
        text: input,
        completed: false,
        createdAt: new Date().toLocaleString(),
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <div className="todo-card">
        <h1>📋 To-Do List</h1>
        <div className="input-group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>➕</button>
        </div>

        <table className="task-table">
          <thead>
            <tr>
              <th>✅</th>
              <th>📄 Task</th>
              <th>⏰ Created At</th>
              <th>❌</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={task.completed ? 'completed' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                  />
                </td>
                <td>{task.text}</td>
                <td>{task.createdAt}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteTask(index)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
