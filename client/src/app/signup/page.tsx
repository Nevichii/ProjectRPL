'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Terjadi kesalahan');
                return;
            }

            alert('Registrasi berhasil! Silakan login.');
            router.push('/login');
        } catch (err) {
            setError('Gagal terhubung ke server.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign Up ActaFlow</h2>
                {error && <div className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</div>}
                <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Sudah punya akun? <Link href="/login" className="text-indigo-600">Login</Link>
                </p>
            </div>
        </div>
    );
}