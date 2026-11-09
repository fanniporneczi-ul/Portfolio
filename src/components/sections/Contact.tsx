/* Contact Component
 * Responsible for rendering Contact section
 */
function Contact() {
  return (
    <div>
      <p className="chalk-subheader">
        Email:{' '}
        <a href="mailto:fannicelld@gmail.com" className="chalk-link">
          fannicelld@gmail.com
        </a>
      </p>

      <p className="chalk-subheader">
        LinkedIn:{' '}
        <a 
          href="https://www.linkedin.com/in/p%C3%B6rneczi-fanni-8b1678358/"
          target="_blank"
          rel="noopener noreferrer"
          className="chalk-link"
        >
          Fanni Pörneczi
        </a>
      </p>
    </div>
  );
}

export default Contact;