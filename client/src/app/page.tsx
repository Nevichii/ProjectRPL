"use client";
import React, { useState } from "react";

export default function DashboardPage() {
  // State untuk menyimpan kata kunci pencarian (Filter 1)
  const [searchQuery, setSearchQuery] = useState("");

  // Data statis untuk simulasi UI (P4/P6)
  const stats = [
    { label: "Total Proposal", value: "12", color: "bg-blue-500" },
    { label: "Menunggu Persetujuan", value: "3", color: "bg-amber-500" },
    { label: "Proposal Disetujui", value: "7", color: "bg-emerald-500" },
    { label: "Perlu Revisi / Ditolak", value: "2", color: "bg-rose-500" },
  ];

  const recentProposals = [
    {
      id: "PRP-001",
      title: "Proposal Latihan Kepemimpinan Mahasiswa 2026",
      division: "Divisi HRD",
      date: "14 Okt 2026",
      room: "Ruangan 1",
      status: "PENDING",
      statusLabel: "Pending",
      statusClass: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      id: "PRP-002",
      title: "Workshop Pengembangan Web & AI",
      division: "Divisi Iptek",
      date: "20 Okt 2026",
      room: "Ruangan 2",
      status: "APPROVED",
      statusLabel: "Approved",
      statusClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      id: "PRP-003",
      title: "Malam Keakraban Anggota Baru",
      division: "Divisi Seni & Olahraga",
      date: "05 Nov 2026",
      room: "Lainnya",
      status: "REVISE",
      statusLabel: "Revise",
      statusClass: "bg-rose-100 text-rose-800 border-rose-200",
    },
    {
      id: "PRP-004",
      title: "Draf Acara Inaugurasi Kepengurusan",
      division: "BPH",
      date: "12 Nov 2026",
      room: "Ruangan 1",
      status: "DRAFT",
      statusLabel: "Draft",
      statusClass: "bg-gray-100 text-gray-800 border-gray-200",
    },
  ];

  // Logika Filter 1: Menyaring berdasarkan judul proposal atau nama divisi secara case-insensitive
  const filteredProposals = recentProposals.filter((row) =>
    row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.division.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation (Statis) */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold tracking-wide">ActaFlow</span>
          </div>

          <nav className="space-y-2">
            <div className="px-3 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm pointer-events-none">
              Dashboard
            </div>
            <div className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 text-sm pointer-events-none">
              Pengajuan Proposal
            </div>
            <div className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 text-sm pointer-events-none">
              Pipeline Persetujuan
            </div>
            <div className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 text-sm pointer-events-none">
              Knowledge Hub
            </div>
            <div className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 text-sm pointer-events-none">
              Kalender Organisasi
            </div>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <p className="text-xs text-slate-500">Masuk sebagai:</p>
          <p className="text-sm font-semibold text-slate-300">Pengurus Divisi</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Sistem Tata Kelola Dokumen & Kegiatan
            </h1>
            <p className="text-sm text-slate-500">
              Ringkasan status alur persetujuan proposal dan penggunaan ruangan.
            </p>
          </div>
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 shadow-sm">
            Periode Kepengurusan 2026/2027
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-slate-800">{item.value}</p>
              </div>
              <div className={`w-3 h-10 rounded-full ${item.color}`}></div>
            </div>
          ))}
        </section>

        {/* Conflict Detector / Room Preview Alert Box (Statis) */}
        <section className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-600 font-bold text-lg">⚠️</span>
            <div>
              <h3 className="text-sm font-semibold text-amber-900">
                Peringatan Sistem Kalender (Conflict Detector)
              </h3>
              <p className="text-xs text-amber-700">
                Ruangan 1 memiliki 2 jadwal kegiatan pada tanggal 14 Oktober 2026.
              </p>
            </div>
          </div>
          <span className="text-xs font-medium bg-amber-200 text-amber-800 px-3 py-1 rounded-full">
            Prinjauan
          </span>
        </section>

        {/* Recent Proposals Table with Search Filter */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-bold text-slate-800">Daftar Pengajuan Terbaru</h2>
            
            {/* Input Pencarian (Filter 1) */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Cari judul atau divisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                  <th className="p-4">ID</th>
                  <th className="p-4">Judul Proposal</th>
                  <th className="p-4">Divisi</th>
                  <th className="p-4">Tanggal Acara</th>
                  <th className="p-4">Lokasi</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono text-xs text-slate-400">
                        {row.id}
                      </td>
                      <td className="p-4 font-medium text-slate-800">
                        {row.title}
                      </td>
                      <td className="p-4">{row.division}</td>
                      <td className="p-4">{row.date}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          {row.room}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${row.statusClass}`}
                        >
                          {row.statusLabel}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 text-sm">
                      Tidak ada proposal yang sesuai dengan kata kunci &quot;{searchQuery}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}