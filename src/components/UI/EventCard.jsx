import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ id, nombreEvento, description, date, time, maxGuests, imageUrl, idUsuario }) => {
  const [nombreCreador, setNombreCreador] = useState("Usuario desconocido");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("registroData") || "[]");
    const usuarioCreador = usuarios.find((user) => user.id === idUsuario);
    if (usuarioCreador) {
      setNombreCreador(usuarioCreador.nombre);
    }
  }, [idUsuario]);

  const handleAsistirClick = () => {
    navigate(`/evento/${id}`);
  };

  return (
    <div className="flex px-3 py-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={imageUrl} alt={`Imagen del evento ${nombreEvento}`} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{nombreEvento}</div>
          <p className="text-gray-700 text-base">{description}</p>
          <p className="text-sm text-gray-600 mt-2">
            Fecha: {new Date(date).toLocaleDateString()} - Hora: {time}
          </p>
          <p className="text-sm text-gray-600">Capacidad máxima: {maxGuests}</p>
          <p className="text-sm text-gray-600">
            Creador del evento: {nombreCreador}
          </p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #evento
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #futuro
          </span>
        </div>
        <div className="px-6 py-4 flex justify-center">
          <button onClick={handleAsistirClick} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
            Asistir
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
