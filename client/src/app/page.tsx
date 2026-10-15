'use client';

import { useState, useMemo } from 'react';
import {
  filterBySearch,
  filterByStatus,
  filterByRoom,
  filterByOrganization,
  filterByDateRange,
  Proposal
} from '../utils/filter';

// Data dummy sesuai dengan data awal ActaFlow
const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'PRP-001',
    title: 'Proposal Latihan Kepemimpinan Mahasiswa 2026',
    organization: 'Divisi HRD',
    date: '2026-10-14',
    room: 'Ruangan 1',
    status: 'Pending',
  },
  {
    id: 'PRP-002',
    title: 'Workshop Pengembangan Web & AI',
    organization: 'Divisi Iptek',
    date: '2026-10-20',
    room: 'Ruangan 2',
    status: 'Approved',
  },
  {
    id: 'PRP-003',
    title: 'Malam Keakraban Anggota Baru',
    organization: 'Divisi Seni & Olahraga',
    date: '2026-11-05',
    room: 'Lainnya',
    status: 'Revise',
  },
  {
    id: 'PRP-004',
    title: 'Draf Acara Inaugurasi Kepengurusan',
    organization: 'BPH',
    date: '2026-11-12',
    room: 'Ruangan 1',
    status: 'Draft',
  },
  {
    id: 'PRP-005',
    title: 'Seminar Nasional Teknologi Informasi',
    organization: 'Divisi Iptek',
    date: '2026-11-18',
    room: 'Ruangan 2',
    status: 'Approved',
  },
  {
    id: 'PRP-006',
    title: 'Rapat Kerja Tahunan Organisasi',
    organization: 'BPH',
    date: '2026-12-01',
    room: 'Ruangan 1',
    status: 'Rejected',
  },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedRoom, setSelectedRoom] = useState('ALL');
  const [selectedOrg, setSelectedOrg] = useState('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredProposals = useMemo(() => {
    let result = INITIAL_PROPOSALS;
    result = filterBySearch(result, searchTerm);
    result = filterByStatus(result, selectedStatus);
    result = filterByRoom(result, selectedRoom);
    result = filterByOrganization(result, selectedOrg);
    result = filterByDateRange(result, startDate, endDate);
    return result;
  }, [searchTerm, selectedStatus, selectedRoom, selectedOrg, startDate, endDate]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('ALL');
    setSelectedRoom('ALL');
    setSelectedOrg('ALL');
    setStartDate('');
    setEndDate('');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Revise':
        return 'bg-rose-100 text-rose-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sistem Tata Kelola Dokumen & Kegiatan</h1>
          <p className="text-sm text-slate-500">Ringkasan status alur persetujuan proposal dan penggunaan ruangan.</p>
        </div>
        <span className="px-4 py-1.5 bg-white border rounded-lg text-sm text-slate-600 shadow-sm">
          Periode Kepengurusan 2026/2027
        </span>
      </div>

      {/* Tabel & Controls Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Daftar Pengajuan Terbaru</h2>
          <button
            onClick={handleResetFilters}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Reset Semua Filter
          </button>
        </div>

        {/* 5 Filter Controls UI */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cari Title/Divisi</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari judul proposal atau divisi..."
              className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="ALL">Semua Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Revise">Revise</option>
              <option value="Draft">Draft</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Lokasi Ruangan</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="ALL">Semua Ruangan</option>
              <option value="Ruangan 1">Ruangan 1</option>
              <option value="Ruangan 2">Ruangan 2</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Divisi / Organisasi</label>
            <select
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="ALL">Semua Divisi</option>
              <option value="Divisi HRD">Divisi HRD</option>
              <option value="Divisi Iptek">Divisi Iptek</option>
              <option value="Divisi Seni & Olahraga">Divisi Seni & Olahraga</option>
              <option value="BPH">BPH</option>
            </select>
          </div>
        </div>

        {/* Tabel Data Proposal */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Judul Proposal</th>
                <th className="py-3 px-4">Divisi</th>
                <th className="py-3 px-4">Tanggal Acara</th>
                <th className="py-3 px-4">Lokasi</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProposals.length > 0 ? (
                filteredProposals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">{item.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{item.title}</td>
                    <td className="py-3 px-4">{item.organization}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-medium">
                        {item.room}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-400">
                    Tidak ada data proposal yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}