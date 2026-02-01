import Link from 'next/link'
import { Header } from '@/components/Header'
import { getAllPosts } from '@/lib/blog'

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Blog
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Tips, recipes, and stories about food and cooking.
        </p>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md"
              >
                {post.coverImage && (
                  <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-gray-200">
                    {/* Image would be rendered here with next/image in production */}
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="mt-3 text-gray-600">{post.description}</p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
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
