import Link from "next/link"

import Layout from "@/components/Layout"
import { getAllPostSummaries } from "@/lib/posts"

const BLOG_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
})

function formatDate(date: string) {
  return BLOG_DATE_FORMAT.format(new Date(date))
}

export default async function Blog() {
  const allPosts = await getAllPostSummaries()

  return (
    <Layout>
      <section className="space-y-8 text-[var(--foreground)]">
        <header>
          <h1 className="text-xl font-semibold uppercase tracking-[0.24em] text-slate-700 dark:text-slate-200">Blog</h1>
          <p className="mt-3 max-w-xl text-[var(--muted)]">
            Essays, field notes, and experiments from the intersection of data science, ML, and humane software.
          </p>
        </header>

        <div className="space-y-6">
          {allPosts.map((post) => (
            <article key={post.slug} className="border-b border-slate-300 pb-6 last:border-none last:pb-0">
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg font-medium text-sky-600 transition hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
              >
                {post.title}
              </Link>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                <time>{formatDate(post.date)}</time>
                {post.tags.length > 0 && (
                  <span className="text-slate-500">• {post.tags.join(", ")}</span>
                )}
              </div>
              {post.excerpt && (
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
