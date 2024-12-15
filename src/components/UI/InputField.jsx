import React from 'react';

const InputField = ({ label, type = 'text', placeholder, value, onChange, className = '' }) => {
  return (
    <div className={`input-group ${className}`}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="input-field" />
    </div>
  );
};

export default InputField;
