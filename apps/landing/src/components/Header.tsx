'use client';
import Link from "next/link";
import HeaderCTAButton from '@/components/HeaderCTAButton'

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
                Cadence
            </Link>
            <HeaderCTAButton />
        </header>
    )
}