/** Presents the portfolio's contact links and downloadable CV. */
// Vite turns this PDF import into the URL used by the download action.
import cvPdf from '../../assets/Fanni_Porneczi_CV.pdf';
import CrayonStars from '../CrayonStars';

function Contact() {
  return (
    <main className="page page--crimson contact-page">
      <CrayonStars count={20} seed="contact" variant="crimson" />
      <div className="page-content contact-content">
        <p className="eyebrow">SAY HELLO</p>
        <h1 className="contact-heading">Let's work together.</h1>
        {/* Keep all contact and CV actions together as one responsive group. */}
        <div className="contact-links">
          <a
            aria-label="Email: fannicelld@gmail.com"
            href="mailto:fannicelld@gmail.com"
            className="contact-link"
          >
            <span>Email</span>
          </a>
          <a
            aria-label="LinkedIn: Fanni Pörneczi"
            href="https://www.linkedin.com/in/fanniporneczi/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>LinkedIn</span>
          </a>
          <a
            aria-label="GitHub: fanniporneczi"
            href="https://github.com/fanniporneczi"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>GitHub</span>
          </a>
          <a
            aria-label="Download CV"
            href={cvPdf}
            download="Fanni_Porneczi_CV.pdf"
            className="contact-link"
          >
            <span>Download CV</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default Contact;
