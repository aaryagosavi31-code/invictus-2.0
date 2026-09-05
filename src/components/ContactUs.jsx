const prHeads = [
  {
    name: "Nandish Vyas",
    phone: "+91 70399 66655"
  },
  {
    name: "Lavisha Boliya",
    phone: "+91 93244 68782"
  }
];

function ContactPerson({ name, title, phone, href }) {
  return (
    <div className="text-center">
      <div className="text-[clamp(8px,0.8vw,12px)] text-[#d2a452]">✦</div>

      <h3 className="mt-[clamp(2px,0.4vh,6px)] font-cinzel text-[clamp(15px,1.65vw,28px)] font-medium tracking-[0.05em] text-[#f3e3bc]">
        {name}
      </h3>

      <p className="mt-[clamp(1px,0.3vh,4px)] font-cinzel text-[clamp(7px,0.65vw,11px)] uppercase tracking-[0.16em] text-[#d2a452]">
        {title}
      </p>

      <a
        href={href}
        className="mx-auto mt-[clamp(6px,1.1vh,15px)] flex w-fit items-center gap-2 font-cinzel text-[clamp(9px,0.8vw,13px)] tracking-[0.08em] text-[#f3e3bc] transition hover:text-[#f0cf89]"
      >
        <span className="grid h-[clamp(22px,2.3vw,36px)] w-[clamp(22px,2.3vw,36px)] place-items-center rounded-full bg-[#b88533]/30 text-[clamp(10px,1vw,16px)] text-[#f0cf89]">
          ☎
        </span>
        {phone}
      </a>
    </div>
  );
}

function ContactUs() {
  return (
    <main className="relative h-[100dvh] min-h-[620px] overflow-hidden bg-[#100c08] text-[#f3e3bc]">
   
      <div className="absolute inset-0 hidden bg-[url('./assets/contact-desktop.png')] bg-cover bg-center bg-no-repeat md:block" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,8,5,0.15),rgba(10,7,5,0.45)),url('./assets/contact-mobile.png')] bg-cover bg-center bg-no-repeat md:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto flex h-full w-[min(88vw,1320px)] flex-col">
        
        <header
          id="contact"
          className="shrink-0 text-center"
        >
          <h1 className="bg-radial from-black/40 to-black/0 mt-[clamp(4px,36vh,140px)] font-cinzel text-[clamp(28px,4.2vw,72px)] font-medium leading-none tracking-[0.1em] text-[#ffe2a3]">
            SEEK THE ORACLE
          </h1>

          <p className="mt-[clamp(4px,0.8vh,10px)] font-cinzel text-[clamp(8px,0.8vw,10px)] tracking-[0.18em] font-bold text-[#ffe7b6]">
            FOR GUIDANCE THROUGH THE REALM OF INVICTUS 2.0
          </p>
        </header>

        <section className="max-md:bg-linear-to-t from-black/30 to-black/0 grid min-h-0 flex-1 grid-cols-1 pb-[clamp(34px,6vh,90px)] pt-[clamp(16px,2.4vh,34px)] md:grid-cols-[0.4fr_0.4fr] md:justify-center md:items-stretch">

          {/* LEFT BOX */}
          <div className="relative flex min-h-0 flex-col justify-center py-[clamp(14px,2vh,30px)]">
            <div className="absolute inset-x-[5%] top-0 h-px bg-[#d2a452]/20 md:hidden" />

            <div className="mb-[clamp(10px,2vh,24px)] text-center">
              <p className="font-cinzel text-[clamp(10px,0.7vw,12px)] tracking-[0.2em] text-[#fedca2]">
                THE HERALDS
              </p>
              <h2 className="mt-1 font-cinzel text-[clamp(13px,1.2vw,21px)] font-medium tracking-[0.1em] text-[#f0e1bf]">
                PUBLIC RELATIONS HEADS
              </h2>
            </div>

            <div className="grid gap-[clamp(14px,2.5vh,32px)]">
              {prHeads.map((person) => (
                <ContactPerson key={person.name} {...person} />
              ))}
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="relative flex min-h-0 flex-col justify-center md:-mt-9.5">
            <div className="mb-[clamp(18px,3vh,42px)] text-center">
              <p className="font-cinzel text-[clamp(10px,0.7vw,12px)] tracking-[0.2em] text-[#ecc88b]">
                THE ARCHON
              </p>
              <h2 className="mt-1 font-cinzel text-[clamp(13px,1.2vw,21px)] font-medium tracking-[0.1em] text-[#f0e1bf]">
                CHAIRPERSON
              </h2>
            </div>
            <ContactPerson
              name="Dhruv Thakur"
              phone="+91 90763 17135"
            />

            <div className="mx-auto mt-[clamp(16px,3vh,42px)] w-full max-w-[340px] border-t border-[#d2a452]/25 pt-[clamp(10px,1.5vh,18px)] text-center">
              <a
                href="mailto:djsce.express@gmail.com"
                className="font-cinzel text-[clamp(7px,1vw,20px)] tracking-[0.1em] text-[#f0d296]/85 transition hover:text-[#f0cf89]"
              >
                ✉ djsce.express@gmail.com
              </a>
            </div>
          </div>
        </section>
        
      </div>
      <h1 className="hidden md:block md:absolute bottom-8 left-1/3 text-[#513206]">
            LEGENDS AREN'T BORN, THEY ARE SUMMONED
      </h1>
    </main>
  );
}

export default ContactUs;