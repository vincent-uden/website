import { useRef, useState } from "react";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IconContext } from "react-icons";
import { useWindowSize } from "usehooks-ts";

const ContactIcons = () => {
  const [discord, setDiscord] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);

  const { width, height } = useWindowSize();

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
      <div className="w-fit mx-auto flex flex-row gap-8">
        <IconContext.Provider
          value={{
            className: "text-slate-dark hover:text-pale-grey transition-colors",
          }}
        >
          <a href="https://github.com/vincent-uden" className="">
            <div className="md:w-24 md:h-24 inline-block drop-shadow-xl p-[5px]">
              <BsGithub size={width > 768 ? 86 : 54}/>
            </div>
          </a>
          <div
            className="inline-block relative drop-shadow-xl"
            onMouseEnter={() => setDiscord(true)}
            onMouseLeave={() => setDiscord(false)}
            onClick={() => {
              navigator.clipboard.writeText("Vincent Udén#4873");
              openPopup();
            }}
          >
            <BsDiscord size={width > 768 ? 96 : 64} />
            <div
              className={`absolute bottom-full left-0 pointer-events-none ${
                discord ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <p className="text-pale-grey bg-slate-dark py-4 rounded-xl text-lg font-gothic whitespace-nowrap relative w-52 -left-16 md:-left-14 text-center">
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
            <MdEmail size={width > 768 ? 96 : 64} />
            <div
              className={`absolute bottom-full left-0 pointer-events-none ${
                email ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <p className="text-pale-grey bg-slate-dark py-4 rounded-xl text-lg font-gothic whitespace-nowrap relative w-60 -left-32 md:-left-[4.5rem] text-center">
                vincentuden@gmail.com
              </p>
            </div>
          </div>
        </IconContext.Provider>
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
