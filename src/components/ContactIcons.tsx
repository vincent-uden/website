import { AiFillGithub, AiOutlineMail } from "solid-icons/ai";
import { FaBrandsDiscord } from "solid-icons/fa";
import { For, Show, createSignal } from "solid-js";

export default function ContactIcons() {
  const [hovering, setHovering] = createSignal<number | null>(null);
  const [copying, setCopying] = createSignal<number | null>(null);

  const contacts = [
    { icon: FaBrandsDiscord, display: "vincentuden", contact: "vincentuden" },
    {
      icon: AiFillGithub,
      display: "github.com/vincent‑uden",
      contact: "https://github.com/vincent-uden",
    },
    {
      icon: AiOutlineMail,
      display: "vincentuden@gmail.com",
      contact: "vincentuden@gmail.com",
    },
  ];

  function copyToClipboard(text: string, i: number) {
    navigator.clipboard.writeText(text);
    setCopying(i);

    setTimeout(() => setCopying(null), 1000);
  }

  return (
    <div class="relative flex flex-row justify-center">
      <div class="flex flex-col gap-8 justify-around bg-pale-grey rounded-full px-4 py-6 shadow-md">
        <For each={contacts}>
          {(contact, i) => (
            <div class="relative">
              <contact.icon
                class="text-slate-blue hover:text-slate-dark transition-colors"
                onmouseenter={() => setHovering(i)}
                onmouseleave={() => setHovering(null)}
                onclick={() => copyToClipboard(contact.contact, i())}
                size={64}
              />
              <p
                class={`absolute top-1/2 -translate-y-1/2 -translate-x-8 right-full bg-pale-grey rounded-full px-4 py-2 text-slate-dark font-gothic font-bold transition-opacity w-max ${
                  hovering() == i() ? "opacity-100" : "opacity-0"
                }`}
              >
                {copying() == i() ? "Copied ✓" : contact.display}
              </p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
