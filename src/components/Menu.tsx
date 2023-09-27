import { BiRegularChevronsRight, BiRegularMenu } from "solid-icons/bi";
import { createSignal } from "solid-js";

export default function Menu() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <div
        class={`w-screen lg:w-[50rem] h-screen bg-pale-grey fixed top-0 left-0 transition-transform lg:shadow-menu ${
          open()
            ? "translate-x-0"
            : "-translate-x-[100vw] lg:-translate-x-[calc(55rem-15rem)] xl:-translate-x-[calc(50rem-15rem)]"
        }`}
      >
        <div class="h-32" />

        <div class="flex flex-col gap-4 lg:gap-8 pl-8 lg:pl-16">
          <a href="/">
            <p class="font-geo text-4xl lg:text-5xl text-slate-dark hover:text-slate-blue">
              HOME
            </p>
          </a>
          <a href="/blogs">
            <p class="font-geo text-4xl lg:text-5xl text-slate-dark hover:text-slate-blue">
              BLOG ARCHIVE
            </p>
          </a>
        </div>

        <a class="absolute bottom-20 lg:bottom-4 left-8" href="/left-handed">
          <p class="italic font-gothic text-slate-blue">
            Why is the menu on the left?
          </p>
        </a>

        <div class="absolute top-0 right-24 h-full w-36 bg-slate-dark hidden lg:block" />
        <div class="absolute top-0 right-0 h-full w-24 bg-slate-blue flex-col items-center justify-center text-pale-grey cursor-pointer hidden lg:flex">
          <BiRegularChevronsRight
            class={`transition-transform ${
              open() ? "rotate-180 -translate-x-1" : "rotate-0 translate-x-1"
            }`}
            size={96}
            onClick={() => setOpen((x) => !x)}
          />
        </div>
      </div>

      <div
        class={`fixed top-4 left-4 transition-colors drop-shadow-sm lg:hidden cursor-pointer ${
          open() ? "text-slate-dark" : "text-pale-grey"
        }`}
        onClick={() => setOpen((x) => !x)}
      >
        <BiRegularMenu size={64} />
      </div>
    </>
  );
}
