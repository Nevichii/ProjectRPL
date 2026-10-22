'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [proposals, setProposals] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [roomFilter, setRoomFilter] = useState('Semua Ruangan');
  const [divisiFilter, setDivisiFilter] = useState('Semua Divisi');
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  const loadProposals = (currentUserRole: string, currentUserEmail: string) => {
    fetch(`/api/proposals?role=${currentUserRole}&email=${currentUserEmail}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProposals(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        loadProposals(parsed.role, parsed.email);
      } catch (e) {
        console.error(e);
      }
    } else {
      loadProposals('Guest', '');
    }
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/proposals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        if (user) {
          loadProposals(user.role, user.email);
        }
      } else {
        alert('Gagal memperbarui status');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const filteredProposals = proposals.filter((p: any) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.organization.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Semua Status' || p.status === statusFilter;
    const matchesRoom = roomFilter === 'Semua Ruangan' || p.room === roomFilter;
    const matchesDivisi = divisiFilter === 'Semua Divisi' || p.organization === divisiFilter;
    return matchesSearch && matchesStatus && matchesRoom && matchesDivisi;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sistem Tata Kelola Dokumen & Kegiatan</h1>
            <p className="text-sm text-slate-500 mt-1">
              {user ? `Login sebagai: ${user.email} (${user.role})` : 'Mode Tamu / Belum Login'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {user && user.role !== 'Kemahasiswaan' && user.role !== 'Admin' && (
              <Link
                href="/upload"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                + Upload Proposal
              </Link>
            )}
            <div className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg border border-slate-200">
              Periode 2026/2027
            </div>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Daftar Pengajuan Proposal</h2>
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('Semua Status');
                setRoomFilter('Semua Ruangan');
                setDivisiFilter('Semua Divisi');
              }}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Reset Semua Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cari Title/Divisi</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari judul proposal..."
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Revise">Revise</option>
                <option value="Draft">Draft</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasi Ruangan</label>
              <select
                value={roomFilter}
                onChange={(e) => setRoomFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="Semua Ruangan">Semua Ruangan</option>
                <option value="Ruangan 1">Ruangan 1</option>
                <option value="Ruangan 2">Ruangan 2</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Divisi / Organisasi</label>
              <select
                value={divisiFilter}
                onChange={(e) => setDivisiFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="Semua Divisi">Semua Divisi</option>
                <option value="Informatika">Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-xs font-semibold text-slate-500">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Judul Proposal</th>
                  <th className="py-3 px-4">Divisi</th>
                  <th className="py-3 px-4">Tanggal Acara</th>
                  <th className="py-3 px-4">Lokasi</th>
                  <th className="py-3 px-4">File Dokumen</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm text-slate-700">
                {filteredProposals.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-slate-400">
                      Tidak ada data proposal yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredProposals.map((p: any) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium text-slate-900">{p.id}</td>
                      <td className="py-3 px-4">{p.title}</td>
                      <td className="py-3 px-4">{p.organization}</td>
                      <td className="py-3 px-4">{p.date ? p.date.substring(0, 10) : '-'}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          {p.room}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`/uploads/${p.file_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs font-medium flex items-center gap-1"
                        >
                          📄 {p.file_name || 'lampiran.pdf'}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-700'
                              : p.status === 'Pending'
                                ? 'bg-amber-100 text-amber-700'
                                : p.status === 'Revise'
                                  ? 'bg-rose-100 text-rose-700'
                                  : p.status === 'Draft'
                                    ? 'bg-slate-200 text-slate-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {user && user.role !== 'Kemahasiswaan' && p.status === 'Draft' && p.created_by === user.email && (
                          <button
                            onClick={() => handleUpdateStatus(p.id, 'Pending')}
                            className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                          >
                            Kirim
                          </button>
                        )}

                        {user && user.role === 'Kemahasiswaan' && p.status === 'Pending' && (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleUpdateStatus(p.id, 'Approved')}
                              className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-medium rounded hover:bg-emerald-700 transition-colors"
                            >
                              Setujui
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(p.id, 'Revise')}
                              className="px-2.5 py-1 bg-amber-500 text-white text-xs font-medium rounded hover:bg-amber-600 transition-colors"
                            >
                              Revisi
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(p.id, 'Rejected')}
                              className="px-2.5 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                            >
                              Tolak
                            </button>
                          </div>
                        )}

                        {(!user || (p.status !== 'Draft' && user.role !== 'Kemahasiswaan') || (user.role === 'Kemahasiswaan' && p.status !== 'Pending')) && (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}