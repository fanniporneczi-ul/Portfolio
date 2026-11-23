/** Owns the active page and renders the shared navigation and selected view. */
import { useEffect, useState } from 'react';
import profilePic from './assets/Headshot_unblurred.png';
import './App.css';
import CrayonStars from './components/CrayonStars';
import SectionSwitcher, { SectionNavigation, type PageName } from './components/SectionSwitcher';

function App() {
  const [activePage, setActivePage] = useState<PageName>('home');

  useEffect(() => {
    // Start each newly selected page at its top.
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className={`app-container app-container--${activePage}`}>
      {/* Persistent navigation is shared by the Home hero and all subpages. */}
      <header className="app-header">
        <SectionNavigation activePage={activePage} onPageChange={setActivePage} />
      </header>

      {/* Render only the selected view; Home has a standalone hero layout. */}
      {activePage === 'home' ? (
        <main className="home-hero">
          <CrayonStars count={34} seed="home" variant="crimson" />
          {/* Name and role labels form the text half of the hero. */}
          <div className="hero-copy">
            <p className="hero-kicker">HELLO, I'M</p>
            <h1 aria-label="Fanni Pörneczi" className="hero-display-name">
              <span>FANNI</span>
              <span>PÖRNECZI</span>
            </h1>
            <div className="hero-stickers">
              <span className="hero-sticker hero-sticker--scientist">computer scientist</span>
              <span className="hero-sticker hero-sticker--designer">
                interaction &amp; experience designer
              </span>
            </div>
          </div>
          {/* Portrait, accent card, and stars form the artwork half. */}
          <div className="hero-art">
            <div className="hero-accent-card" />
            <img src={profilePic} alt="Fanni Pörneczi" className="profile-pic" />
          </div>
        </main>
      ) : (
        <SectionSwitcher activePage={activePage} />
      )}

      {/* The copyright footer belongs only to the Home view. */}
      {activePage === 'home' && (
        <footer className="app-footer">
          <p className="app-footer__copyright">
            &copy; {new Date().getFullYear()} Fanni Pörneczi. All Rights Reserved.
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
