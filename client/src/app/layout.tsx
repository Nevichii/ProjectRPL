import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ActaFlow - Tata Kelola Dokumen Organisasi",
    description: "Platform Manajemen Proposal dan Alur Persetujuan Organisasi",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <body className="bg-slate-50 text-slate-900 antialiased font-sans">
                {children}
            </body>
        </html>
    );
}