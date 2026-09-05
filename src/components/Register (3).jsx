import image2 from '../assets/Image2.png'
import imageDesktopBg from '../assets/Image2Desktop.jpeg' // <-- your wider PC background image

export default function Register() {
  return (
    <main id="registration" style={styles.page}>
      <style>{responsiveCSS}</style>

      <div style={styles.card} className="register-card">

        {/* Mobile-only image */}
        <img
          src={image2}
          className="register-image-mobile"
          style={styles.mobileImage}
          alt="Classical painting of the Pantheon"
        />

        {/* Desktop-only wide background image */}
        <div
          className="register-image-desktop"
          style={{
            ...styles.desktopBg,
            backgroundImage: `url(${imageDesktopBg})`,
          }}
          role="img"
          aria-label="Classical painting of the Pantheon"
        />

        <div style={styles.shade} />
        <div style={styles.frame} />

        <div style={styles.content}>
          <p style={styles.title}>Join the Pantheon</p>

          <div style={styles.divider} aria-hidden="true">
            <span style={styles.dividerLine} />
            <i style={styles.dividerDot} />
            <span style={styles.dividerLine} />
          </div>

          <p style={styles.quote}>
            &quot;The gods envy us for our fleeting moments — make yours
            eternal.&quot;
          </p>

          <a
            style={styles.button}
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

// Media-query behavior that plain inline styles can't express on their own.
const responsiveCSS = `
  .register-image-desktop {
    display: none;
  }
  .register-image-mobile {
    display: block;
  }
  @media (min-width: 768px) {
    .register-image-mobile {
      display: none;
    }
    .register-image-desktop {
      display: block;
    }
  }
`;

const styles = {
  page: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '480px',
    overflow: 'hidden',
  },
  mobileImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    display: 'block',
  },
  desktopBg: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  shade: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  frame: {
    position: 'absolute',
    inset: '12px',
    border: '1px solid rgba(196, 181, 253, 0.3)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 24px',
  },
  title: {
    fontSize: '28px',
    fontFamily: 'serif',
    letterSpacing: '0.05em',
    color: '#ede9fe',
    margin: 0,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '16px 0',
  },
  dividerLine: {
    width: '32px',
    height: '1px',
    backgroundColor: 'rgba(196, 181, 253, 0.6)',
    display: 'block',
  },
  dividerDot: {
    width: '6px',
    height: '6px',
    transform: 'rotate(45deg)',
    backgroundColor: 'rgba(196, 181, 253, 0.6)',
    display: 'block',
  },
  quote: {
    maxWidth: '400px',
    fontStyle: 'italic',
    color: 'rgba(221, 214, 254, 0.8)',
    marginBottom: '24px',
  },
  button: {
    padding: '12px 24px',
    border: '1px solid rgba(196, 181, 253, 0.6)',
    color: '#ede9fe',
    letterSpacing: '0.15em',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
  },
};
