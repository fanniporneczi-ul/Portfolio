/** Displays work and leadership roles in reverse chronological order. */
import CrayonStars from '../CrayonStars';

// Keep role details together so the timeline markup can stay data-driven.
const roles = [
  {
    title: 'Software Application Developer',
    organization: 'Morgan Stanley',
    location: 'Budapest, Hungary',
    period: '2025',
    summary:
      'As part of a small international team, I developed and maintained three internal web applications, participating in daily standups and contributing to the full software development lifecycle.',
    highlights: [
      {
        label: 'Development',
        description:
          'Implemented new features and upgraded legacy systems using C#, MS SQL, Angular, TypeScript, HTML, and SCSS.',
      },
      {
        label: 'Maintenance',
        description:
          'Responsible for identifying and fixing bugs to ensure high application reliability for internal users.',
      },
      {
        label: 'Tools & Workflow',
        description:
          'Managed tasks and deployments within an agile framework using Jira, Bitbucket, Jenkins, and TeamCity.',
      },
    ],
  },
  {
    title: 'Coding Teacher',
    organization: 'Logiscool Óbuda',
    location: 'Budapest, Hungary',
    period: '2024 – 2026',
    summary:
      'Taught fun-based coding for 6–18 year old students using block-based and Python programming.',
    highlights: [
      {
        label: 'Teaching',
        description: 'Managed and taught student groups in block-based and Python programming.',
      },
      {
        label: 'Workshops & Camps',
        description:
          'Designed and led sessions covering LEGO robotics, Android app development, Minecraft game logic, and 3D drawing/printing.',
      },
      {
        label: 'Events',
        description: 'Represented the school at educational technology events.',
      },
    ],
  },
  {
    title: 'ESN (Erasmus Student Network) Mentor',
    organization: 'ELTE',
    location: 'Budapest, Hungary',
    period: '2023 – 2026',
    summary:
      'Helped Erasmus students better adjust to their new surroundings, participating in team-building activities and mentoring incoming international students in Hungary.',
  },
];

function Experience() {
  return (
    <main className="page page--light experience-page">
      <CrayonStars count={45} seed="experience" variant="cream" />
      <div className="page-content experience-content">
        <p className="eyebrow">EXPERIENCE</p>
        <h1 className="page-title">Work and Leadership</h1>
        {/* Each role renders as one entry in the experience timeline. */}
        <div className="experience-roles">
          {roles.map((role) => (
            <article className="experience-role" key={role.title}>
              <header className="experience-role__header">
                <div>
                  <h2 className="experience-role__title">{role.title}</h2>
                  <p className="experience-role__organization">{role.organization}</p>
                </div>
                <p className="experience-role__period">{role.period}</p>
              </header>
              <p className="experience-role__location">{role.location}</p>
              <p className="experience-role__summary">{role.summary}</p>
              {role.highlights && (
                <ul className="experience-list">
                  {role.highlights.map((highlight) => (
                    <li key={highlight.label}>
                      <strong>{highlight.label}:</strong> {highlight.description}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Experience;
