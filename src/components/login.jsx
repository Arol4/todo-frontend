import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import './login.css';
import logo from "../assets/logo_to_do_sans_bg.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      console.log({ email, password });
      localStorage.setItem("token", res.data.token); // Stocke le JWT
      navigate("/"); // Redirige vers la ToDo list
    } catch (err) { 
      setError(err.response?.data?.error || "Identifiants incorrects");
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Logo" width="80px"/>
      <h2>Bienvenue de nouveau !</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Connexion"/>
      </form>
      <p>Vous n'avez pas encore de compte ? <Link to="/register">Créer un compte !</Link></p>
    </div>
  );
}

export default Login;