import Link from 'next/link'

import Home from '@/styles/Home.module.css'

const Footer = ()=>{
    return (
        <footer className={Home.footer}>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
        </footer>
    )
}

export default Footer
