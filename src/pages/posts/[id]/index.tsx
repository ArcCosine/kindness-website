import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getPostData, getAllPostIds, Post } from "@/lib/posts";


import Meta from '@/components/Meta'
import Footer from '@/components/Footer'

import Home from '@/styles/Home.module.css'


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
            <Meta title={title} />
            <div className="Home.grid" dangerouslySetInnerHTML={{ __html: content }} />
            <Footer />
        </>
    );
};

export default PostPage;
