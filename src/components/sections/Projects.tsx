import profilePic from '../../assets/wood.jpg';

/* Projects Component
 * Responsible for rendering Projects section
 */
function Projects() {
  return (
    <div className="projects-container">
      {/* Two-column layout */}
      <div className="project-row">
        {/* Left column: Image */}
        <div className="project-image-column">
          <img src={profilePic} alt="Project 1" className="project-img"/>
        </div>

        {/* Right column: Details */}
        <div className="project-info-column">
          <h3 className="chalk-subheader">Project 1</h3>
          <p className="chalk-text">
            Description of project 1.
          </p>
          <p className="chalk-text">
            Tools used: React, TypeScript, CSS 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Projects;