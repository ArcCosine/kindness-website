import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

import Header from "./components/Header";
import { getAllPosts } from "./api/markdown";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
    const allPosts = getAllPosts(["slug", "title", "published"]);
    return {
        props: { allPosts },
    };
};

const Home: NextPage<Props> = ({ allPosts }) => {
    return (
        <div className="container mx-auto">
            <Header></Header>
            <main className="container mt-8">
                <h1 className="text-center text-5xl font-bold mb-8">
                    Kindness
                </h1>
                <p className="m-8 text-2xl">
                    Kindness is a team of individual developers whose goal is to continue to change the world through programming.<br />
                    Create robust and fast programs in a short period of time.<br />
                    I also undertake the creation of easy-to-read documents.
                </p>
                <div className="grid md:grid-cols-1 lg:grid-cols-2">
                    {allPosts?.map((post) => (
                        <Link href={post.slug} key={post.slug}>
                            <a className="rounded-md border-solid border-2 border-blue-600 p-8 m-4">
                                <span className="block text-3xl text-blue-600/100">
                                    {post.title}
                                </span>
                                <span>{post.published} published.</span>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
            <footer className="text-center">
                <div>&copy; 2008-2022 Kindness,inc.</div>
                <div>
                    Favicon{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://icons8.com/icon/66852/円k"
                    >
                        円K
                    </a>{" "}
                    icon by{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://icons8.com"
                    >
                        Icons8
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Home;
