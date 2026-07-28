import { createSignal, For } from "solid-js";

export default function Menu() {

    const entries = [
        {name: "HOME", link: "/"},
        {name: "ARTICLES", link: "/blog"},
        {name: "PROJECTS", link: "https://github.com/vincent-uden"},
    ];

  return (
    <>
      <div>
        <div class="flex flex-row gap-4 lg:gap-16 pl-4 md:pl-8 lg:pl-16 mt-12">
            <For each={entries}>
            {(entry) => (
                <a href={entry.link}>
                    <p class="font-geo text-3xl md:text-4xl lg:text-5xl text-pale-grey hover:text-slate-blue">
                    {entry.name}
                    </p>
                </a>
            )}
            </For>
        </div>
      </div>
    </>
  );
}
