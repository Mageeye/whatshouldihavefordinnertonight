import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { getPostBySlug, getPostSlugs } from '@/lib/blog'

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-6 text-sm text-primary hover:text-primary/80"
        >
          ← Back to Blog
        </Link>
        <article>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString()}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="prose prose-lg mt-8 max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-muted-foreground">
              {post.content}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
