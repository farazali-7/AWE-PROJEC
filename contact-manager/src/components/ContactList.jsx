import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactAPI } from '../services/api';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAllContacts();
      setContacts(response.data);
    } catch (error) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      fetchContacts();
      return;
    }

    try {
      const response = await contactAPI.searchContacts(term);
      setContacts(response.data);
    } catch (error) {
      setError('Failed to search contacts');
      console.error('Error searching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.deleteContact(id);
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (error) {
        setError('Failed to delete contact');
        console.error('Error deleting contact:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading contacts...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchContacts} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">All Contacts</h1>
        <p className="page-subtitle">Manage and organize your contact database</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search contacts by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {contacts.length === 0 ? (
        <div className="card empty-state">
          <h3>📝 No contacts found</h3>
          <p>Start building your contact database by adding your first contact!</p>
          <Link to="/add" className="btn btn-primary btn-lg">
            ➕ Add First Contact
          </Link>
        </div>
      ) : (
        <>
          <div className="stats">
            <div className="stat-card">
              <span className="stat-number">{contacts.length}</span>
              <span className="stat-label">Total Contacts</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{contacts.filter(c => c.category === 'personal').length}</span>
              <span className="stat-label">Personal</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{contacts.filter(c => c.category === 'work').length}</span>
              <span className="stat-label">Work</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{contacts.filter(c => c.category === 'family').length}</span>
              <span className="stat-label">Family</span>
            </div>
          </div>
          
          <div className="contact-grid">
            {contacts.map((contact) => (
              <div key={contact._id} className="contact-card">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-email">📧 {contact.email}</div>
                <div className="contact-phone">📞 {contact.phone}</div>
                {contact.address && (
                  <div className="contact-address">📍 {contact.address}</div>
                )}
                <div className="contact-category">{contact.category}</div>
                
                <div className="contact-actions">
                  <Link 
                    to={`/contact/${contact._id}`} 
                    className="btn btn-primary"
                  >
                    👁️ View
                  </Link>
                  <Link 
                    to={`/edit/${contact._id}`} 
                    className="btn btn-secondary"
                  >
                    ✏️ Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(contact._id)}
                    className="btn btn-danger"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ContactList; 