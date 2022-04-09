import { NextPage } from "next";
import Link from 'next/link'

const Footer:NextPage<Props> = ()=>{
    return (
        <footer className="container mx-auto pb-8">
            <Link href="/">
                <a className="text-3xl m-8 text-blue-600/100">Back to Home</a>
            </Link>
        </footer>
    )
}

export default Footer
