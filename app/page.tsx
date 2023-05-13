import { getAllPosts } from "../lib/markdown";
import Card from "../components/Card";

export const metadata = {
    title: "Kindness Home",
    description: "Kindness page.",
};

export default function Home() {
    const allPosts = getAllPosts(["slug", "title", "published"]);
    return (
        <>
            <p className="text-2xl m-8">
                Kindness is a team of individual developers whose goal is to
                continue to change the world through programming.
                <br />
                Create robust and fast programs in a short period of time.
                <br />I also undertake the creation of easy-to-read documents.
            </p>
            <div className="flex flex-col md:flex-row md:flex-wrap">
                {allPosts?.map((post, index) => {
                    return <Card key={index} post={post}></Card>;
                })}
            </div>
        </>
    );
}
