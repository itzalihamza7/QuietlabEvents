import React, { useState } from 'react';
import '../assets/FiltersForm.css'; // Adjust the path based on your folder structure

const FiltersForm = ({ onSubmit }) => {
  const [storeId, setStoreId] = useState('1'); // Default to Germany (ID: 1)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [offerUrl, setOfferUrl] = useState('');
  const [offerTemplate, setOfferTemplate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ store_id: storeId, start_date: startDate, end_date: endDate, offer_url: offerUrl, offer_template: offerTemplate });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Store:</label>
        <select value={storeId} onChange={(e) => setStoreId(e.target.value)}>
          <option value="1">Germany</option>
          <option value="2">Italy</option>
        </select>
      </div>

      <div className="form-group">
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Offer URL:</label>
        <input type="text" value={offerUrl} onChange={(e) => setOfferUrl(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Offer Template:</label>
        <input type="text" value={offerTemplate} onChange={(e) => setOfferTemplate(e.target.value)} />
      </div>

      <button type="submit" className="submit-button">Get Metrics</button>
    </form>
  );
};

export default FiltersForm;
