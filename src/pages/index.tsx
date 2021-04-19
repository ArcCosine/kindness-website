import { InferGetStaticPropsType, GetStaticProps } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";


import Meta from "@/components/Meta"
import Footer from "@/components/Footer"

import styles from "@/styles/index.module.css";
import home from '@/styles/Home.module.css'

export const getStaticProps: GetStaticProps<{
    posts: ReturnType<typeof getSortedPostsData>
}> = async () => {
    const posts = getSortedPostsData();
    return { props: { posts } };
};
const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Meta />

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
            <Footer />
        </>
    );
};

export default Index;
