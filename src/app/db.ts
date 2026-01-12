// 로컬 스토리지를 사용하여 브라우저에 데이터를 저장하는 방식입니다.
export const saveReportToDB = async (data: any) => {
  const reports = await getAllReports();
  const newReport = { ...data, id: Date.now() };
  localStorage.setItem('sn_reports', JSON.stringify([...reports, newReport]));
  return true;
};

export const getAllReports = async () => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('sn_reports');
  return data ? JSON.parse(data) : [];
};

export const deleteReport = async (id: any) => {
  const reports = await getAllReports();
  const filtered = reports.filter((r: any) => r.id !== id);
  localStorage.setItem('sn_reports', JSON.stringify(filtered));
};

export const saveGroupToDB = async (name: string) => {
  const groups = await getGroups();
  const newGroup = { id: Date.now(), name };
  localStorage.setItem('sn_groups', JSON.stringify([...groups, newGroup]));
};

export const getGroups = async () => {
  if (typeof window === 'undefined') return [{id: 1, name: '엘리트 반'}];
  const data = localStorage.getItem('sn_groups');
  return data ? JSON.parse(data) : [{id: 1, name: '엘리트 반'}];
};

export const deleteGroup = async (id: any) => {
  const groups = await getGroups();
  const filtered = groups.filter((g: any) => g.id !== id);
  localStorage.setItem('sn_groups', JSON.stringify(filtered));
};
