import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateSocialCard } from "../../../utils/social-card.js";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      summary: post.data.preview,
    },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const image = await generateSocialCard(props.title, props.summary);

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
