export interface Proposal {
  id: string;
  title: string;
  organization: string;
  date: string;
  room: string;
  status: string;
}

export function filterBySearch(proposals: Proposal[], keyword: string): Proposal[] {
  if (!keyword) return proposals;
  const lower = keyword.toLowerCase();
  return proposals.filter(
    (p) => p.title.toLowerCase().includes(lower) || p.organization.toLowerCase().includes(lower)
  );
}

export function filterByStatus(proposals: Proposal[], status: string): Proposal[] {
  if (!status || status === 'ALL') return proposals;
  return proposals.filter((p) => p.status === status);
}

export function filterByRoom(proposals: Proposal[], room: string): Proposal[] {
  if (!room || room === 'ALL') return proposals;
  return proposals.filter((p) => p.room === room);
}

export function filterByOrganization(proposals: Proposal[], org: string): Proposal[] {
  if (!org || org === 'ALL') return proposals;
  return proposals.filter((p) => p.organization === org);
}

export function filterByDateRange(proposals: Proposal[], startDate: string, endDate: string): Proposal[] {
  if (!startDate && !endDate) return proposals;
  return proposals.filter((p) => {
    const pDate = new Date(p.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : 0;
    const end = endDate ? new Date(endDate).getTime() : Infinity;
    return pDate >= start && pDate <= end;
  });
}