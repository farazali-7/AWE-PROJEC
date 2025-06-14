import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { contactAPI } from '../services/api';

function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: 'personal'
  });

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      setFetchLoading(true);
      const response = await contactAPI.getContact(id);
      setFormData(response.data);
    } catch (error) {
      setError('Failed to fetch contact details');
      console.error('Error fetching contact:', error);
    } finally {
      setFetchLoading(false);
    }
  };

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
      await contactAPI.updateContact(id, formData);
      navigate('/contacts');
    } catch (error) {
      setError('Failed to update contact. Please try again.');
      console.error('Error updating contact:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading">
        <h2>⏳ Loading contact details...</h2>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Edit Contact</h1>
        <p className="page-subtitle">Update contact information</p>
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
              value={formData.address || ''}
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
              {loading ? '⏳ Updating...' : '✅ Update Contact'}
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

export default EditContact; 