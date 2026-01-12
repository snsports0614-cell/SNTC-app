import { openDB } from 'idb';

const DB_NAME = 'SN_Training_DB';
const STORE_REPORTS = 'reports';
const STORE_GROUPS = 'groups';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_REPORTS)) {
        const store = db.createObjectStore(STORE_REPORTS, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('playerName', 'playerName');
        store.createIndex('group', 'group');
      }
      if (!db.objectStoreNames.contains(STORE_GROUPS)) {
        db.createObjectStore(STORE_GROUPS, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveReportToDB = async (data: any) => {
  const db = await initDB();
  return db.add(STORE_REPORTS, { ...data, createdAt: new Date() });
};

export const getAllReports = async () => {
  const db = await initDB();
  return db.getAll(STORE_REPORTS);
};

export const deleteReport = async (id: number) => {
  const db = await initDB();
  return db.delete(STORE_REPORTS, id);
};

export const saveGroupToDB = async (groupName: string) => {
  const db = await initDB();
  return db.add(STORE_GROUPS, { name: groupName });
};

export const getGroups = async () => {
  const db = await initDB();
  return db.getAll(STORE_GROUPS);
};

export const deleteGroup = async (id: number) => {
  const db = await initDB();
  return db.delete(STORE_GROUPS, id);
};
