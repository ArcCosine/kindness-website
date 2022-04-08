import { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

export default function App({ Component, pageProps }: AppProps ) {
    return <Component {...pageProps} />
}
