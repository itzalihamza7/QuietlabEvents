import React from 'react';

const FormInput = ({ label, type, name, value, onChange }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={onChange} 
                className="form-control" 
                required 
            />
        </div>
    );
};

export default FormInput;
