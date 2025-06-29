import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getPostBySlug } from "@/lib/markdown";
import markdownToHtml from "@/lib/markdownToHtml";
import postStyle from "@/styles/Post.module.css";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    if (!slug) {
        return notFound();
    }
    try {
        const post = getPostBySlug(slug, ["title"]);
        return {
            title: post.title,
        };
    } catch (e) {}
    return {
        title: "Kindness Contents.",
    };
}

export default async function Post(props: Props) {
    const { slug } = await props.params;
    if (!slug) {
        return notFound();
    }
    try {
        const post = getPostBySlug(slug, [
            "slug",
            "title",
            "published",
            "content",
            "date",
        ]);

        // Markdown を HTML に変換する
        const content = await markdownToHtml(post.content || "");

        return (
            <article className="m-8">
                <div className="grid">
                    <div className={postStyle.post}>
                        <p>{post.published} published.</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        />
                    </div>
                </div>
            </article>
        );
    } catch (e) {
        console.log(e);
        return notFound();
    }
}
