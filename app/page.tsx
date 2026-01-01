import Layout from "@/components/Layout"

export default function Home() {
  return (
    <Layout>
      <section className="space-y-6 text-[var(--foreground)]">
        <p>
          Hi! I&apos;m Aditya, and I like building thoughtful, human-centered software at the point where data
          science meets everyday life. I ship ML-backed products end to end—from experimentation and modeling through
          to the reliable systems that keep experiences fast and delightful.
        </p>
        <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-600 dark:text-slate-300">
          Quotes I live by
        </h2>

        <blockquote className="border-l-2 border-slate-300 pl-4 text-[var(--muted)] dark:border-slate-700/80">
          <p className="italic">
            Karmanye vadhikaraste ma phaleshu kadachana. Ma karma-phala-hetur bhur ma te sangostvakarmani.
            <span className="ml-2 text-sky-600 dark:text-sky-300">Bhagavad Gita 2:47</span>
          </p>
          <p className="mt-2">
            Meaning: Do your actions, and don&apos;t worry about the results. The results will take care of themselves.
          </p>
        </blockquote>

        <blockquote className="border-l-2 border-slate-300 pl-4 text-[var(--muted)] dark:border-slate-700/80">
          <p className="italic">
            Fall in love with some activity, and do it! Nobody ever figures out what life is all about, and it doesn&apos;t matter.
            Explore the world. Nearly everything is really interesting if you go into it deeply enough. Work as hard and as much as you want to on the things you like to do the best. Don&apos;t think about what you want to be, but what you want to do. Keep up some kind of a minimum with other things so that society doesn&apos;t stop you from doing anything at all.
            <span className="ml-2 text-sky-600 dark:text-sky-300">Richard P. Feynman</span>
          </p>
        </blockquote>


        <p>
          Professionally, I&apos;ve supported product, research, and platform teams across health tech and finance. My
          favorite work happens alongside cross-functional partners who care about clear communication, rigorous
          thinking, and getting things done. Away from screens I&apos;m probably listening to music, Reading books
          or watching movies.
        </p>

        <p>
          If you&apos;d like to team up or just chat, feel free to reach out via{" "}
          <a
            className="text-sky-600 transition hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
            href="mailto:iadtyasingh23@gmail.com"
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
    </Layout>
  )
}
