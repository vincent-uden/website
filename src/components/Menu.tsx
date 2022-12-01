import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);

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
            <div className="i-mdi-github w-32 h-32 text-slate-dark inline-block"></div>
            <div className="i-carbon-logo-discord w-32 h-32 text-slate-dark inline-block mx-8"></div>
            <div className="i-mdi-alternate-email w-32 h-32 text-slate-dark inline-block"></div>
          </div>
        </div>
        <div className="translate-x-full w-fit h-full overflow-x-visible shadow-menu">
          <div className="bg-pale-grey w-58 h-full inline-block z-20" />
          <div className="bg-slate-dark w-32 h-full inline-block z-20" />
          <div className="bg-slate-blue w-24 h-full inline-block z-20">
            <div
              className={`i-mdi-chevron-double-left bg-pale-grey w-24 h-full m-auto scale-x-75 ${
                open ? "rotate-0" : "rotate-180"
              } transition-transform`}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
