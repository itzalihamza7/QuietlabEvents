import React, { useState } from 'react';
import '../assets/Form.css'; // Adjust the path based on your folder structure

const CreateStoreForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, country });
  };

  return (
    <div className="form-container create-store-form">
      <h2>Create New Store</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Store Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Create Store</button>
      </form>
    </div>
  );
};

export default CreateStoreForm;
