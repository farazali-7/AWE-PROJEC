import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactDetails from './components/ContactDetails';
import AboutPage from './components/AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              📱 Contact Manager
            </Link>
            <div className="nav-menu">
              <Link to="/" className="nav-link">
                🏠 Home
              </Link>
              <Link to="/contacts" className="nav-link">
                📋 All Contacts
              </Link>
              <Link to="/add" className="nav-link">
                ➕ Add Contact
              </Link>
              <Link to="/about" className="nav-link">
                ℹ️ About
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
