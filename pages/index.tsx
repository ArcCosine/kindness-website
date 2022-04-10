import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { getAllPosts } from "./api/api";
import Link from 'next/link'

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
    const allPosts = getAllPosts(["slug", "title", "date", "tags"]);
    return {
        props: { allPosts },
    };
};

const Home: NextPage<Props> = ({ allPosts }) => {
    return (
        <div className="container mx-auto">
            <Head>
                <title>Kindness Home</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="manifest" href="/manifest.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
            </Head>

            <main className="container mt-8">
                <h1 className="text-center text-5xl font-bold mb-8">Kindness</h1>
                <div className="grid md:grid-cols-1 lg:grid-cols-2">
                    {allPosts.map((post) => (
                        <Link href={post.slug} key={post.slug}>
                            <a className="rounded-md border-solid border-2 border-blue-600 p-8 m-4">
                                <h2 className="text-3xl text-blue-600/100">{post.title}</h2>
                                <span>{post.date} published.</span>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
            <footer className="text-center">&copy; 2008-2022 Kindness,inc.</footer>
        </div>
    );
};

export default Home;
