import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { getAllPosts } from '@/lib/blog'

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tips, recipes, and stories about food and cooking.
        </p>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-lg bg-card p-8 text-center shadow-sm border border-border">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                {post.coverImage && (
                  <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-muted">
                    {/* Image would be rendered here with next/image in production */}
                  </div>
                )}
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="mt-3 text-muted-foreground">{post.description}</p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
