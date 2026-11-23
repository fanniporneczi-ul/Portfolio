/** Defines the page navigation and renders the selected non-Home section. */
import type { ComponentType } from 'react';
import Introduction from './sections/Introduction';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export type PageName = 'home' | 'introduction' | 'projects' | 'experience' | 'contact';
type SectionName = Exclude<PageName, 'home'>;

// Keep the navigation labels and page ids together so they stay in sync.
const pageLinks: { id: PageName; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

// Home is rendered by App; this map contains only full-page subviews.
const pageComponents: Record<SectionName, ComponentType> = {
  introduction: Introduction,
  projects: Projects,
  experience: Experience,
  contact: Contact,
};

interface SectionNavigationProps {
  activePage: PageName;
  onPageChange: (page: PageName) => void;
}

export function SectionNavigation({ activePage, onPageChange }: SectionNavigationProps) {
  return (
    <nav aria-label="Portfolio pages" className="site-nav site-nav--right">
      {/* Buttons update App's active page and expose the current page accessibly. */}
      {pageLinks.map(({ id, label }) => (
        <button
          aria-current={activePage === id ? 'page' : undefined}
          className={`nav-pill${activePage === id ? ' is-active' : ''}`}
          key={id}
          onClick={() => onPageChange(id)}
          type="button"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

function SectionSwitcher({ activePage }: { activePage: SectionName }) {
  // Resolve the typed page id to one component instead of stacking sections.
  const ActivePage = pageComponents[activePage];
  return <ActivePage />;
}

export default SectionSwitcher;
