import { useRef, useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [discord, setDiscord] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const openPopup = () => {
    const popup = popupRef.current!!;

    popup.classList.add("show-popup");

    setTimeout(() => {
      popup.classList.remove("show-popup");
    }, 2000);
  };

  return (
    <div className="fixed top-0 left-0 h-full">
      <nav
        className={`bg-pale-grey flex flex-row h-full z-20 left-0 relative ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform shadow-2xl`}
      >
        <div className="bg-pale-grey h-full w-32 overflow-x-visible">
          <div className="pl-24 py-16">
            <a href="/">
              <p className="text-slate-dark text-6xl py-4 font-geo whitespace-nowrap @hover-text-slate-blue transition-colors">
                HOME
              </p>
            </a>
            <a href="/blogs" className="z-40">
              <p className="text-slate-dark text-6xl py-4 font-geo whitespace-nowrap @hover-text-slate-blue transition-colors">
                BLOG ARCHIVE
              </p>
            </a>
            <a href="/projects">
              <p className="text-slate-dark text-6xl py-4 font-geo whitespace-nowrap @hover-text-slate-blue transition-colors">
                PROJECTS
              </p>
            </a>
            <a href="/faq">
              <p className="text-slate-dark text-6xl py-4 font-geo whitespace-nowrap @hover-text-slate-blue transition-colors">
                FAQ
              </p>
            </a>
          </div>
          <div className="absolute bottom-24 left-24">
            <a href="https://github.com/vincent-uden">
              <div className="i-mdi-github w-32 h-32 text-slate-dark inline-block @hover-text-slate-blue transition-colors"></div>
            </a>
            <div
              className="inline-block relative mx-8"
              onMouseEnter={() => setDiscord(true)}
              onMouseLeave={() => setDiscord(false)}
              onClick={() => {
                navigator.clipboard.writeText("Vincent Udén#4873");
                openPopup();
              }}
            >
              <div className="i-carbon-logo-discord w-32 h-32 text-slate-dark inline-block @hover-text-slate-blue transition-colors"></div>
              <div
                className={`absolute bottom-full left-0 pointer-events-none ${
                  discord ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              >
                <p className="text-pale-grey bg-slate-dark py-4 rounded-4 text-lg font-gothic whitespace-nowrap relative w-52 -left-10 text-center">
                  Vincent Udén#4873
                </p>
              </div>
            </div>
            <div
              className="inline-block relative"
              onMouseEnter={() => setEmail(true)}
              onMouseLeave={() => setEmail(false)}
              onClick={() => {
                navigator.clipboard.writeText("vincentuden@gmail.com");
                openPopup();
              }}
            >
              <div className="i-mdi-alternate-email w-32 h-32 text-slate-dark inline-block @hover-text-slate-blue transition-colors"></div>
              <div
                className={`absolute bottom-full left-0 pointer-events-none z-40 ${
                  email ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              >
                <p className="text-pale-grey bg-slate-dark py-4 rounded-4 text-lg font-gothic whitespace-nowrap relative w-60 -left-10 text-center">
                  vincentuden@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="translate-x-full w-fit h-full overflow-x-visible shadow-menu">
          <div className="bg-pale-grey w-58 h-full inline-block z-20" />
          <div className="bg-slate-dark w-32 h-full inline-block z-20" />
          <div
            className="bg-slate-blue w-24 h-full inline-block z-20"
            onClick={() => setOpen(!open)}
          >
            <div
              className={`i-bi-chevron-double-left text-pale-grey w-16 h-full m-auto scale-x-100 ${
                open ? "rotate-0" : "rotate-180"
              } transition-transform`}
            />
          </div>
        </div>
      </nav>

      <div className="fixed left-50vw bottom-10 z-40 opacity-0" ref={popupRef}>
        <p className="-translate-x-1/2 bg-slate-dark shadow-popup text-pale-grey p-4 text-xl rounded-4">
          Copied to clipboard
        </p>
      </div>
    </div>
  );
};

export default Menu;
