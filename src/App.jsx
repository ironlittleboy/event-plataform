// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistroForm from './components/UX/Pages/RegistroForm';
import LoginForm from './components/UX/Pages/LoginForm';
import Landing from './components/UX/Pages/Landing';
import NavBar from './components/UI/NavBar';
import EventoForm from './components/UX/Pages/EventoForm';
import EventList from './components/UX/Pages/EventList';
import EventDetail from './components/UX/Pages/EventDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Página de inicio */}
        <Route path="/login" element={<LoginForm />} /> {/* Página de login */}
        <Route path="/register" element={<RegistroForm />} /> {/* Página de registro */}
        <Route path="/create" element={<EventoForm />} /> {/* Página de creación de evento */}
        <Route path="/events-list" element={<EventList />} /> {/* Página de lista de eventos */}
        <Route path="/evento/:id" element={<EventDetail />} /> {/* Página de detalles de evento con parámetro de id */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
