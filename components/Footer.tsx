"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
    const nowYear = new Date().getFullYear();

    const pathName = usePathname();
    const [path, setPath] = useState(pathName);

    useEffect(() => {
        setPath(pathName);
    }, [pathName]);

    return (
        <footer className="container mx-auto pb-8">
            {path && path !== "/" ? (
                <Link className="text-3xl m-8 text-blue-600/100" href="/">
                    Back to Home
                </Link>
            ) : (
                <div></div>
            )}
            <div className="text-center mt-8">
                <div>&copy; 2008-{nowYear} Kindness,inc.</div>
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
            </div>
        </footer>
    );
}
