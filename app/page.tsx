import Link from "next/link"

import Layout from "@/components/Layout"
import { getRecentPosts } from "@/lib/posts"

const BLOG_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
})

function formatDate(date: string) {
  return BLOG_DATE_FORMAT.format(new Date(date))
}

export default async function Home() {
  const recentPosts = await getRecentPosts(3)

  return (
    <Layout>
      <section className="space-y-6 text-[var(--foreground)]">
        <p>
          Hi! I&apos;m Aditya, and I like building thoughtful, human-centered software at the point where data
          science meets everyday life. I ship ML-backed products end to end—from experimentation and modeling through
          to the reliable systems that keep experiences fast and delightful.
        </p>

        <blockquote className="border-l-2 border-slate-300 pl-4 text-[var(--muted)] dark:border-slate-700/80">
          <p className="italic">
            From everyone who has been given much, much will be demanded; and from the one who has been entrusted with
            much, much more will be asked. <span className="text-sky-600 dark:text-sky-300">Luke 12:48</span>
          </p>
        </blockquote>

        <p>
          Professionally, I&apos;ve supported product, research, and platform teams across health tech and finance. My
          favorite work happens alongside cross-functional partners who care about clear communication, rigorous
          thinking, and getting things done. Away from screens I&apos;m probably boxing, planning the next trip, or
          chasing the perfect espresso.
        </p>

        <p>
          If you&apos;d like to team up or just chat, feel free to reach out via{" "}
          <a
            className="text-sky-600 transition hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
            href="mailto:contact@pupscub.dev"
          >
            email
          </a>{" "}
          or{" "}
          <a
            className="text-sky-600 transition hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
            href="https://www.linkedin.com/in/aditya2312"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>

        <p className="text-[var(--muted)]">
          For the curious: this site is built with Next.js, Tailwind (v4), and a dash of custom CSS to recreate the
          retro terminal vibe. The design is inspired by{" "}
          <a
            className="text-sky-600 transition hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
            href="https://terminalcss.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terminal.css
          </a>{" "}
          and Eric J. Ma&apos;s personal site.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-600 dark:text-slate-300">Recent Writing</h2>
        <div className="grid gap-3">
          {recentPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col gap-1 border-b border-slate-300 pb-4 last:border-none last:pb-0 sm:flex-row sm:items-start sm:justify-between"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="font-medium text-sky-600 transition hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
              >
                {post.title}
              </Link>
              <time className="text-[11px] uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                {formatDate(post.date)}
              </time>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
