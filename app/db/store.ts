import type { FavoriteItem } from '~/types/typesInfo'

function openDB(dbName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB not supported"));
      return;
    }

    const request = indexedDB.open(dbName, 2);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("favorites")) {
        db.createObjectStore("favorites", { keyPath: "id", autoIncrement: true });
        console.info(`Object store "favorites" created in ${dbName}`);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject(event);
    };
  });
}

export async function storageDB(dbName: string, data: FavoriteItem): Promise<void> {
  const db = await openDB(dbName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction("favorites", "readwrite");
    tx.objectStore("favorites").add(data);

    tx.oncomplete = () => resolve();
    tx.onerror = (err) => reject(err);
  });
}

export async function fetchDb(dbName: string): Promise<FavoriteItem[]> {
  const db = await openDB(dbName);
  return new Promise((resolve, reject) => {
    const request = db.transaction("favorites", "readonly").objectStore("favorites").getAll();
    request.onsuccess = () => resolve(request.result as FavoriteItem[]);
    request.onerror = (err) => reject(err);
  });
}

export async function removeDb(dbName: string, removeId: number | string): Promise<void> {
  const db = await openDB(dbName);
  return new Promise((resolve, reject) => {
    const request = db.transaction("favorites", "readwrite").objectStore("favorites").delete(removeId);
    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
}

export async function clearData(dbName: string): Promise<void> {
  const db = await openDB(dbName);
  return new Promise((resolve, reject) => {
    const request = db.transaction("favorites", "readwrite").objectStore("favorites").clear();
    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
}
