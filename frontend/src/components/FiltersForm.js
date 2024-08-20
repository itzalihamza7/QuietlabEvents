import React, { useState, useEffect } from 'react';
import { getAllStores } from '../services/storeService'; // Adjust the path based on your structure
import '../assets/Form.css'; // Adjust the path based on your folder structure

const FiltersForm = ({ onSubmit }) => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [offerUrl, setOfferUrl] = useState('');
  const [offerTemplate, setOfferTemplate] = useState('');
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesData = await getAllStores();
        setStores(storesData);
        setStoreId(storesData[0]?.id || ''); // Set default store if available
      } catch (error) {
        console.error('Error loading stores:', error);
      }
    };

    fetchStores();
  }, [currentUrl]); // Depend on currentUrl to re-fetch stores when URL changes

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pushState', handlePopState);
    window.addEventListener('replaceState', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pushState', handlePopState);
      window.removeEventListener('replaceState', handlePopState);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ store_id: storeId, start_date: startDate, end_date: endDate, offer_url: offerUrl, offer_template: offerTemplate });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Store:</label>
        <select value={storeId} onChange={(e) => setStoreId(e.target.value)} required>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
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
