import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
            <link rel="manifest" href="/manifest.webmanifest" />
            </head>
            <body className="min-h-screen w-full p-0">
                <main className="p-0 mt-8 flex flex-col min-h-screen w-full md:max-w-5xl mx-auto">
                    <Header></Header>
                    {children}
                    <Footer></Footer>
                </main>
            </body>
        </html>
    );
}
