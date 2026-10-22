'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UploadProposalPage() {
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('Informatika');
    const [currentUserEmail, setCurrentUserEmail] = useState('it@actaflow.com');
    const [date, setDate] = useState('');
    const [room, setRoom] = useState('Ruangan 1');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userObj = JSON.parse(savedUser);
                if (userObj.role) {
                    setOrganization(userObj.role);
                }
                if (userObj.email) {
                    setCurrentUserEmail(userObj.email);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const proposalStatus = isDraft ? 'Draft' : 'Pending';
        const fileInput = (document.getElementById('fileInput') as HTMLInputElement)?.files?.[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('organization', organization);
        formData.append('date', date);
        formData.append('room', room);
        formData.append('status', proposalStatus);
        formData.append('created_by', currentUserEmail);
        if (fileInput) {
            formData.append('file', fileInput);
        }

        try {
            const res = await fetch('/api/proposals', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Gagal mengunggah proposal');
                setLoading(false);
                return;
            }

            alert(isDraft ? 'Proposal berhasil disimpan sebagai Draft!' : 'Proposal berhasil dikirim untuk ditinjau oleh Kemahasiswaan!');
            router.push('/');
        } catch (err) {
            setError('Gagal terhubung ke server.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Form Pengajuan Proposal</h1>
                        <p className="text-sm text-slate-500">Unggah dokumen proposal kegiatan Himpunan Informatika atau Sistem Informasi.</p>
                    </div>
                    <Link href="/" className="text-xs text-blue-600 hover:underline font-medium">
                        &larr; Kembali ke Dashboard
                    </Link>
                </div>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg">{error}</div>}

                <form className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Proposal</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Seminar Nasional Teknologi 2026"
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Himpunan / Organisasi</label>
                            <input
                                type="text"
                                readOnly
                                value={organization}
                                className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-100 text-slate-600 font-semibold cursor-not-allowed outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasi Ruangan</label>
                            <select
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="Ruangan 1">Ruangan 1</option>
                                <option value="Ruangan 2">Ruangan 2</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Acara</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">File Dokumen (PDF)</label>
                        <input
                            id="fileInput"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="w-full px-3 py-2 text-sm border rounded-lg file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Format yang didukung: PDF atau DOCX (Maks. 10MB)</p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => handleSubmit(e, true)}
                            className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            Simpan sebagai Draft
                        </button>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => handleSubmit(e, false)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            {loading ? 'Mengirim...' : 'Kirim untuk Ditinjau'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}