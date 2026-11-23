/** Presents the portfolio owner's biography and education. */
import CrayonStars from '../CrayonStars';

function Introduction() {
  return (
    <main className="page page--light introduction-page">
      <CrayonStars count={45} seed="introduction" variant="cream" />
      <div className="page-content introduction-content">
        <p className="eyebrow">INTRODUCTION</p>
        <h1 className="page-title">ABOUT ME</h1>
        {/* The biography is split into short editorial sections. */}
        <div className="introduction-sections">
          <section className="introduction-section">
            <h2 className="introduction-section__heading">Background</h2>
            <p className="page-copy">
              I’m Fanni, originally from Hungary, and I’m currently pursuing a Master’s in
              Interaction and Experience Design at the University of Limerick in Ireland. I’ve
              been interested in science and technology from a young age, and I built a strong
              foundation in programming and software engineering during my Computer Science
              BSc at Eötvös Loránd University and while working as a developer at Morgan Stanley.
              After finishing my undergraduate degree, I wanted to pair that technical
              background with a more creative, human-focused discipline, which is what brought me
              to Limerick.
            </p>
          </section>
          <section className="introduction-section">
            <h2 className="introduction-section__heading">How I Work</h2>
            <p className="page-copy">
              While I genuinely enjoy software development, what has always excited me most
              about coding is the creativity behind it. I discovered my true passion while
              teaching programming to children at Logiscool during university. I feel right at
              home in the classroom, cheering students on, supporting them through tricky
              problems, and celebrating when things click. Moving forward, my goal is to work in
              EdTech, designing accessible tools and ideally teaching with them to support
              children’s creativity and learning.
            </p>
          </section>
          <section className="introduction-section">
            <h2 className="introduction-section__heading">Outside the Screen</h2>
            <p className="page-copy">
              Away from my laptop, I love making things by hand, especially crocheting, where
              you get to build something tangible out of a simple ball of yarn. I’m also
              energized by working alongside people from different cultures and backgrounds,
              as new perspectives always spark better ideas. That curiosity is what led me to
              spend an Erasmus semester in Palermo, Italy, and eventually move to Ireland for my
              Master’s.
            </p>
          </section>
        </div>
        {/* Education follows the biography in the same page content column. */}
        <section aria-labelledby="introduction-education-title" className="introduction-education">
          <h2 className="introduction-education__heading" id="introduction-education-title">
            Education
          </h2>
          <div className="introduction-education__list">
            <article className="introduction-education__item">
              <div className="introduction-education__item-heading">
                <h3>Interaction and Experience Design MSc</h3>
                <p className="introduction-education__period">2026 – Present</p>
              </div>
              <p className="introduction-education__institution">
                University of Limerick · Limerick, Ireland
              </p>
            </article>
            <article className="introduction-education__item">
              <div className="introduction-education__item-heading">
                <h3>Computer Science BSc</h3>
                <p className="introduction-education__period">2023 – 2026</p>
              </div>
              <p className="introduction-education__institution">
                Eötvös Loránd University (ELTE) · Budapest, Hungary
              </p>
              <p className="introduction-education__detail">
                Includes an Erasmus mobility semester at the University of Palermo, Italy.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Introduction;
