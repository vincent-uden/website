import { useRef, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

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
    <>
      <div
        className={`fixed top-0 left-0 h-full ${
          open ? "translate-x-0" : "-translate-x-[200vw] lg:-translate-x-full"
        } transition-transform`}
      >
        <div className="inline h-full float-left">
          <nav
            className={`bg-pale-grey flex flex-row h-full z-20 left-0 relative ${""} lg:shadow-2xl`}
          >
            <div className="bg-pale-grey h-full overflow-x-visible w-fit">
              <div className="pl-16 pr-16 pt-48 sm:pt-16">
                <a href="/">
                  <p className="text-slate-dark md:text-5xl text-3xl py-4 font-geo whitespace-nowrap hover:text-slate-blue transition-colors pointer-events-initial">
                    HOME
                  </p>
                </a>
                <a href="/blogs" className="z-40">
                  <p className="text-slate-dark md:text-5xl text-3xl py-4 font-geo whitespace-nowrap hover:text-slate-blue transition-colors pointer-events-initial">
                    BLOG ARCHIVE
                  </p>
                </a>
                <a href="/projects">
                  <p className="text-slate-dark md:text-5xl text-3xl py-4 font-geo whitespace-nowrap hover:text-slate-blue transition-colors pointer-events-initial">
                    PROJECTS
                  </p>
                </a>
                <a href="/faq">
                  <p className="text-slate-dark md:text-5xl text-3xl py-4 font-geo whitespace-nowrap hover:text-slate-blue transition-colors pointer-events-initial">
                    FAQ
                  </p>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="bg-pale-grey sm:bg-slate-blue lg:bg-slate-dark w-32 h-full inline absolute top-0 -right-32 "></div>
        <div
          className="bg-slate-blue w-24 h-full absolute top-0 -right-56 hidden lg:inline"
          onClick={() => setOpen(!open)}
        >
          <div className="grid h-full justify-items-center items-center">
            <div
              className={`flex flex-row justify-center w-24 h-24 text-pale-grey ${
                open ? "rotate-180" : "rotate-0"
              } transition-transform`}
            >
            <BsChevronDoubleRight size={72} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed top-12 right-8 z-40 "
        onClick={() => setOpen(!open)}
      >
        <div
          className={`w-16 h-16 ${
            open ? "text-slate-dark sm:text-pale-grey" : "text-pale-grey"
          } transition-colors lg:hidden`}
        >
        <BiMenu size={64} />
        </div>
      </div>
    </>
  );
};

export default Menu;
