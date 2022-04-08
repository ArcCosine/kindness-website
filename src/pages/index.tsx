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
            <div className="grid mx-auto">
                {posts.map((post) => (
                    <article className="grid grid-cols-2 gap-1" key={post.id}>
                        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                            <a>
                                <h1 className="font-bold text-xl mb-2">{post.title}</h1>
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
