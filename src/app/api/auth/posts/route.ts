import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, excerpt, status, type } = body; // 👈 Destructuring type here

    // 1. Automatically grab the secure HttpOnly JWT token set during login
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;

    if (!adminToken) { 
      return NextResponse.json(
        { error: "Unauthorized session. Please log in again." },
        { status: 401 }
      );
    }

    // 2. Execute the native WPGraphQL createPost mutation layout with category mapping
    const wpResponse = await fetch("https://sech-gh.org/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Send the JWT to authenticate this specific database write operation
        "Authorization": `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        query: `
          mutation CreateNewPost(
            $title: String!, 
            $content: String!, 
            $excerpt: String!, 
            $status: PostStatusEnum!, 
            $categoryName: String!
          ) {
            createPost(input: { 
              title: $title, 
              content: $content, 
              excerpt: $excerpt, 
              status: $status,
              categories: {
                nodes: [{ name: $categoryName }]
              }
            }) {
              post {
                id
                databaseId
                slug
                status
                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        `,
        variables: {
          title: title,
          content: content,
          excerpt: excerpt,
          // WPGraphQL PostStatusEnum expects uppercase strings: 'PUBLISH' or 'DRAFT'
          status: status === "published" ? "PUBLISH" : "DRAFT",
          categoryName: type, // 👈 Maps selection ("news", "blog", etc.) to a WordPress category
        },
      }),
    });

    const { data, errors } = await wpResponse.json();

    // 3. Handle GraphQL validation faults gracefully
    if (errors) {
      return NextResponse.json(
        { error: errors[0]?.message || "WordPress database mutation rejected." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      post: data?.createPost?.post,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server communication error" }, { status: 500 });
  }
}