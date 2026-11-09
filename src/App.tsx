import { useState } from 'react';
import profilePic from './assets/profilePictureWithShadow.png';
import './App.css';
import SectionSwitcher from './components/SectionSwitcher';

/* Root Controller Component
 * Manages global layout, central navigation stage, and active section state
 */
function App() {
  // Kepp track of current active section, change sections, null displays main menu
  const [activeSection, setActiveSection] = useState<string | null>(null);
  return (
    <div className="app-container">
      
      {/* Header */}
      <header className="app-header">
        <h1>FANNI PÖRNECZI</h1>
      </header>

      {/* Body (Chalkboard)*/}
      <main className="chalkboard-container">
        <div className="center-stage">
          <img src={profilePic} alt="Fanni Pörneczi" className="profile-pic" />
        </div>

        {/* Setting current active section based on user click */}
        <nav className="chalk-buttons">
          <div className="chalk-button arrow top-left" onClick={() => setActiveSection('Introduction')}>Introduction</div>
          <div className="chalk-button arrow top-right" onClick={() => setActiveSection('Projects')}>Projects</div>
          <div className="chalk-button arrow bottom-left" onClick={() => setActiveSection('Experience')}>Experience</div>
          <div className="chalk-button arrow bottom-right" onClick={() => setActiveSection('Contact')}>Contact</div>
        </nav>
      </main>

      {/* Render based on activeSection, pass current active section and closing function 
      to SectionSwitcher */}
      {activeSection && (
        <SectionSwitcher 
          activeSection={activeSection} 
          onClose={() => setActiveSection(null)} 
        />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Fanni Pörneczi. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;