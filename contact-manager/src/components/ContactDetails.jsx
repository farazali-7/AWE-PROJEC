import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { contactAPI } from '../services/api';

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getContact(id);
      setContact(response.data);
    } catch (error) {
      setError('Failed to fetch contact details');
      console.error('Error fetching contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.deleteContact(id);
        navigate('/contacts');
      } catch (error) {
        setError('Failed to delete contact');
        console.error('Error deleting contact:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>⏳ Loading contact details...</h2>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="card">
        <h2>❌ Error</h2>
        <p>{error || 'Contact not found'}</p>
        <Link to="/contacts" className="btn btn-primary">
          📋 Back to Contacts
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'personal': return '👤';
      case 'work': return '💼';
      case 'family': return '👨‍👩‍👧‍👦';
      case 'friend': return '👫';
      default: return '📝';
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Contact Details</h1>
        <p className="page-subtitle">View complete contact information</p>
      </div>

      <div className="card">
        <div className="contact-detail-header" style={{ 
          borderBottom: '2px solid var(--border-color)', 
          paddingBottom: '1.5rem', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            color: 'var(--text-primary)', 
            marginBottom: '1rem',
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {contact.name}
          </h2>
          <span className="contact-category" style={{ fontSize: '1.2rem', padding: '0.75rem 1.5rem' }}>
            {getCategoryIcon(contact.category)} {contact.category}
          </span>
        </div>

        <div className="contact-details-grid" style={{ 
          display: 'grid', 
          gap: '2rem', 
          marginBottom: '3rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <div className="detail-item" style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              📧 Email Address
            </h3>
            <p style={{ fontSize: '1.1rem' }}>
              <a href={`mailto:${contact.email}`} style={{ 
                color: 'var(--text-primary)', 
                textDecoration: 'none',
                '&:hover': { color: 'var(--primary-color)' }
              }}>
                {contact.email}
              </a>
            </p>
          </div>

          <div className="detail-item" style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              📞 Phone Number
            </h3>
            <p style={{ fontSize: '1.1rem' }}>
              <a href={`tel:${contact.phone}`} style={{ 
                color: 'var(--text-primary)', 
                textDecoration: 'none' 
              }}>
                {contact.phone}
              </a>
            </p>
          </div>

          {contact.address && (
            <div className="detail-item" style={{
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '1px solid var(--border-color)',
              gridColumn: 'span 2'
            }}>
              <h3 style={{ color: 'var(--warning-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>
                📍 Address
              </h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{contact.address}</p>
            </div>
          )}

          <div className="detail-item" style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              📅 Created
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              {formatDate(contact.createdAt)}
            </p>
          </div>

          {contact.updatedAt && contact.updatedAt !== contact.createdAt && (
            <div className="detail-item" style={{
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>
                ✏️ Last Updated
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                {formatDate(contact.updatedAt)}
              </p>
            </div>
          )}
        </div>

        <div className="contact-actions" style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link 
            to={`/edit/${contact._id}`} 
            className="btn btn-primary btn-lg"
          >
            ✏️ Edit Contact
          </Link>
          <button 
            onClick={handleDelete}
            className="btn btn-danger btn-lg"
          >
            🗑️ Delete Contact
          </button>
          <Link 
            to="/contacts" 
            className="btn btn-secondary btn-lg"
          >
            📋 Back to Contacts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails; 