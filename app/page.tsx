import Link from "next/link";
import { getAllPosts } from "../lib/markdown";

export const metadata = {
    title: "Kindness Home",
    description: "Kindness page.",
};

export default function Home() {
    const allPosts = getAllPosts(["slug", "title", "published"]);
    return (
        <div className="w-full p-0">
            <main className="p-0 mt-8 flex flex-col justify-center items-center min-h-screen w-full md:max-w-5xl mx-auto">
                <h1 className="text-center text-5xl font-bold mb-8">
                    Kindness
                </h1>
                <p className="text-2xl m-8">
                    Kindness is a team of individual developers whose goal is to
                    continue to change the world through programming.
                    <br />
                    Create robust and fast programs in a short period of time.
                    <br />I also undertake the creation of easy-to-read
                    documents.
                </p>
                <div className="w-full mx-2 flex flex-col md:flex-row md:flex-wrap md:m-8">
                    {allPosts?.map((post) => {
                        const pageLink = `/posts/${post.slug}`;
                        return (
                            <Link
                                className="w-full md:w-5/12 rounded-md border-solid border-2 border-blue-600 p-8 mx-0 my-4 md:m-4"
                                href={pageLink}
                                key={post.slug}
                                passHref
                            >
                                <span className="block text-3xl text-blue-600">
                                    {post.title}
                                </span>
                                <span>{post.published} published.</span>
                            </Link>
                        );
                    })}
                </div>
            </main>
            <footer className="text-center">
                <div>&copy; 2008-2023 Kindness,inc.</div>
                <div>
                    Favicon&nbsp;
                    <a
                        className="text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://icons8.com/icon/66852/円k"
                    >
                        円K
                    </a>
                    &nbsp; icon by&nbsp;
                    <a
                        className="text-blue-600"
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
}
