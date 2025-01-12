import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV();

export const MAX_STORAGE_SIZE = 10 * 1024 * 1024; // 10MB


export const saveToMMKV = (key: string, value: any) => {
  mmkv.set(key, JSON.stringify(value));
};

export const getFromMMKV = (key: string) => {
  const value = mmkv.getString(key);
  return value ? JSON.parse(value) : null;
};

export const totalSize = mmkv.getAllKeys().reduce((size, key) => {
  const value = mmkv.getString(key) || '';
  return size + value.length;
}, 0);


export const manageStorage = () => {
  console.log("Hello mmkv");
  const totalSize = mmkv.getAllKeys().reduce((size, key) => {
    const value = mmkv.getString(key) || '';
    return size + value.length;
  }, 0);

  if (totalSize > MAX_STORAGE_SIZE) {
    // Implement logic to delete oldest data or unnecessary keys
    console.warn('MMKV storage size exceeded. Clearing old data...');
    // Example: Remove swipe actions older than a specific timestamp
  }
};

export const allKeys = mmkv.getAllKeys();


