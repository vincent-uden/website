import { useRef, useState } from "react";

const ContactIcons = () => {
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
    <>
      <div className="w-fit mx-auto">
        <a href="https://github.com/vincent-uden" className="bg-dark-grey">
          <div className="w-24 h-24 inline-block drop-shadow-xl">
            <div className="i-mdi-github w-24 h-24 text-slate-dark inline-block @hover-text-slate-blue transition-colors"></div>
          </div>
        </a>
        <div
          className="inline-block relative mx-8 drop-shadow-xl"
          onMouseEnter={() => setDiscord(true)}
          onMouseLeave={() => setDiscord(false)}
          onClick={() => {
            navigator.clipboard.writeText("Vincent Udén#4873");
            openPopup();
          }}
        >
          <div className="i-carbon-logo-discord w-24 h-24 text-slate-dark inline-block @hover-text-slate-blue transition-colors"></div>
          <div
            className={`absolute bottom-full left-0 pointer-events-none ${
              discord ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <p className="text-pale-grey bg-slate-dark py-4 rounded-4 text-lg font-gothic whitespace-nowrap relative w-52 -left-12 text-center">
              Vincent Udén#4873
            </p>
          </div>
        </div>
        <div
          className="inline-block relative drop-shadow-xl"
          onMouseEnter={() => setEmail(true)}
          onMouseLeave={() => setEmail(false)}
          onClick={() => {
            navigator.clipboard.writeText("vincentuden@gmail.com");
            openPopup();
          }}
        >
          <div className="i-mdi-alternate-email w-24 h-24 text-slate-dark inline-block @hover-text-slate-blue transition-colors"></div>
          <div
            className={`absolute bottom-full left-0 pointer-events-none ${
              email ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <p className="text-pale-grey bg-slate-dark py-4 rounded-4 text-lg font-gothic whitespace-nowrap relative w-60 -left-16 text-center">
              vincentuden@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div
        className="fixed left-50vw bottom-10 opacity-0 pointer-events-none"
        ref={popupRef}
      >
        <p className="-translate-x-1/2 bg-slate-dark shadow-popup text-pale-grey p-4 text-xl rounded-4">
          Copied to clipboard
        </p>
      </div>
    </>
  );
};

export default ContactIcons;
