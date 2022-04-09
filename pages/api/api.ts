import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

type Post = {
  slug: string;
  content: string;
  title: string;
  date: string;
  published: number;
};

const postsDirectory = path.join(process.cwd(), "content");

/**
 * postsDirectory 以下のディレクトリ名を取得する
 */
export function getPostSlugs() {
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  return allDirents
    .filter((dirent) => dirent.isFile())
    .map(({ name }) => name);
}

/**
 * 指定したフィールド名から、記事のフィールドの値を取得する
 */
export function getPostBySlug(slug: string, fields: string[] = []) {
  const ext = slug.indexOf(".md" ) > -1 ? "" : ".md";
  const fullPath = path.join(postsDirectory, slug+ext);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Post = {
    slug: "",
    content: "",
    title: "",
    date: "",
    published: 0,
  };

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug.replace(".md","");
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "title" )  {
      items[field] = data[field];
    }
    if (field === "published" )  {
      items[field] = dayjs(data[field]).valueOf();
    }
    if( field === "date" ){
      items[field] = data["published"];
    }

  });
  return items;
}

/**
 * すべての記事について、指定したフィールドの値を取得して返す
 * @param fields 取得するフィールド
 */
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((a, b) => (a.published > b.published ? -1 : 1));
  return posts;
}
