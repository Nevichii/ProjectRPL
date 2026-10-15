export interface Proposal {
  id: string;
  title: string;
  room: string;
  date: string;
  status: string;
  himpunan: string;
}

/**
 * Filter 1: Menyaring daftar proposal berdasarkan kata kunci judul (Case-insensitive)
 */
export function filterProposalsBySearch(proposals: Proposal[], keyword: string): Proposal[] {
  if (!keyword || keyword.trim() === "") {
    return proposals;
  }
  const lowerKeyword = keyword.toLowerCase();
  return proposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Filter 2: Menyaring daftar proposal berdasarkan status persetujuan
 */
export function filterProposalsByStatus(proposals: Proposal[], status: string): Proposal[] {
  if (!status || status === "ALL" || status.trim() === "") {
    return proposals;
  }
  return proposals.filter(
    (proposal) => proposal.status.toUpperCase() === status.toUpperCase()
  );
}

/**
 * Filter 3: Menyaring daftar proposal berdasarkan ruangan / lokasi kegiatan
 */
export function filterProposalsByRoom(proposals: Proposal[], room: string): Proposal[] {
  if (!room || room === "ALL" || room.trim() === "") {
    return proposals;
  }
  return proposals.filter(
    (proposal) => proposal.room.toLowerCase() === room.toLowerCase()
  );
}

/**
 * Filter 4: Menyaring daftar proposal berdasarkan asal himpunan / organisasi
 */
export function filterProposalsByOrganization(proposals: Proposal[], himpunan: string): Proposal[] {
  if (!himpunan || himpunan === "ALL" || himpunan.trim() === "") {
    return proposals;
  }
  return proposals.filter(
    (proposal) => proposal.himpunan.toLowerCase() === himpunan.toLowerCase()
  );
}

/**
 * Filter 5: Menyaring daftar proposal berdasarkan tanggal atau bulan pelaksanaan kegiatan
 */
export function filterProposalsByDate(proposals: Proposal[], dateKeyword: string): Proposal[] {
  if (!dateKeyword || dateKeyword === "ALL" || dateKeyword.trim() === "") {
    return proposals;
  }
  return proposals.filter(
    (proposal) => proposal.date.includes(dateKeyword)
  );
}