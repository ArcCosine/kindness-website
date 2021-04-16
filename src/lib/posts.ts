import fs from "fs";
import path from "path";
import matter from "gray-matter";
import unified from "unified";
import remark2parse from "remark-parse";
import remark2rehype from "remark-rehype";
import remark2stringify from "remark-stringify";

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

    const processdContent = await unified()
        .use(remark2parse)
        .use(remark2rehype)
        .use(remark2stringify)
        .process(post.content);

    const content = processdContent.toString();

    return {
        ...post,
        content,
    };
}

export function getSortedPostsData() {
    return ALL_POSTS.sort((a, b) => {
        if (a.published < b.published) {
            return 1;
        } else {
            return -1;
        }
    });
}
