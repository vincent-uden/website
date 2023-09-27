import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {

  const requestBody = await request.json();

  let body = {
    path: requestBody.path ?? "/unknown",
    projectId: import.meta.env.ANALYTICS_PROJECT_ID,
    secret: import.meta.env.ANALYTICS_PROJECT_SECRET,
  };

  const resp = await fetch(import.meta.env.ANALYTICS_URL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return new Response(JSON.stringify({ success: resp.ok }));
}
