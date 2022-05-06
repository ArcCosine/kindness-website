import { NextPage } from "next";
import Head from "next/head";

const Header: NextPage = ()=>{
    return (
        <Head>
            <title>Kindness Home</title>
            <meta
                name="description"
                content="Kindness page."
            />
            <link rel="manifest" href="/manifest.webmanifest" />
            <link rel="icon" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/icon-192x192.png" />
        </Head>
    )
}

export default Header;

