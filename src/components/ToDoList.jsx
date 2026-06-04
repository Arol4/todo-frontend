import React, { useState, useEffect } from 'react';
import API from '../services/api';
import './todo.css';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Charger les tâches au démarrage
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Erreur de chargement", err);
    }
  };

  // Ajouter une tâche
  const createTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await API.post("/todos", { title });
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  // Supprimer une tâche
  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Basculer l'état (Fait / À faire)
  const toggleCompleted = async (todo) => {
    try {
      const res = await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
      setTodos(todos.map(t => t._id === todo._id ? res.data.todo : t));
    } catch (err) {
      console.error(err);
    }
  };

  // Activer le mode édition
  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  // Sauvegarder la modification
  const saveEdit = async (id) => {
    try {
      const res = await API.put(`/todos/${id}`, { title: editTitle });
      setTodos(todos.map(t => t._id === id ? res.data.todo : t));
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todo-container">
      <h2>Mes Tâches</h2>
      
      <form onSubmit={createTodo} className="add-todo-form">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Nouvelle tâche..." 
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            {editId === todo._id ? (
              <>
                <input 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                />
                <button onClick={() => saveEdit(todo._id)}>Sauvegarder</button>
                <button onClick={() => setEditId(null)}>Annuler</button>
              </>
            ) : (
              <>
                <span 
                  style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
                  onClick={() => toggleCompleted(todo)}
                >
                  {todo.title}
                </span>
                <div className="actions">
                  <button onClick={() => startEdit(todo)}>Modifier</button>
                  <button onClick={() => deleteTodo(todo._id)}>Supprimer</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;