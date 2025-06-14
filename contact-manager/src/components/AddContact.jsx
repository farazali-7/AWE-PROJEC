import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactAPI } from '../services/api';

function AddContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: 'personal'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await contactAPI.createContact(formData);
      navigate('/contacts');
      
    } catch (error) {
      console.error('❌ Error creating contact:', error);
      
      let errorMessage = 'Failed to create contact.';
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running on port 3001.';
      } else if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || 'Server error occurred.';
      } else if (error.request) {
        // Network/CORS error
        errorMessage = 'Network error. Please check your connection and ensure the server is running.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Add New Contact</h1>
        <p className="page-subtitle">Fill in the details below to create a new contact</p>
      </div>

      <div className="card">
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">👤 Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📧 Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📞 Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📍 Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter address (optional)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">🏷️ Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="personal">👤 Personal</option>
              <option value="work">💼 Work</option>
              <option value="family">👨‍👩‍👧‍👦 Family</option>
              <option value="friend">👫 Friend</option>
            </select>
          </div>

          <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '⏳ Adding...' : '✅ Add Contact'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/contacts')} 
              className="btn btn-secondary"
              disabled={loading}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContact; 