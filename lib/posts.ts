import fs from "fs/promises"
import path from "path"
import type { ReactNode } from "react"
import { cache } from "react"

import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const POSTS_DIR = path.join(process.cwd(), "blog")

export type PostFrontMatter = {
  title: string
  date: string
  excerpt?: string
  tags?: string[]
  heroImage?: string
}

export type PostSummary = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  heroImage?: string
}

export type Post = PostSummary & {
  content: ReactNode
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: { className: ["heading-link"] },
        },
      ],
    ],
  },
  parseFrontmatter: true,
} as const

async function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  return fs.readFile(filePath, "utf8")
}

export const getPostSlugs = cache(async (): Promise<string[]> => {
  let entries: string[] = []

  try {
    entries = await fs.readdir(POSTS_DIR)
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException
    if (nodeError.code === "ENOENT") {
      return []
    }
    throw error
  }

  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""))
})

export const getAllPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const slugs = await getPostSlugs()

  const summaries = await Promise.all(
    slugs.map(async (slug) => {
      const file = await readPostFile(slug)
      const { data } = matter(file)
      const frontmatter = data as PostFrontMatter

      if (!frontmatter.title || !frontmatter.date) {
        throw new Error(`Post "${slug}" is missing required front matter (title and/or date).`)
      }

      const summary: PostSummary = {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt ?? "",
        tags: frontmatter.tags ?? [],
        heroImage: frontmatter.heroImage,
      }
      return summary
    }),
  )

  return summaries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
})

export const getRecentPosts = cache(async (limit = 3): Promise<PostSummary[]> => {
  const posts = await getAllPostSummaries()
  return posts.slice(0, limit)
})

export const getPostBySlug = cache(async (slug: string): Promise<Post> => {
  const file = await readPostFile(slug)

  const { frontmatter, content } = await compileMDX<PostFrontMatter>({
    source: file,
    options: mdxOptions,
  })

  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(`Post "${slug}" is missing required front matter (title and/or date).`)
  }

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt ?? "",
    tags: frontmatter.tags ?? [],
    heroImage: frontmatter.heroImage,
    content,
  }
})
