import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Layout from "@/components/Layout"
import { SharePost } from "@/components/SharePost"
import { getAllPostSummaries, getPostBySlug } from "@/lib/posts"

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

function toDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export async function generateStaticParams() {
  const posts = await getAllPostSummaries()
  return posts.map((post) => ({ slug: post.slug }))
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    const canonicalUrl = `${siteUrl}/blog/${post.slug}`
    return {
      title: `${post.title} | Aditya Singh`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        url: canonicalUrl,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    }
  } catch (error) {
    return {
      title: "Post not found",
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post
  try {
    post = await getPostBySlug(slug)
  } catch (error) {
    notFound()
  }

  if (!post) {
    notFound()
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`

  return (
    <Layout>
      <article className="space-y-8 text-[var(--foreground)]">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Blog Post</p>
          <h1 className="text-2xl font-semibold text-sky-600 dark:text-sky-300">{post.title}</h1>
          <time className="block text-[11px] uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
            {toDateLabel(post.date)}
          </time>
          {post.excerpt && <p className="max-w-2xl text-base text-[var(--muted)]">{post.excerpt}</p>}
        </header>

        <div className="markdown-body text-lg leading-7 text-[var(--foreground)] [&_a]:text-sky-600 [&_a:hover]:text-sky-700 [&_strong]:text-[var(--foreground)] [&_code]:rounded-sm [&_code]:bg-slate-200/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_img]:mt-6 [&_img]:rounded-md [&_img]:border [&_img]:border-slate-300 [&_img]:shadow-sm [&_img]:max-w-full [&_img]:h-auto [&_iframe]:mt-6 [&_iframe]:w-full [&_iframe]:rounded-md [&_iframe]:border [&_iframe]:border-slate-400 [&_iframe]:bg-black [&_blockquote]:border-l-2 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:text-[var(--muted)] [&_li]:leading-7 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mt-4 dark:[&_code]:bg-slate-800/70 dark:[&_img]:border-slate-700 dark:[&_blockquote]:border-slate-700 [&_figure]:mt-6 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-slate-500 [&_figcaption]:italic dark:[&_figcaption]:text-slate-400 [&_video]:rounded-md [&_video]:border [&_video]:border-slate-300 [&_video]:shadow-sm dark:[&_video]:border-slate-700">
          {post.content}
        </div>

        <SharePost title={post.title} url={postUrl} />
      </article>
    </Layout>
  )
}
