// src/__tests__/searchFilter.test.ts
import { filterProposalsBySearch, Proposal } from "../utils/filter";

describe("Filter 1: Pencarian Judul Proposal (Search Keyword)", () => {
    const mockProposals: Proposal[] = [
        { id: "1", title: "Webinar AI & Cloud 2026", room: "Room 1", date: "2026-10-12", status: "Disetujui", himpunan: "Himpunan Informatika" },
        { id: "2", title: "CodeFest Inter-Kampus", room: "Room 2", date: "2026-10-25", status: "Pending", himpunan: "Himpunan Informatika" },
        { id: "3", title: "Makrab Angkatan 2026", room: "Other", date: "2026-11-05", status: "Pending", himpunan: "Himpunan Informatika" },
    ];

    test("mengembalikan semua proposal jika keyword pencarian kosong", () => {
        const result = filterProposalsBySearch(mockProposals, "");
        expect(result).toHaveLength(3);
    });

    test("menyaring proposal berdasarkan sebagian kata kunci judul secara case-insensitive", () => {
        const result = filterProposalsBySearch(mockProposals, "codefest");
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("CodeFest Inter-Kampus");
    });

    test("mengembalikan array kosong jika judul proposal tidak ditemukan", () => {
        const result = filterProposalsBySearch(mockProposals, "Workshop Robotik");
        expect(result).toHaveLength(0);
    });
});

// src/__tests__/statusFilter.test.ts
import { filterProposalsByStatus, Proposal } from "../utils/filter";

describe("Filter 2: Status Persetujuan Proposal (Status Filter)", () => {
  const mockProposals: Proposal[] = [
    { id: "PRP-001", title: "Proposal Latihan Kepemimpinan", room: "Ruangan 1", date: "2026-10-14", status: "PENDING", himpunan: "Himpunan Informatika" },
    { id: "PRP-002", title: "Workshop Web & AI", room: "Ruangan 2", date: "2026-10-20", status: "APPROVED", himpunan: "Himpunan Informatika" },
    { id: "PRP-003", title: "Malam Keakraban", room: "Lainnya", date: "2026-11-05", status: "REVISE", himpunan: "Himpunan Informatika" },
  ];

  test("mengembalikan semua proposal jika status bernilai 'ALL' atau kosong", () => {
    const resultAll = filterProposalsByStatus(mockProposals, "ALL");
    const resultEmpty = filterProposalsByStatus(mockProposals, "");
    expect(resultAll).toHaveLength(3);
    expect(resultEmpty).toHaveLength(3);
  });

  test("menyaring proposal yang berstatus PENDING dengan tepat", () => {
    const result = filterProposalsByStatus(mockProposals, "PENDING");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("PRP-001");
    expect(result[0].status).toBe("PENDING");
  });

  test("menyaring proposal yang berstatus APPROVED dengan tepat", () => {
    const result = filterProposalsByStatus(mockProposals, "APPROVED");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("PRP-002");
  });
});

// src/__tests__/roomFilter.test.ts
import { filterProposalsByRoom, Proposal } from "../utils/filter";

describe("Filter 3: Pemilihan Ruangan / Lokasi Proposal (Room Filter)", () => {
  const mockProposals: Proposal[] = [
    { id: "PRP-001", title: "Proposal Latihan Kepemimpinan", room: "Ruangan 1", date: "2026-10-14", status: "PENDING", himpunan: "Himpunan Informatika" },
    { id: "PRP-002", title: "Workshop Web & AI", room: "Ruangan 2", date: "2026-10-20", status: "APPROVED", himpunan: "Himpunan Informatika" },
    { id: "PRP-003", title: "Malam Keakraban", room: "Lainnya", date: "2026-11-05", status: "REVISE", himpunan: "Himpunan Informatika" },
  ];

  test("mengembalikan semua proposal jika filter ruangan bernilai 'ALL' atau kosong", () => {
    const resultAll = filterProposalsByRoom(mockProposals, "ALL");
    const resultEmpty = filterProposalsByRoom(mockProposals, "");
    expect(resultAll).toHaveLength(3);
    expect(resultEmpty).toHaveLength(3);
  });

  test("menyaring proposal berdasarkan 'Ruangan 1' secara tepat", () => {
    const result = filterProposalsByRoom(mockProposals, "Ruangan 1");
    expect(result).toHaveLength(1);
    expect(result[0].room).toBe("Ruangan 1");
    expect(result[0].id).toBe("PRP-001");
  });

  test("menyaring proposal berdasarkan 'Lainnya' dengan benar", () => {
    const result = filterProposalsByRoom(mockProposals, "Lainnya");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("PRP-003");
  });
});
// src/__tests__/orgFilter.test.ts
import { filterProposalsByOrganization, Proposal } from "../utils/filter";

