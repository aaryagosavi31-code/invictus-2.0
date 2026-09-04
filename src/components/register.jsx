import image2 from '../assets/Image2.png'

export default function Register() {
  return (
    <main className="register-page">
      <div className="register-card">
      <img
        src={image2}
        className="register-image"
        alt="Classical painting of the Pantheon"
      />
      <div className="register-shade" />
      <div className="register-frame" />
      <div className="register-content">
        <p className="register-title">Join the Pantheon</p>
        <div className="register-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <p className="register-quote">
        &quot;The gods envy us for our fleeting moments — make yours
        eternal.&quot;
        </p>
        <a
          className="register-button"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfDWzX2pvKTyXPa3YoZtdUhdbMJvKH1NNbghtDqtY-YlycBvw/viewform"
          target="_blank"
          rel="noreferrer"
        >
          REGISTER NOW
        </a>
      </div>
      </div>
    </main>
  );
}