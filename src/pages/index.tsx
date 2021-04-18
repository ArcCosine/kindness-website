import { InferGetStaticPropsType, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { getSortedPostsData } from "@/lib/posts";

import styles from "./index.module.css";
import home from '../../styles/Home.module.css'

export const getStaticProps: GetStaticProps<{
    posts: ReturnType<typeof getSortedPostsData>
}> = async () => {
    const posts = getSortedPostsData();
    return { props: { posts } };
};
const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <meta name="og:title" content={`Kindness web site`} />
                <title>Kindness web site</title>
            </Head>

            <h1 className={styles.heading}>Kindness</h1>
            <div className={home.grid}>
                {posts.map((post) => (
                    <article className={home.card} key={post.id}>
                        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                            <a>
                                <h1>{post.title}</h1>
                            </a>
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
};

export default Index;
