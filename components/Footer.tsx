import Link from "next/link";

export default function Footer() {
    return (
        <footer className="container mx-auto pb-8">
            <Link className="text-3xl m-8 text-blue-600/100" href="/">
                Back to Home
            </Link>
        </footer>
    );
}
