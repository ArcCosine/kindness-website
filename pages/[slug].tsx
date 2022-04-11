import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import { getAllPosts, getPostBySlug } from "./api/markdown";
import markdownToHtml from "./api/markdownToHtml";
import Header from "./components/Header";
import Footer from "./components/Footer";
import postStyle from "../styles/Post.module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
    const posts = getAllPosts(["slug"]);
    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps = async ({ params }: any) => {
    const post = getPostBySlug(params.slug, [
        "slug",
        "title",
        "published",
        "content",
        "date",
    ]);
    // Markdown を HTML に変換する
    const content = await markdownToHtml(post.content);
    // content を詰め直して返す
    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
};

const Post: NextPage<Props> = ({ post }) => {
    const router = useRouter();
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <div className="container mx-auto mt-8">
            <Header />

            <main className="container">
                <h1 className="text-center text-5xl font-bold mb-8">
                    Kindness
                </h1>
                <article className="m-8">
                    <div className="grid">
                        <div className={postStyle.post}>
                            <p>{post.date} published.</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />
                        </div>
                    </div>
                </article>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Post;
