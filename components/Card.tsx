import Link from "next/link";

interface Props {
    post: any;
}
export default function Card(props: Props) {
    const { post } = props;

    const pageLink = `/posts/${post.slug}`;
    return (
        <Link
            className="w-[calc(100%-3rem)] md:w-[calc(50%-3rem)] box-border rounded-md border-solid border-2 border-blue-600 p-8 m-4"
            href={pageLink}
            key={post.slug}
            passHref
        >
            <span className="block text-3xl text-blue-600">{post.title}</span>
            <span>{post.published} published.</span>
        </Link>
    );
}