describe("Filter 4: Asal Himpunan / Organisasi (Organization Filter)", () => {
  const mockProposals: Proposal[] = [
    { id: "PRP-001", title: "Proposal Latihan Kepemimpinan", room: "Ruangan 1", date: "2026-10-14", status: "PENDING", himpunan: "Himpunan Informatika" },
    { id: "PRP-002", title: "Workshop Web & AI", room: "Ruangan 2", date: "2026-10-20", status: "APPROVED", himpunan: "Himpunan Sistem Informasi" },
    { id: "PRP-003", title: "Malam Keakraban", room: "Lainnya", date: "2026-11-05", status: "REVISE", himpunan: "Himpunan Informatika" },
  ];

  test("mengembalikan semua proposal jika filter himpunan bernilai 'ALL' atau kosong", () => {
    const resultAll = filterProposalsByOrganization(mockProposals, "ALL");
    const resultEmpty = filterProposalsByOrganization(mockProposals, "");
    expect(resultAll).toHaveLength(3);
    expect(resultEmpty).toHaveLength(3);
  });

  test("menyaring proposal berdasarkan 'Himpunan Informatika' secara tepat", () => {
    const result = filterProposalsByOrganization(mockProposals, "Himpunan Informatika");
    expect(result).toHaveLength(2);
    expect(result[0].himpunan).toBe("Himpunan Informatika");
    expect(result[1].himpunan).toBe("Himpunan Informatika");
  });

  test("menyaring proposal berdasarkan himpunan lain dengan benar", () => {
    const result = filterProposalsByOrganization(mockProposals, "Himpunan Sistem Informasi");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("PRP-002");
  });
});

// src/__tests__/dateFilter.test.ts
import { filterProposalsByDate, Proposal } from "../utils/filter";

describe("Filter 5: Rentang Tanggal / Bulan Kegiatan (Date Filter)", () => {
  const mockProposals: Proposal[] = [
    { id: "PRP-001", title: "Proposal Latihan Kepemimpinan", room: "Ruangan 1", date: "2026-10-14", status: "PENDING", himpunan: "Himpunan Informatika" },
    { id: "PRP-002", title: "Workshop Web & AI", room: "Ruangan 2", date: "2026-10-20", status: "APPROVED", himpunan: "Himpunan Informatika" },
    { id: "PRP-003", title: "Malam Keakraban", room: "Lainnya", date: "2026-11-05", status: "REVISE", himpunan: "Himpunan Informatika" },
  ];

  test("mengembalikan semua proposal jika filter tanggal bernilai 'ALL' atau kosong", () => {
    const resultAll = filterProposalsByDate(mockProposals, "ALL");
    const resultEmpty = filterProposalsByDate(mockProposals, "");
    expect(resultAll).toHaveLength(3);
    expect(resultEmpty).toHaveLength(3);
  });

  test("menyaring proposal berdasarkan bulan/tahun tertentu (misal: '2026-10')", () => {
    const result = filterProposalsByDate(mockProposals, "2026-10");
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("PRP-001");
    expect(result[1].id).toBe("PRP-002");
  });

  test("menyaring proposal berdasarkan tanggal spesifik secara tepat", () => {
    const result = filterProposalsByDate(mockProposals, "2026-11-05");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("PRP-003");
  });
});