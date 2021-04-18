import fs from "fs";
import path from "path";
import matter from "gray-matter";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";

const POSTS_DIRECTORIES = path.join(process.cwd(), "content/");
const ALL_POSTS = (() => {
    const fileNames = fs.readdirSync(POSTS_DIRECTORIES);
    return fileNames.map((fileName) => {
        const fullPath = path.join(POSTS_DIRECTORIES, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContent);
        const matterResultData = matterResult.data as MatterResult["data"];
        return {
            content: matterResult.content,
            ...matterResultData,
            fileName,
        };
    });
})();

const ID_FILENAME_MAP = (() => {
    const map = new Map();
    ALL_POSTS.forEach((post) => {
        map.set(post.id, post.fileName.replace(/\.md$/, ""));
    });
    return map;
})();

type MatterResult = {
    content: string;
    data: {
        id: string;
        title: string;
        published: string;
    };
};

export type Post = {
    content: string;
    id: string;
    title: string;
    published: string;
};

export function getAllPostIds() {
    return Array.from(ID_FILENAME_MAP.keys());
}

export async function getPostData(id: string): Promise<Post> {
    const post = ALL_POSTS.find((post) => id === post.id) as Post;

    const processedContent  = await unified()
        .use(markdown)
        .use(remark2rehype)
        .use(html)
        .process(post.content);

    const content = processedContent.toString();

    return {
        ...post,
        content,
    };
}

export function getSortedPostsData() {
    return ALL_POSTS.sort((a, b) => {
        if (new Date(a.published).getTime() < new Date(b.published).getTime()) {
            return 1;
        } else {
            return -1;
        }
    });
}
