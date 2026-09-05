import image2 from '../assets/Image2.png'
import imageDesktopBg from '../assets/Image2Desktop.jpeg' // <-- your wider PC background image

export default function Register() {
  return (
    <main
      id="registration"
      className="min-h-screen w-full flex items-center justify-center bg-black"
    >
      <div className="relative w-full max-w-md md:max-w-none md:w-full overflow-hidden md:min-h-screen">

        {/* Mobile-only image (unchanged, normal flow) */}
        <img
          src={image2}
          className="block md:hidden w-full h-auto object-cover"
          alt="Classical painting of the Pantheon"
        />

        {/* Desktop-only wide background image */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageDesktopBg})` }}
          role="img"
          aria-label="Classical painting of the Pantheon"
        />

        {/* Shade overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Frame overlay (border accent) */}
        <div className="pointer-events-none absolute inset-3 border border-violet-300/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-10 md:min-h-screen">
          <p className="text-2xl md:text-4xl font-serif tracking-wide text-violet-100">
            Join the Pantheon
          </p>

          <div className="flex items-center gap-2 my-4" aria-hidden="true">
            <span className="w-8 h-px bg-violet-300/60" />
            <i className="w-1.5 h-1.5 rotate-45 bg-violet-300/60 block" />
            <span className="w-8 h-px bg-violet-300/60" />
          </div>

          <p className="max-w-md italic text-violet-200/80 mb-6">
            &quot;The gods envy us for our fleeting moments — make yours
            eternal.&quot;
          </p>

          <a
            className="px-6 py-3 border border-violet-300/60 text-violet-100 tracking-widest hover:bg-violet-300/10 transition-colors"
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
