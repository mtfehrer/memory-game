import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <head />
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
