import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../../assets/logo.png";

// Configuración de SweetAlert2
const MySwal = withReactContent(Swal);

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    repetirContrasena: "",
    cedula: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validar la cédula ecuatoriana
  const validarCedula = (cedula) => {
    if (cedula.length !== 10 || isNaN(cedula)) return false;

    const digitos = cedula.split("").map(Number);
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < coeficientes.length; i++) {
      let producto = digitos[i] * coeficientes[i];
      if (producto > 9) producto -= 9;
      suma += producto;
    }

    const ultimoDigito = parseInt(cedula[9]);
    const verificador = (10 - (suma % 10)) % 10;

    return ultimoDigito === verificador;
  };

  // Validar teléfono
  const validarTelefono = (telefono) => {
    return /^[0-9]{10}$/.test(telefono);
  };

  // Validar campos individualmente
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "cedula":
        if (!validarCedula(value)) error = "La cédula no es válida.";
        break;
      case "telefono":
        if (!validarTelefono(value)) error = "El teléfono debe tener 10 dígitos numéricos.";
        break;
      case "correo":
        if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) error = "El correo no es válido.";
        break;
      case "contrasena":
        if (value.length < 6) error = "La contraseña debe tener al menos 6 caracteres.";
        break;
      case "repetirContrasena":
        if (value !== formData.contrasena) error = "Las contraseñas no coinciden.";
        break;
      default:
        if (!value) error = "Este campo es obligatorio.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === "";
  };

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validar todos los campos
    let formIsValid = true;
    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) formIsValid = false;
    });

    if (!formIsValid) {
      setIsLoading(false);
      return;
    }

    // Guardar usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push(formData);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mostrar mensaje de éxito
    MySwal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Te has registrado correctamente.",
    }).then(() => {
      window.location.href = "/login";
    });

    setIsLoading(false);
  };

  return (
    <div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="h-full">
        <div className="mx-auto">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg flex items-center justify-center"
                style={{
                  backgroundImage: `url(${logo})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                  ¡Registra tu cuenta!
                </h3>
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                  onSubmit={handleSubmit}
                >
                  {[
                    { label: "Nombre", name: "nombre" },
                    { label: "Apellido", name: "apellido" },
                    { label: "Correo", name: "correo", type: "email" },
                    { label: "Contraseña", name: "contrasena", type: "password" },
                    {
                      label: "Repetir Contraseña",
                      name: "repetirContrasena",
                      type: "password",
                    },
                    { label: "Cédula", name: "cedula" },
                    { label: "Teléfono", name: "telefono" },
                  ].map(({ label, name, type = "text" }) => (
                    <div className="mb-4" key={name}>
                      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                        {label}
                      </label>
                      <input
                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                          errors[name] ? "border-red-500" : "border-gray-300"
                        }`}
                        name={name}
                        type={type}
                        value={formData[name]}
                        onChange={handleInputChange}
                        placeholder={`Ingresa tu ${label.toLowerCase()}`}
                      />
                      {errors[name] && (
                        <p className="text-xs italic text-red-500">
                          {errors[name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="mb-6 text-center">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registrando..." : "Registrar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;
