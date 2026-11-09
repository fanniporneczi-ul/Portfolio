import { useState } from 'react';
import Introduction from './sections/Introduction';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

// Defines what information SectionSwitcher needs to open and close sections.
interface SectionSwitcherData {
  activeSection: string;
  onClose: () => void;
}

// Map strings to the components with a dictionary
const ContentMap: Record<string, React.ElementType> = {
  'Introduction': Introduction,
  'Projects': Projects,
  'Experience': Experience,
  'Contact': Contact
};

/* Displays the sliding chalkboard popup for the currently selected section 
 * and handles closing it when the user clicks the close button.
 */
function SectionSwitcher({ activeSection, onClose }: SectionSwitcherData) {
  // Handle switching back to main menu
  const [isClosing, setIsClosing] = useState(false);
  // Get current active section from ContentMap
  const ActiveComponent = ContentMap[activeSection];

  // Start closing section, go back to main menu
  const handleClose = () => {
    setIsClosing(true);
  };

  // Destroy section after closing animation ends
  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <div className="sectionswitcher-overlay">
      {/* Add slide-out property to className only if isClosing is true */}
      <div className={`sectionswitcher-content ${isClosing ? 'slide-out' : ''}`}
        onAnimationEnd={handleAnimationEnd}>
        <h2 className="chalk-header">{activeSection}</h2>
        
        {/* Load content for current active section if there is a script for it */}
        <div className="sectionswitcher-body">
          {ActiveComponent ? <ActiveComponent /> : <p>Work in progress...</p>}
        </div>

        {/* Close current active section when close button is clicked */}
        <div className="chalk-button close-button" onClick={handleClose}>Close</div>
      </div>
    </div>
  );
}

export default SectionSwitcher;