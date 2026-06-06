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
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };
  function showModals() {
    let createTodoDialog = document.getElementById("createTodo");
    createTodoDialog.showModal();
  }

  function closeModal() {
    let createTodoDialog = document.getElementById("createTodo");
    createTodoDialog.close();
  }

  function closeModalEdit() {
    let editTodoDialog = document.getElementById("editTodo");
    editTodoDialog.close();
  }

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
    let editTodoDialog = document.getElementById("editTodo");
    editTodoDialog.showModal();
  };

  // Sauvegarder la modification
  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    try {
      const res = await API.put(`/todos/${id}`, { title: editTitle });
      setTodos(todos.map(t => t._id === id ? res.data.todo : t));
      setEditId(null);
      closeModalEdit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todo-container">
      <h2>Ma TO-Do List</h2>
      <button id="add-todo-btn" onClick={() => showModals()}><i className="fas fa-circle-plus"></i>Ajouter une tâche</button>
      <dialog id="createTodo">
        <div className="modal-content-create">
          <span>Ajouter une nouvelle tâche</span>
          <form onSubmit={createTodo} className="add-todo-form">
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Nouvelle tâche..." 
            />
            <div id='createActions'>
              <input type="submit" value="Enregistrer"/>
              <input type="reset" value="Annuler" onClick={() => closeModal()}/>
            </div>
          </form>
        </div>
      </dialog>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <>
              <span 
                style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer", color: todo.completed ? "gray" : "black" }}
                onClick={() => toggleCompleted(todo)}
              >
                {todo.title}
              </span>
              <div className="actions">
                <button onClick={() => startEdit(todo)}><i className='fas fa-pen' title='Modifier'></i></button>
                <button onClick={() => deleteTodo(todo._id)}><i className='fas fa-trash' title='Supprimer'></i></button>
              </div>
            </>
          </li>
        ))}
      </ul>

      <dialog id="editTodo">
        <div className="modal-content-edit">
          <span>Modifier la tâche</span>
          <form onSubmit={(e) => {
            e.preventDefault();
            saveEdit(editId);
          }} className="add-todo-form">
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)} 
            />
            <div id='editActions'>
              <input type="submit" value="Modifier"/>
              <input type="reset" value="Annuler" onClick={() => closeModalEdit()}/>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default ToDoList;