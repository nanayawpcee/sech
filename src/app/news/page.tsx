import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NewsSection } from "@/components/sections/NewsSection";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Stay up to date with the latest news, events, and health updates from St. Elizabeth Catholic Hospital.",
};

// Fetch news from WordPress GraphQL
async function getNewsPosts() {
  const response = await fetch("https://sech-gh.org/graphql", {
    // ← Change to your actual WP URL
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetNewsPosts {
          posts(
            first: 12
            where: { 
              status: PUBLISH,
              orderby: { field: DATE, order: DESC }
            }
          ) {
            nodes {
              id
              title
              slug
              date
              excerpt
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              categories {
                nodes {
                  name
                }
              }
            }
          }
        }
      `,
    }),
    next: { revalidate: 60 }, // ISR: Revalidate every hour
  });

  const { data } = await response.json();

  return data?.posts?.nodes || [];
}

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <PageHero
        tag="Latest Updates"
        title="News & Announcements"
        subtitle="Events, health campaigns, hospital updates, and community outreach from SECH."
      />
      <NewsSection posts={posts} />
    </>
  );
}
