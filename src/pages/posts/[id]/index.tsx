import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getPostData, getAllPostIds, Post } from "@/lib/posts";

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = getAllPostIds();
    return {
        paths: ids.map((id) => ({ params: { id } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Post, { id: string }> = async (
    context
) => {
    const data = await getPostData((context.params || {}).id as string);
    return { props: data };
};

const PostPage = ({
    title,
    content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <meta name="og:title" content={`${title} - Kindness web site`} />
                <title>{title} - Kindness web site</title>
            </Head>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>
    );
};

export default PostPage;
